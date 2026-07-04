import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  Trophy,
  TrendingUp,
  Calendar,
  Sparkles,
  Flame,
  Target,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import CountUp from '../components/CountUp';
import { useAuth } from '../lib/auth';
import { enrollmentsApi } from '../lib/api';
import { courses } from '../data/mockData';

const enrolledCourses = [
  {
    id: 1,
    title: 'العلوم — المرحلة الابتدائية',
    emoji: '🌱',
    cover: 'from-emerald-400 via-green-500 to-emerald-700',
    chapters: 8,
    totalChapters: 12,
    lectures: 24,
    totalLectures: 36,
    progress: 67,
    nextLecture: 'النباتات — أجزاء الزهرة والتكاثر',
    nextDuration: '22 دقيقة',
    score: 92,
  },
  {
    id: 2,
    title: 'العلوم — المرحلة الإعدادية',
    emoji: '🔬',
    cover: 'from-amber-400 via-yellow-500 to-amber-700',
    chapters: 9,
    totalChapters: 12,
    lectures: 30,
    totalLectures: 42,
    progress: 75,
    nextLecture: 'الطاقة وتحولاتها — الجزء الثاني',
    nextDuration: '28 دقيقة',
    score: 88,
  },
  {
    id: 3,
    title: 'الساينس — الثانوي التجريبي',
    emoji: '🧪',
    cover: 'from-cyan-400 via-sky-500 to-blue-700',
    chapters: 10,
    totalChapters: 14,
    lectures: 38,
    totalLectures: 56,
    progress: 68,
    nextLecture: 'Genetics — قوانين مندل',
    nextDuration: '35 دقيقة',
    score: 91,
  },
];

const upcoming = [
  {
    title: 'اختبار العلوم — المادة وحالاتها',
    date: 'الأحد 15:00',
    duration: '25 دقيقة',
    type: 'quiz',
    color: 'rose',
  },
  {
    title: 'بث مباشر — مراجعة الساينس',
    date: 'الإثنين 19:00',
    duration: '60 دقيقة',
    type: 'live',
    color: 'gold',
  },
  {
    title: 'تسليم ملخص الطاقة — إعدادي',
    date: 'الثلاثاء 23:59',
    duration: '',
    type: 'task',
    color: 'emerald',
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [realEnrollments, setRealEnrollments] = useState(null);

  useEffect(() => {
    if (user?.id) {
      enrollmentsApi.list(user.id).then(res => {
        if (res?.data?.length) setRealEnrollments(res.data);
      }).catch(() => {});
    }
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      {/* Welcome */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card gold-border relative mb-6 overflow-hidden p-6 lg:p-8"
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <span className="chip">
              <Flame className="h-3 w-3" /> سلسلة 14 يوم متتالي
            </span>
            <h1 className="mt-3 font-display text-3xl font-black text-white lg:text-4xl">
              أهلاً، <span className="gold-shine-text">فاطمة</span> 👋
            </h1>
            <p className="mt-2 text-sm text-white/60 lg:text-base">
              أنهيتي{' '}
              <span className="font-bold text-gold-200">
                <CountUp value={42} /> محاضرة
              </span>{' '}
              هذا الشهر في مادة العلوم. باقي{' '}
              <span className="font-bold text-gold-200">
                <CountUp value={12} /> محاضرة
              </span>{' '}
              لإكمال هدفكِ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-gold-400/30 bg-gold-400/10 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/20">
                <Trophy className="h-5 w-5 text-gold-200" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-white/50">ترتيبك</p>
                <p className="font-display text-lg font-bold text-white">
                  #3
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-white/50">
                  معدلك العام
                </p>
                <p className="font-display text-lg font-bold text-emerald-300">
                  91%
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <QuickStat icon={BookOpen} value="3" label="مناهج مسجَّلة" delay={0.05} />
        <QuickStat
          icon={PlayCircle}
          value="42"
          label="محاضرة شاهدتيها"
          delay={0.1}
        />
        <QuickStat
          icon={CheckCircle2}
          value="18"
          label="اختبار اجتزتيه"
          delay={0.15}
        />
        <QuickStat
          icon={Award}
          value="3"
          label="شهادات محصلة"
          delay={0.2}
        />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Continue learning */}
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <Sparkles className="h-5 w-5 text-gold-300" />
              استكملي تعلّمكِ
            </h2>
            <a
              href="#"
              className="flex items-center gap-1 text-xs font-semibold text-gold-200 hover:text-gold-100"
            >
              عرض الكل
              <ChevronLeft className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((c, i) => (
              <EnrolledCourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-5">
          {/* Weekly Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card gold-border relative overflow-hidden p-5"
          >
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-white">
              <Target className="h-4 w-4 text-gold-300" />
              هدف الأسبوع
            </h3>
            <div className="mb-2 flex items-end justify-between">
              <span className="font-display text-2xl font-black gold-text">
                5/7
              </span>
              <span className="text-xs text-white/50">محاضرات</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 flex-1 rounded-md ${
                    i < 5
                      ? 'bg-gradient-to-b from-gold-300 to-gold-600 shadow-gold-glow'
                      : 'bg-white/5'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/50">
              باقي محاضرتين لتحقيق هدف هذا الأسبوع 🎯
            </p>
          </motion.div>

          {/* Upcoming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card relative overflow-hidden p-5"
          >
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-white">
              <Calendar className="h-4 w-4 text-gold-300" />
              القادم
            </h3>
            <div className="space-y-2">
              {upcoming.map((u, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-gold-400/30 hover:bg-white/[0.04]"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      u.color === 'rose'
                        ? 'border border-rose-400/30 bg-rose-500/10'
                        : u.color === 'gold'
                        ? 'border border-gold-400/30 bg-gold-400/10'
                        : 'border border-emerald-400/30 bg-emerald-500/10'
                    }`}
                  >
                    {u.type === 'quiz' && (
                      <Target className="h-4 w-4 text-rose-300" />
                    )}
                    {u.type === 'live' && (
                      <PlayCircle className="h-4 w-4 text-gold-300" />
                    )}
                    {u.type === 'task' && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {u.title}
                    </p>
                    <p className="text-[11px] text-white/50">
                      {u.date} {u.duration && `• ${u.duration}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ icon: Icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/10">
          <Icon className="h-4 w-4 text-gold-200" strokeWidth={1.8} />
        </div>
        <p className="font-display text-2xl font-bold text-white">
          <CountUp value={parseInt(value)} />
        </p>
      </div>
      <p className="mt-2 text-xs text-white/60">{label}</p>
    </motion.div>
  );
}

function EnrolledCourseCard({ course, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
      whileHover={{ x: -4 }}
      className="glass-card glass-card-hover group relative overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-0 md:grid-cols-[180px_1fr]">
        {/* Cover */}
        <div
          className={`relative h-32 bg-gradient-to-br md:h-full ${course.cover}`}
        >
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 text-2xl backdrop-blur-md">
            {course.emoji}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <span className="rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
              {course.chapters}/{course.totalChapters} فصول
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-bold text-white">
                {course.title}
              </h3>
              <p className="mt-1 text-xs text-white/50">
                المحاضرة القادمة:{' '}
                <span className="font-semibold text-gold-200">
                  {course.nextLecture}
                </span>
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
              {course.score}% آخر اختبار
            </span>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] text-white/55">
              <span>التقدم</span>
              <span className="font-bold text-gold-200">
                <CountUp value={course.progress} suffix="%" />
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-l from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] text-white/55">
              <Clock className="h-3 w-3" />
              {course.nextDuration}
            </div>
            <Link
              to={`/student/course/${course.id}`}
              className="btn-gold gap-2 px-4 py-2 text-xs"
            >
              <PlayCircle className="h-4 w-4" strokeWidth={2.5} />
              استكمال المحاضرة
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}