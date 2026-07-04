import { neon } from '@neondatabase/serverless';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = getDB();
  const { student_id, course_id } = req.query;

  try {
    if (req.method === 'GET') {
      if (student_id) {
        const rows = await db`SELECT * FROM enrollments WHERE student_id = ${student_id} ORDER BY enrolled_at DESC`;
        return res.status(200).json({ data: rows });
      }
      const rows = await db`SELECT * FROM enrollments ORDER BY enrolled_at DESC LIMIT 200`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { student_id, course_id } = req.body || {};
      if (!student_id || !course_id) {
        return res.status(400).json({ error: 'student_id, course_id required' });
      }
      const [row] = await db`
        INSERT INTO enrollments (student_id, course_id) VALUES (${student_id}, ${course_id})
        ON CONFLICT (student_id, course_id) DO UPDATE SET enrolled_at = NOW()
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
