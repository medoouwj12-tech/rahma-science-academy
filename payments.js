import { neon } from '@neondatabase/serverless';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = getDB();

  try {
    if (req.method === 'GET') {
      const { student_id } = req.query;
      const rows = student_id
        ? await db`SELECT * FROM payments WHERE student_id = ${student_id} ORDER BY created_at DESC`
        : await db`SELECT * FROM payments ORDER BY created_at DESC LIMIT 200`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      // Stub — in production integrate Paymob/Fawry here
      const { student_id, course_id, amount, method } = req.body || {};
      if (!student_id || !amount) {
        return res.status(400).json({ error: 'student_id, amount required' });
      }
      const transaction_id = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const [row] = await db`
        INSERT INTO payments (student_id, course_id, amount, method, transaction_id, status)
        VALUES (${student_id}, ${course_id || null}, ${amount}, ${method || 'paymob'}, ${transaction_id}, 'pending')
        RETURNING *
      `;
      return res.status(201).json({ data: row, payment_url: `https://accept.paymob.com/.../${transaction_id}` });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
