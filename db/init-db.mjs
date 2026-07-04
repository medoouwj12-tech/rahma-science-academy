import pg from 'pg';
import { readFileSync } from 'fs';

const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new pg.Client({ connectionString: url });
await client.connect();

let schema;
try {
  schema = readFileSync(new URL('schema.sql', import.meta.url), 'utf8');
} catch (err) {
  console.error('❌ Cannot read schema.sql:', err.message);
  await client.end();
  process.exit(1);
}

// Split SQL into statements (handle $$ dollar-quoting)
const statements = [];
let current = '';
let depth = 0;  // tracks $$ nesting

for (let i = 0; i < schema.length; i++) {
  const ch = schema[i];
  const next = schema[i + 1] || '';
  current += ch;

  if (ch === '$' && next === '$') {
    depth++;
    current += next;
    i++;
  } else if (ch === ';' && depth === 0) {
    statements.push(current);
    current = '';
  }
}
if (current.trim()) statements.push(current);

console.log(`📄 Found ${statements.length} SQL statements`);
let ok = 0, errs = 0;
for (const stmt of statements) {
  const s = stmt.trim();
  if (!s || s === ';') continue;
  try {
    await client.query(s);
    ok++;
  } catch (e) {
    // "already exists" is fine for IF NOT EXISTS
    if (e.message.includes('already exists')) { ok++; continue; }
    console.error('❌', e.message.slice(0, 200));
    errs++;
  }
}
console.log(`✅ ${ok} OK, ${errs} failed`);

// Summary
const { rows: tables } = await client.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' ORDER BY table_name"
);
console.log('\n📊 Tables:', tables.map(t => t.table_name).join(', '));

const r1 = await client.query('SELECT count(*)::int AS c FROM profiles');
console.log('👤 Profiles:', r1.rows[0].c);

const r2 = await client.query('SELECT count(*)::int AS c FROM courses');
console.log('📚 Courses:', r2.rows[0].c);

if (r2.rows[0].c > 0) {
  const { rows: courses } = await client.query('SELECT id, title, stage, price_per_session FROM courses ORDER BY id');
  for (const c of courses) console.log(`   ${c.id}. ${c.title} (${c.stage}) — ${c.price_per_session} EGP`);
}

await client.end();
