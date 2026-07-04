-- =============================================
-- Seed data — تشغيل بعد schema.sql
-- =============================================

-- 1. حساب الأستاذة رحمة (كلمة المرور: rahma123)
INSERT INTO profiles (id, email, full_name, role, phone)
SELECT 'ins_rahma', 'rahma@rahma-khaled.com', 'الأستاذة رحمة خالد', 'instructor', '01003330460'
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'rahma@rahma-khaled.com');

INSERT INTO auth_credentials (user_id, salt, password_hash)
SELECT 'ins_rahma', 'a1b2c3d4e5f6g7h8', 'a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0'
WHERE NOT EXISTS (SELECT 1 FROM auth_credentials WHERE user_id = 'ins_rahma');

-- 2. الكورسات
INSERT INTO courses (title, subtitle, stage, grade, chapters, lectures, price_per_session, rating, cover_gradient, emoji, color, status)
SELECT 'العلوم — المرحلة الابتدائية', 'الصفوف الرابع والخامس والسادس • المنهج المصري', 'ابتدائي', 'الصف الرابع - السادس', 12, 36, 40, 4.95, 'from-emerald-400 via-green-500 to-emerald-700', '🌱', '#10B981', 'published'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE stage = 'ابتدائي');

INSERT INTO courses (title, subtitle, stage, grade, chapters, lectures, price_per_session, rating, cover_gradient, emoji, color, status)
SELECT 'العلوم — المرحلة الإعدادية', 'الصفوف الأول والثاني والثالث الإعدادي', 'إعدادي', 'الأول - الثالث الإعدادي', 12, 42, 40, 4.9, 'from-amber-400 via-yellow-500 to-amber-700', '🔬', '#D4AF37', 'published'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE stage = 'إعدادي');

INSERT INTO courses (title, subtitle, stage, grade, chapters, lectures, price_per_session, rating, cover_gradient, emoji, color, status)
SELECT 'الساينس — الثانوي التجريبي', 'الصفوف الأول والثاني والثالث الثانوي • المنهج المصري', 'ثانوي', 'الأول - الثالث الثانوي', 14, 56, 50, 4.92, 'from-cyan-400 via-sky-500 to-blue-700', '🧪', '#38BDF8', 'published'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title LIKE '%ثانوي%');
