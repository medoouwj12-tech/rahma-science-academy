// Simple in-DB auth (bcrypt-hashed passwords)
import { neon } from '@neondatabase/serverless';
import crypto from 'node:crypto';

function getDB() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

// Simple salted SHA-256 (replace with bcrypt when in production with real users)
function hashPassword(password, salt) {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const h = crypto.createHash('sha256').update(password + s).digest('hex');
  return { salt: s, hash: h };
}

function verifyPassword(password, salt, hash) {
  const { hash: h } = hashPassword(password, salt);
  return h === hash;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const db = getDB();
  const { action, email, password, full_name, role, stage } = req.body || {};

  try {
    if (action === 'signup') {
      if (!email || !password || !full_name) {
        return res.status(400).json({ error: 'email, password, full_name required' });
      }

      // Check existing
      const existing = await db`SELECT id FROM profiles WHERE email = ${email}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: 'البريد مستخدم بالفعل' });
      }

      const id = `usr_${crypto.randomBytes(8).toString('hex')}`;
      const { salt, hash } = hashPassword(password);

      await db`
        CREATE TABLE IF NOT EXISTS auth_credentials (
          user_id TEXT PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
          salt TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;

      const [user] = await db`
        INSERT INTO profiles (id, email, full_name, role, stage)
        VALUES (${id}, ${email}, ${full_name}, ${role || 'student'}, ${stage || null})
        RETURNING id, email, full_name, role, stage
      `;
      await db`INSERT INTO auth_credentials (user_id, salt, password_hash) VALUES (${id}, ${salt}, ${hash})`;

      return res.status(201).json({ user });
    }

    if (action === 'login') {
      if (!email || !password) {
        return res.status(400).json({ error: 'email, password required' });
      }

      const rows = await db`
        SELECT p.id, p.email, p.full_name, p.role, p.stage, a.salt, a.password_hash
        FROM profiles p LEFT JOIN auth_credentials a ON a.user_id = p.id
        WHERE p.email = ${email}
      `;
      if (rows.length === 0) {
        return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
      }
      const row = rows[0];
      if (!row.salt || !verifyPassword(password, row.salt, row.password_hash)) {
        return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
      }

      const { salt, password_hash, ...user } = row;
      return res.status(200).json({ user });
    }

    return res.status(400).json({ error: 'action must be "signup" or "login"' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
