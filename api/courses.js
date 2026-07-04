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
      const { stage, id } = req.query;
      let rows;
      if (id) {
        rows = await db`SELECT * FROM courses WHERE id = ${parseInt(id)} LIMIT 1`;
        if (rows.length === 0) return res.status(404).json({ error: 'Course not found' });
        return res.status(200).json({ data: rows[0] });
      }
      if (stage) {
        rows = await db`SELECT * FROM courses WHERE stage = ${stage} AND status = 'published' ORDER BY id`;
      } else {
        rows = await db`SELECT * FROM courses WHERE status = 'published' ORDER BY id`;
      }
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { title, subtitle, stage, grade, price_per_session, chapters, lectures, cover_gradient, emoji, color } = req.body || {};
      if (!title || !stage || !price_per_session) {
        return res.status(400).json({ error: 'title, stage, price_per_session required' });
      }
      const [row] = await db`
        INSERT INTO courses (title, subtitle, stage, grade, price_per_session, chapters, lectures, cover_gradient, emoji, color)
        VALUES (${title}, ${subtitle || ''}, ${stage}, ${grade || ''}, ${price_per_session}, ${chapters || 0}, ${lectures || 0}, ${cover_gradient || ''}, ${emoji || ''}, ${color || '#D4AF37'})
        RETURNING *
      `;
      return res.status(201).json({ data: row });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed', allowed: ['GET', 'POST'] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}