import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Award,
  Trophy,
  Flame,
  Sparkles,
  Crown,
  Target,
} from 'lucide-react';
import CountUp from '../components/CountUp';

export default function ProfilePage() {
  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card gold-border relative mb-6 overflow-hidden"
      >
        <div className="relative h-32 bg-gradient-to-br from-amber-400 via-gold-500 to-amber-700 lg:h-40">
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative -mt-16 px-6 pb-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-black bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-4xl font-black text-black shadow-gold-glow">
                  ف
                </div>
                <span className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-emerald-400">
                  ✓
                </span>
              </div>
              <div className="lg:pb-1">
                <span className="chip">
                  <Crown className="h-3 w-3" /> طالبة متميزة
                </span>
                <h1 className="mt-2 font-display text-3xl font-black text-white">
                  فاطمة <span className="gold-text">الزهراء</span>
                </h1>
                <p className="mt-1 text-sm text-white/55">
                  @fatima.z • انضممت منذ مارس 2024
                </p>
              </div>
            </div>
            <button className="btn-ghost-gold gap-2 px-4 py-2.5 text-xs">
              <Edit3 className="h-3.5 w-3.5" />
              تعديل الملف
            </button>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: Sparkles, value: 1240, label: 'نقطة خبرة', suffix: ' XP' },
          { icon: Flame, value: 14, label: 'يوم متتالي', suffix: ' 🔥' },
          { icon: Trophy, value: 3, label: 'ترتيبك العام', prefix: '#' },
          { icon: Award, value: 12, label: 'إنجاز', suffix: ' ⭐' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="glass-card p-4"
          >
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/10">
              <s.icon className="h-4 w-4 text-gold-200" strokeWidth={1.8} />
            </div>
            <p className="font-display text-2xl font-bold text-white">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="text-[11px] text-white/55">{s.label}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card relative overflow-hidden p-6"
        >
          <h2 className="mb-5 font-display text-lg font-bold text-white">
            المعلومات الشخصية
          </h2>

          <div className="space-y-3">
            <InfoRow icon={User} label="الاسم الكامل" value="فاطمة الزهراء أحمد" />
            <InfoRow icon={Mail} label="البريد الإلكتروني" value="fatima.z@example.com" />
            <InfoRow icon={Phone} label="رقم الهاتف" value="+20 100 ••• 8888" />
            <InfoRow icon={MapPin} label="العنوان" value="القاهرة، مصر" />
            <InfoRow
              icon={Calendar}
              label="تاريخ الميلاد"
              value="15 أغسطس 2007"
            />
            <InfoRow
              icon={Target}
              label="المرحلة الدراسية"
              value="الثانوية العامة — علمي"
            />
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card relative overflow-hidden p-6"
        >
          <h2 className="mb-5 font-display text-lg font-bold text-white">
            الإنجازات
          </h2>
          <div className="space-y-3">
            {[
              { emoji: '🏆', name: 'الأولى على الدفعة', desc: 'الفيزياء - مايو 2026' },
              { emoji: '🔥', name: 'سلسلة 14 يوم', desc: 'دراسة متتالية' },
              { emoji: '⭐', name: 'نجمة الامتحانات', desc: '100% في 5 اختبارات' },
              { emoji: '🎯', name: 'محترفة الكيمياء', desc: 'إكمال جميع الفصول' },
            ].map((a, i) => (
              <div
                key={a.name}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
              >
                <div className="text-2xl">{a.emoji}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {a.name}
                  </p>
                  <p className="text-[11px] text-white/50">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-gold-400/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/10">
        <Icon className="h-4 w-4 text-gold-200" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}