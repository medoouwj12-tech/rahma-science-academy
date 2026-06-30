import { motion } from 'framer-motion';
import {
  Award,
  Download,
  Share2,
  Sparkles,
  Calendar,
  CheckCircle2,
  Trophy,
  Crown,
} from 'lucide-react';
import CountUp from '../components/CountUp';

const certificates = [
  {
    id: 1,
    title: 'إتمام منهج العلوم — المرحلة الابتدائية',
    course: 'العلوم — ابتدائي',
    issuedAt: '15 مايو 2026',
    grade: 'A+',
    score: 96,
    certNo: 'RK-SCI-PR-2026-04821',
    color: 'from-emerald-400 via-green-500 to-emerald-700',
    emoji: '🌱',
  },
  {
    id: 2,
    title: 'إتمام منهج العلوم — المرحلة الإعدادية',
    course: 'العلوم — إعدادي',
    issuedAt: '02 أبريل 2026',
    grade: 'A',
    score: 91,
    certNo: 'RK-SCI-PR-2026-03104',
    color: 'from-amber-400 via-yellow-500 to-amber-700',
    emoji: '🔬',
  },
  {
    id: 3,
    title: 'إتمام منهج الساينس — الثانوي التجريبي',
    course: 'الساينس — ثانوي تجريبي',
    issuedAt: '18 مارس 2026',
    grade: 'A+',
    score: 94,
    certNo: 'RK-SCI-SEC-2026-02156',
    color: 'from-cyan-400 via-sky-500 to-blue-700',
    emoji: '🧪',
  },
  {
    id: 4,
    title: 'امتحان تفاعلي — بنك الأسئلة',
    course: 'اختبار التميز — العلوم',
    issuedAt: '28 فبراير 2026',
    grade: 'A',
    score: 89,
    certNo: 'RK-EXM-2026-01098',
    color: 'from-rose-400 via-pink-500 to-rose-700',
    emoji: '🏆',
  },
];

export default function Certificates() {
  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card gold-border relative mb-6 overflow-hidden p-6 lg:p-8"
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/12 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="chip mb-3">
              <Trophy className="h-3 w-3" /> إنجازاتكِ
            </span>
            <h1 className="font-display text-3xl font-black text-white lg:text-4xl">
              شهاداتكِ <span className="gold-shine-text">المعتمدة</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              كل شهادة هنا دليل على مجهودكِ — شاركيها مع العالم
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-gold-400/30 bg-gold-400/10 p-3 text-center">
              <p className="font-display text-2xl font-black gold-text">
                <CountUp value={certificates.length} />
              </p>
              <p className="text-[10px] text-white/55">شهادة</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-center">
              <p className="font-display text-2xl font-black text-emerald-300">
                <CountUp value={93} suffix="%" />
              </p>
              <p className="text-[10px] text-white/55">متوسط</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {certificates.map((cert, i) => (
          <CertificateCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}

function CertificateCard({ cert, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-card gold-border relative overflow-hidden"
    >
      {/* Decorative top */}
      <div
        className={`relative h-32 bg-gradient-to-br ${cert.color}`}
      >
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/30 text-3xl backdrop-blur-md">
          {cert.emoji}
        </div>
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            <Crown className="ms-1 inline h-3 w-3" />
            درجة {cert.grade}
          </span>
        </div>
        <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/70">
              شهادة معتمدة
            </p>
            <p className="font-display text-base font-bold text-white">
              {cert.title}
            </p>
          </div>
          <Award className="h-12 w-12 text-gold-300 drop-shadow-lg" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
          <Info label="الدرجة" value={`${cert.score}%`} gold />
          <Info label="التاريخ" value={cert.issuedAt} />
          <Info label="رقم الشهادة" value={cert.certNo} mono />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            موثّقة ومُتحقَّق منها
          </span>
          <div className="flex gap-2">
            <button className="btn-ghost-gold h-8 px-3 text-xs">
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button className="btn-gold h-8 gap-1 px-4 text-xs">
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Info({ label, value, gold, mono }) {
  return (
    <div>
      <p className="text-[10px] text-white/50">{label}</p>
      <p
        className={`mt-0.5 truncate text-xs font-semibold ${
          gold ? 'gold-text font-display' : mono ? 'font-mono text-white/80' : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  );
}