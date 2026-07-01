import { neon } from '@neondatabase/serverless';
import cors from 'cors';

const corsHandler = cors({ origin: '*' });

// SQL connection — set DATABASE_URL in Vercel env
function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

// Standard JSON response
function send(res, status, data) {
  corsHandler(res, null, () => {});
  res.status(status).json(data);
}

function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  return send(res, 405, { error: 'Method Not Allowed', allowed });
}

export default async function handler(req, res) {
  const db = getDB();

  // GET /api/courses — list all courses
  if (req.method === 'GET') {
    const { stage } = req.query;
    let rows;
    try {
      if (stage) {
        rows = await db`SELECT * FROM courses WHERE stage = ${stage} AND status = 'published' ORDER BY id`;
      } else {
        rows = await db`SELECT * FROM courses WHERE status = 'published' ORDER BY id`;
      }
    } catch (err) {
      return send(res, 500, { error: err.message });
    }
    return send(res, 200, { data: rows });
  }

  // POST /api/courses — create new course (instructor only)
  if (req.method === 'POST') {
    const { title, subtitle, stage, grade, price_per_session, chapters, lectures, cover_gradient, emoji, color } = req.body || {};
    if (!title || !stage || !price_per_session) {
      return send(res, 400, { error: 'title, stage, price_per_session required' });
    }
    try {
      const [row] = await db`
        INSERT INTO courses (title, subtitle, stage, grade, price_per_session, chapters, lectures, cover_gradient, emoji, color)
        VALUES (${title}, ${subtitle || ''}, ${stage}, ${grade || ''}, ${price_per_session}, ${chapters || 0}, ${lectures || 0}, ${cover_gradient || ''}, ${emoji || ''}, ${color || '#D4AF37'})
        RETURNING *
      `;
      return send(res, 201, { data: row });
    } catch (err) {
      return send(res, 500, { error: err.message });
    }
  }

  return methodNotAllowed(res, ['GET', 'POST']);
}
