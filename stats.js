import { neon } from '@neondatabase/serverless';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const db = getDB();
  try {
    const stats = await db`
      SELECT
        (SELECT COUNT(*) FROM profiles WHERE role = 'student') AS total_students,
        (SELECT COUNT(*) FROM enrollments) AS active_subs,
        (SELECT COALESCE(ROUND(AVG(progress)), 0) FROM enrollments) AS completion_rate,
        (SELECT COALESCE(SUM(amount), 0) / 100 FROM payments WHERE status = 'paid' AND created_at >= NOW() - INTERVAL '30 days') AS monthly_revenue
    `;
    return res.status(200).json({ data: stats[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
