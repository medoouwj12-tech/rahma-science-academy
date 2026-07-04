-- =============================================
-- منصة الأستاذة رحمة خالد — Database Schema
-- PostgreSQL (Neon)
-- تشغيل: افتحي SQL Editor في Neon و粘贴ي المحتوى
-- =============================================

-- 1. Users / Profiles (must be first — referenced by other tables)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor')),
  avatar_url TEXT,
  phone TEXT,
  stage TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Auth credentials (للتسجيل المحلي — FK to profiles)
CREATE TABLE IF NOT EXISTS auth_credentials (
  user_id TEXT PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Courses
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  stage TEXT NOT NULL,
  grade TEXT,
  chapters INT DEFAULT 0,
  lectures INT DEFAULT 0,
  price_per_session INT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  cover_gradient TEXT,
  emoji TEXT,
  color TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  chapter_index INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INT,
  order_index INT DEFAULT 0,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  progress INT DEFAULT 0,
  last_lesson_id INT REFERENCES lessons(id),
  UNIQUE(student_id, course_id)
);

-- 7. Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INT DEFAULT 60,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INT NOT NULL,
  points INT DEFAULT 1,
  order_index INT DEFAULT 0
);

-- 9. Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id),
  student_id TEXT NOT NULL REFERENCES profiles(id),
  score INT NOT NULL,
  total_points INT NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Payments
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT REFERENCES courses(id),
  amount INT NOT NULL,
  currency TEXT DEFAULT 'EGP',
  method TEXT,
  transaction_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Live Sessions
CREATE TABLE IF NOT EXISTS live_sessions (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id),
  title TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  meeting_url TEXT,
  recording_url TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 12. Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  issued_at TIMESTAMP DEFAULT NOW(),
  certificate_url TEXT,
  UNIQUE(student_id, course_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id, created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student ON certificates(student_id);

-- =============================================
-- Seed data — التشغيل لمرة واحدة فقط
-- =============================================
DO $$
BEGIN
  -- إنشاء حساب الأستاذة رحمة (كلمة المرور: rahma123)
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'rahma@rahma-khaled.com') THEN
    INSERT INTO profiles (id, email, full_name, role, phone) VALUES
    ('ins_rahma', 'rahma@rahma-khaled.com', 'الأستاذة رحمة خالد', 'instructor', '01003330460');
    INSERT INTO auth_credentials (user_id, salt, password_hash) VALUES
    -- sha256('rahma123' + 'a1b2c3d4e5f6g7h8')
    ('ins_rahma', 'a1b2c3d4e5f6g7h8', 'e20daa435cefaee6c5e3d83eed119c0552445b227921e5a9a0daf8ccefeef239');
  END IF;

  -- الكورسات
  IF NOT EXISTS (SELECT 1 FROM courses WHERE stage = 'ابتدائي') THEN
    INSERT INTO courses (title, subtitle, stage, grade, chapters, lectures, price_per_session, rating, cover_gradient, emoji, color, status) VALUES
    ('العلوم — المرحلة الابتدائية', 'الصفوف الرابع والخامس والسادس • المنهج المصري', 'ابتدائي', 'الصف الرابع - السادس', 12, 36, 40, 4.95, 'from-emerald-400 via-green-500 to-emerald-700', '🌱', '#10B981', 'published'),
    ('العلوم — المرحلة الإعدادية', 'الصفوف الأول والثاني والثالث الإعدادي', 'إعدادي', 'الأول - الثالث الإعدادي', 12, 42, 40, 4.9, 'from-amber-400 via-yellow-500 to-amber-700', '🔬', '#D4AF37', 'published'),
    ('العلوم — المرحلة الثانوية (علمي)', 'الصفوف الأول والثاني والثالث الثانوي', 'ثانوي', 'الأول - الثالث الثانوي', 14, 56, 50, 4.98, 'from-rose-400 via-pink-500 to-rose-700', '⚗️', '#F43F5E', 'published');
  END IF;
END $$;
