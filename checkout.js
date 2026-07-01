import { neon } from '@neondatabase/serverless';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

// Paymob Egyptian payment gateway integration
// Docs: https://docs.paymob.com/
async function createPaymobPayment({ amount_cents, student_id, course_id }) {
  const apiKey = process.env.PAYMOB_API_KEY;
  const integrationId = process.env.PAYMOB_INTEGRATION_ID;
  const iframeId = process.env.PAYMOB_IFRAME_ID;

  if (!apiKey || !integrationId || !iframeId) {
    return { payment_url: null, transaction_ref: null, sandbox: true };
  }

  // 1) Auth token
  const authRes = await fetch('https://accept.paymob.com/api/auth/tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey }),
  });
  const { token } = await authRes.json();

  // 2) Order
  const orderRes = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: false,
      amount_cents,
      currency: 'EGP',
      items: [],
    }),
  });
  const order = await orderRes.json();

  // 3) Payment key
  const keyRes = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      amount_cents,
      expiration: 3600,
      order_id: order.id,
      billing_data: {
        first_name: 'Student',
        last_name: 'User',
        email: 'student@example.com',
        phone_number: '+201000000000',
      },
      currency: 'EGP',
      integration_id: parseInt(integrationId, 10),
    }),
  });
  const { token: payment_token } = await keyRes.json();

  const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${payment_token}`;

  return { payment_url, transaction_ref: order.id.toString(), sandbox: false };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const db = getDB();
  const { student_id, course_id, amount_egp, student_email, student_phone, student_name } = req.body || {};

  if (!student_id || !amount_egp) {
    return res.status(400).json({ error: 'student_id, amount_egp required' });
  }

  try {
    const amount_cents = Math.round(amount_egp * 100);
    const paymob = await createPaymobPayment({ amount_cents, student_id, course_id });

    const transaction_id = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const [row] = await db`
      INSERT INTO payments (student_id, course_id, amount, method, transaction_id, status)
      VALUES (${student_id}, ${course_id || null}, ${amount_cents}, 'paymob', ${transaction_id}, 'pending')
      RETURNING *
    `;

    return res.status(201).json({
      data: row,
      payment_url: paymob.payment_url,
      transaction_ref: paymob.transaction_ref,
      message: paymob.sandbox ? 'Paymob not configured — payment sandbox mode' : 'Redirect user to payment_url',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
