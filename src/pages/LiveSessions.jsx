import { motion } from 'framer-motion';
import {
  LucideRadio as Radio,
  Calendar,
  Clock,
  Users,
  PlayCircle,
  Bell,
  Video,
  MessageCircle,
  Sparkles,
  Crown,
} from 'lucide-react';
import CountUp from '../components/CountUp';

const upcomingSessions = [
  {
    id: 1,
    title: 'مراجعة شاملة — العلوم للصف السادس',
    course: 'العلوم — ابتدائي',
    date: 'الإثنين 15 يوليو',
    time: '19:00',
    duration: '90 دقيقة',
    instructor: 'أ. رحمة خالد',
    attendees: 248,
    isLive: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'حل أسئلة — الطاقة وتحولاتها',
    course: 'العلوم — إعدادي',
    date: 'الأربعاء 17 يوليو',
    time: '20:00',
    duration: '60 دقيقة',
    instructor: 'أ. رحمة خالد',
    attendees: 184,
    isLive: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'Genetics — قوانين مندل والتطبيقات',
    course: 'الساينس — ثانوي تجريبي',
    date: 'الخميس 18 يوليو',
    time: '18:00',
    duration: '75 دقيقة',
    instructor: 'أ. رحمة خالد',
    attendees: 312,
    isLive: false,
    isFeatured: false,
  },
];

const liveNow = {
  title: 'بث مباشر الآن — مراجعة النباتات والبيئة',
  course: 'العلوم — ابتدائي',
  startedAt: 'منذ 12 دقيقة',
  attendees: 482,
};

export default function LiveSessions() {
  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card gold-border relative mb-6 overflow-hidden p-6 lg:p-8"
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/12 blur-3xl" />
        <div className="relative">
          <span className="chip mb-3">
            <Radio className="h-3 w-3 animate-pulse text-rose-400" /> بث مباشر
          </span>
          <h1 className="font-display text-3xl font-black text-white lg:text-4xl">
            جلسات <span className="gold-shine-text">البث المباشر</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            انضمي للجلسات المباشرة مع الأستاذة رحمة خالد، اسألي واستفيدي من
            شرح تفاعلي كامل.
          </p>
        </div>
      </motion.section>

      {/* Live now */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card gold-border relative mb-6 overflow-hidden p-5 lg:p-6"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-rose-400/15 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-700 shadow-gold-glow">
                <Video className="h-7 w-7 text-white" strokeWidth={1.8} />
              </div>
              <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-rose-500 text-[10px] font-black text-white">
                ●
              </span>
            </div>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-400/40 bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                مباشر الآن
              </span>
              <h2 className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
                {liveNow.title}
              </h2>
              <p className="mt-1 text-xs text-white/55">
                {liveNow.course} • {liveNow.startedAt} •{' '}
                <CountUp value={liveNow.attendees} /> مشاهد
              </p>
            </div>
          </div>
          <button className="btn-gold gap-2 px-6 py-3 text-sm">
            <PlayCircle className="h-5 w-5" strokeWidth={2.5} />
            ادخلي البث
          </button>
        </div>
      </motion.div>

      {/* Upcoming */}
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
        <Calendar className="h-5 w-5 text-gold-300" />
        الجلسات القادمة
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {upcomingSessions.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -3 }}
            className="glass-card glass-card-hover relative overflow-hidden p-5"
          >
            {s.isFeatured && (
              <span className="absolute left-4 top-4 chip">
                <Crown className="h-3 w-3" /> مميزة
              </span>
            )}
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-bold text-gold-200">
                {s.date}
              </span>
              <span className="text-[11px] text-white/40">• {s.time}</span>
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              {s.title}
            </h3>
            <p className="mt-1 text-xs text-white/50">{s.course}</p>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-white/55">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {s.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> <CountUp value={s.attendees} /> مسجل
              </span>
              <button className="btn-ghost-gold h-7 px-3 text-[11px]">
                <Bell className="h-3 w-3" /> ذكريني
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}