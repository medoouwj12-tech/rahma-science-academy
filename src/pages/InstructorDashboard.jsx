import { motion } from 'framer-motion';
import { Crown, Sparkles, ArrowLeft, Calendar, Trophy, Zap } from 'lucide-react';
import { statsCards } from '../data/mockData';
import StatsCard from './StatsCard';
import RevenueChart from './RevenueChart';
import CourseManager from './CourseManager';
import QuizCreator from './QuizCreator';
import SecurityMonitor from './SecurityMonitor';
import CountUp from './CountUp';

/**
 * InstructorDashboard — the main page.
 * Composed of: Welcome Banner → Stats Grid → Revenue Chart →
 *               Course Manager → Quiz Creator → Security Monitor.
 */
export default function InstructorDashboard() {
  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Welcome banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card gold-border relative overflow-hidden p-6 lg:p-8"
      >
        {/* Decorative gold arcs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-bold text-gold-100">
                <Crown className="h-3 w-3" />
                لوحة تحكم الأستاذة
              </span>
              <span className="chip">
                <Calendar className="h-3 w-3" />
                <CountUp value={30} /> يونيو 2026
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-black leading-tight text-white lg:text-[2.5rem]">
              أهلاً بكِ،{' '}
              <span className="gold-shine-text">أ. رحمة خالد</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 lg:text-base">
              لديكِ{' '}
              <span className="font-bold text-gold-200">
                <CountUp value={248} /> طالب نشط
              </span>{' '}
              يدرسون الآن، و{' '}
              <span className="font-bold text-gold-200">
                <CountUp value={12} /> محاضرة جديدة
              </span>{' '}
              تنتظر النشر اليوم.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold gap-2"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                إنشاء محتوى جديد
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost-gold gap-2"
              >
                عرض التحليلات الكاملة
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Side achievements */}
          <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:grid-cols-1">
            <Achievement
              icon={Trophy}
              label="أفضل instructor"
              value="هذا الشهر"
              accent="from-amber-300/15 to-amber-700/5 border-amber-400/30"
            />
            <Achievement
              icon={Zap}
              label="معدل رضا الطلاب"
              value={
                <span className="font-display text-2xl font-black text-gold-200">
                  <CountUp value={98} suffix="%" />
                </span>
              }
              accent="from-gold-300/15 to-gold-700/5 border-gold-400/30"
            />
          </div>
        </div>
      </motion.section>

      {/* Stats grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((s, i) => (
          <StatsCard key={s.id} {...s} delay={0.1 + i * 0.07} />
        ))}
      </section>

      {/* Revenue chart */}
      <section>
        <RevenueChart />
      </section>

      {/* Course Manager */}
      <section>
        <CourseManager />
      </section>

      {/* Quiz Creator */}
      <section>
        <QuizCreator />
      </section>

      {/* Security Monitor */}
      <section>
        <SecurityMonitor />
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="border-t border-white/5 pt-6 text-center text-xs text-white/40"
      >
        <p>
          © 2026{' '}
          <span className="gold-text font-bold">منصة الأستاذة رحمة خالد التعليمية</span>{' '}
          • جميع الحقوق محفوظة
        </p>
        <p className="mt-1">
          صُمم بكل {'\u2728'} لطلاب الثانوية والجامعة في العالم العربي
        </p>
      </motion.footer>
    </div>
  );
}

function Achievement({ icon: Icon, label, value, accent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-br ${accent} p-4 backdrop-blur-xl`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/40">
        <Icon className="h-5 w-5 text-gold-200" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/50">
          {label}
        </p>
        <div className="font-display text-base font-bold text-white">
          {value}
        </div>
      </div>
    </motion.div>
  );
}