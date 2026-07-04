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
      const rows = await db`SELECT * FROM live_sessions ORDER BY scheduled_at DESC LIMIT 50`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { course_id, title, scheduled_at, duration_minutes, meeting_url } = req.body || {};
      if (!course_id || !title || !scheduled_at) {
        return res.status(400).json({ error: 'course_id, title, scheduled_at required' });
      }
      const [row] = await db`
        INSERT INTO live_sessions (course_id, title, scheduled_at, duration_minutes, meeting_url)
        VALUES (${course_id}, ${title}, ${scheduled_at}, ${duration_minutes || 60}, ${meeting_url || ''})
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
