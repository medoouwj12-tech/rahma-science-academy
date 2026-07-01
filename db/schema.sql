-- =============================================
-- منصة الأستاذة رحمة خالد — Database Schema
-- PostgreSQL (Neon)
-- =============================================

-- Users / Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,                      -- Clerk user id
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor')),
  avatar_url TEXT,
  phone TEXT,
  stage TEXT,                               -- ابتدائي / إعدادي / ثانوي
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  stage TEXT NOT NULL,                      -- ابتدائي / إعدادي / ثانوي
  grade TEXT,                               -- الصف الرابع / الخامس / etc
  chapters INT DEFAULT 0,
  lectures INT DEFAULT 0,
  price_per_session INT NOT NULL,           -- 40 / 50 جنيه
  rating DECIMAL(2,1) DEFAULT 0,
  cover_gradient TEXT,
  emoji TEXT,
  color TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lessons (الدروس داخل الكورس)
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  chapter_index INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,                          -- Cloudflare R2 / YouTube
  duration_minutes INT,
  order_index INT DEFAULT 0,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings (حجز حصة)
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_url TEXT,                        -- Zoom / Jitsi / LiveKit
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enrollments (اشتراكات)
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  progress INT DEFAULT 0,                   -- 0-100
  last_lesson_id INT REFERENCES lessons(id),
  UNIQUE(student_id, course_id)
);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INT DEFAULT 60,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,                   -- ["A", "B", "C", "D"]
  correct_index INT NOT NULL,
  points INT DEFAULT 1,
  order_index INT DEFAULT 0
);

-- Quiz Attempts
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

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT REFERENCES courses(id),
  amount INT NOT NULL,                     -- بالقروش (4000 = 40 جنيه)
  currency TEXT DEFAULT 'EGP',
  method TEXT,                              -- paymob / fawry / wallet
  transaction_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Live Sessions
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

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES profiles(id),
  course_id INT NOT NULL REFERENCES courses(id),
  issued_at TIMESTAMP DEFAULT NOW(),
  certificate_url TEXT,
  UNIQUE(student_id, course_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id, created_at);

-- =============================================
-- Seed data (أول تشغيل) — التحقق أولاً
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM courses WHERE stage = 'ابتدائي') THEN
    INSERT INTO courses (title, subtitle, stage, grade, chapters, lectures, price_per_session, rating, cover_gradient, emoji, color, status) VALUES
    ('العلوم — المرحلة الابتدائية', 'الصفوف الرابع والخامس والسادس • المنهج المصري', 'ابتدائي', 'الصف الرابع - السادس', 12, 36, 40, 4.95, 'from-emerald-400 via-green-500 to-emerald-700', '🌱', '#10B981', 'published'),
    ('العلوم — المرحلة الإعدادية', 'الصفوف الأول والثاني والثالث الإعدادي', 'إعدادي', 'الأول - الثالث الإعدادي', 12, 42, 40, 4.9, 'from-amber-400 via-yellow-500 to-amber-700', '🔬', '#D4AF37', 'published'),
    ('العلوم — المرحلة الثانوية (علمي)', 'الصفوف الأول والثاني والثالث الثانوي', 'ثانوي', 'الأول - الثالث الثانوي', 14, 56, 50, 4.98, 'from-rose-400 via-pink-500 to-rose-700', '⚗️', '#F43F5E', 'published');
  END IF;
END $$;
