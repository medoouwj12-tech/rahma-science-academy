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
        ? await db`SELECT * FROM bookings WHERE student_id = ${student_id} ORDER BY scheduled_at DESC`
        : await db`SELECT * FROM bookings ORDER BY scheduled_at DESC LIMIT 200`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { student_id, course_id, scheduled_at, duration_minutes, notes } = req.body || {};
      if (!student_id || !course_id || !scheduled_at) {
        return res.status(400).json({ error: 'student_id, course_id, scheduled_at required' });
      }
      const [row] = await db`
        INSERT INTO bookings (student_id, course_id, scheduled_at, duration_minutes, notes)
        VALUES (${student_id}, ${course_id}, ${scheduled_at}, ${duration_minutes || 60}, ${notes || ''})
        RETURNING *
      `;
      return res.status(201).json({ data: row });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
