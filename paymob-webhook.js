// Paymob webhook — called when payment completes
import { neon } from '@neondatabase/serverless';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

// Verify HMAC signature
function verifyHmac(body, hmac) {
  // Paymob sends these fields concatenated in order — see docs
  const ordered = [
    'amount_cents', 'created_at', 'currency', 'error_occured', 'has_parent_transaction',
    'id', 'integration_id', 'is_3d_secure', 'is_auth', 'is_capture', 'is_refunded',
    'is_standalone_payment', 'is_voided', 'order', 'owner', 'pending',
    'source_data_pan', 'source_data_sub_type', 'source_data_type', 'success',
  ];
  const concat = ordered.map(k => (body[k] ?? '').toString()).join('');
  // eslint-disable-next-line no-undef
  const crypto = require('crypto');
  const computed = crypto.createHmac('sha256', process.env.PAYMOB_HMAC_SECRET || '')
    .update(concat).digest('hex');
  return computed === hmac;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const db = getDB();
  const hmac = req.query.hmac || (req.body && req.body.hmac);

  if (!verifyHmac(req.body || {}, hmac)) {
    return res.status(401).json({ error: 'Invalid HMAC' });
  }

  const data = req.body || {};
  const txnId = data.order || data.id || data.merchant_order_id;
  const success = data.success === true || data.success === 'true';

  try {
    await db`UPDATE payments SET status = ${success ? 'paid' : 'failed'}, paid_at = NOW() WHERE transaction_id = ${txnId.toString()}`;

    // If paid, auto-enroll student
    if (success) {
      const [payment] = await db`SELECT student_id, course_id FROM payments WHERE transaction_id = ${txnId.toString()}`;
      if (payment && payment.course_id) {
        await db`
          INSERT INTO enrollments (student_id, course_id) VALUES (${payment.student_id}, ${payment.course_id})
          ON CONFLICT (student_id, course_id) DO NOTHING
        `;
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
