import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Sparkles,
  Clock,
  Users,
  Star,
} from 'lucide-react';

const sampleQuizzes = [
  { id: 'q1', title: 'اختبار — النباتات والبيئة', course: 'العلوم — ابتدائي', questions: 15, duration: 20, avgScore: 84, emoji: '🌱', color: 'from-emerald-400 via-green-500 to-emerald-700' },
  { id: 'q2', title: 'اختبار — الطاقة وتحولاتها', course: 'العلوم — إعدادي', questions: 20, duration: 30, avgScore: 79, emoji: '🔬', color: 'from-amber-400 via-yellow-500 to-amber-700' },
  { id: 'q3', title: 'اختبار — Genetics والوراثة', course: 'الساينس — ثانوي', questions: 25, duration: 40, avgScore: 76, emoji: '🧪', color: 'from-cyan-400 via-sky-500 to-blue-700' },
  { id: 'q4', title: 'اختبار — المادة وحالاتها', course: 'العلوم — إعدادي', questions: 18, duration: 25, avgScore: 88, emoji: '📝', color: 'from-rose-400 via-pink-500 to-rose-700' },
];

export default function Quizzes() {
  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card gold-border relative mb-6 overflow-hidden p-6 lg:p-8">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/12 blur-3xl" />
        <div className="relative">
          <span className="chip mb-3"><ClipboardList className="h-3 w-3" /> الاختبارات</span>
          <h1 className="font-display text-3xl font-black text-white lg:text-4xl">الاختبارات <span className="gold-shine-text">التفاعلية</span></h1>
          <p className="mt-2 text-sm text-white/60">اختبرِ معلوماتكِ في العلوم واستعدي للامتحانات</p>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sampleQuizzes.map((q, i) => (
          <motion.article
            key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }} whileHover={{ y: -3 }}
            className="glass-card glass-card-hover relative overflow-hidden"
          >
            <div className={`relative h-24 bg-gradient-to-br ${q.color}`}>
              <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 text-2xl backdrop-blur-md">{q.emoji}</div>
              <div className="absolute bottom-3 right-4 left-4">
                <h3 className="font-display text-base font-bold text-white drop-shadow-lg">{q.title}</h3>
                <p className="text-[10px] text-white/80">{q.course}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span className="flex items-center gap-1"><ClipboardList className="h-3 w-3" /> {q.questions} سؤال</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {q.duration} دقيقة</span>
                <span className="flex items-center gap-1 text-emerald-400"><Star className="h-3 w-3" /> {q.avgScore}%</span>
              </div>
              <Link to={`/student/quiz/${q.id}`} className="btn-gold mt-4 w-full justify-center py-2.5 text-xs">
                ابدئي الاختبار
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}