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
  const { course_id } = req.query;

  try {
    if (req.method === 'GET') {
      const rows = course_id
        ? await db`SELECT * FROM lessons WHERE course_id = ${course_id} ORDER BY chapter_index, order_index`
        : await db`SELECT * FROM lessons ORDER BY course_id, order_index LIMIT 200`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { course_id, chapter_index, title, description, video_url, duration_minutes, order_index, is_free_preview } = req.body || {};
      if (!course_id || !title) {
        return res.status(400).json({ error: 'course_id, title required' });
      }
      const [row] = await db`
        INSERT INTO lessons (course_id, chapter_index, title, description, video_url, duration_minutes, order_index, is_free_preview)
        VALUES (${course_id}, ${chapter_index || 1}, ${title}, ${description || ''}, ${video_url || ''}, ${duration_minutes || 0}, ${order_index || 0}, ${is_free_preview || false})
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
