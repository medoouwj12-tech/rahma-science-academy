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
  const { student_id } = req.query;

  try {
    if (req.method === 'GET') {
      const rows = student_id
        ? await db`
            SELECT c.*, cert.id as cert_id, cert.issued_at, cert.certificate_url
            FROM certificates cert
            JOIN courses c ON c.id = cert.course_id
            WHERE cert.student_id = ${student_id}
            ORDER BY cert.issued_at DESC
          `
        : await db`SELECT * FROM certificates ORDER BY issued_at DESC LIMIT 100`;
      return res.status(200).json({ data: rows });
    }

    if (req.method === 'POST') {
      const { student_id, course_id, certificate_url } = req.body || {};
      if (!student_id || !course_id) {
        return res.status(400).json({ error: 'student_id, course_id required' });
      }
      const [row] = await db`
        INSERT INTO certificates (student_id, course_id, certificate_url)
        VALUES (${student_id}, ${course_id}, ${certificate_url || ''})
        ON CONFLICT (student_id, course_id) DO UPDATE SET issued_at = NOW()
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
