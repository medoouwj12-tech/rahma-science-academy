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
  const { course_id, student_id } = req.query;

  try {
    if (req.method === 'GET') {
      const rows = course_id
        ? await db`SELECT * FROM quizzes WHERE course_id = ${course_id} ORDER BY id`
        : await db`SELECT * FROM quizzes ORDER BY id`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { course_id, title, description, passing_score } = req.body || {};
      if (!course_id || !title) {
        return res.status(400).json({ error: 'course_id, title required' });
      }
      const [row] = await db`
        INSERT INTO quizzes (course_id, title, description, passing_score)
        VALUES (${course_id}, ${title}, ${description || ''}, ${passing_score || 60})
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
