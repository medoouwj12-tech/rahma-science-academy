import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Crown,
  CheckCircle2,
  Github,
  Chrome,
} from 'lucide-react';

export default function AuthPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = params.get('signup') ? 'signup' : 'signin';
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10 lg:px-8"
      dir="rtl"
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-30" />
      <div className="pointer-events-none fixed -right-32 top-20 h-[500px] w-[500px] rounded-full bg-gold-400/15 blur-[120px]" />
      <div className="pointer-events-none fixed -left-32 bottom-20 h-[400px] w-[400px] rounded-full bg-gold-400/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card gold-border relative w-full max-w-md overflow-hidden p-7 lg:p-9"
      >
        <Link
          to="/"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/60 hover:border-gold-400/40 hover:text-gold-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative">
          {/* Brand */}
          <div className="mb-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
            >
              <Sparkles className="h-7 w-7 text-black" strokeWidth={2.2} />
            </motion.div>
            <h1 className="mt-4 font-display text-2xl font-black text-white">
              {mode === 'signup' ? (
                <>
                  انضمي لـ{' '}
                  <span className="gold-shine-text">رحمة خالد</span>
                </>
              ) : (
                <>
                  أهلاً بعودتكِ إلى{' '}
                  <span className="gold-shine-text">رحمة خالد</span>
                </>
              )}
            </h1>
            <p className="mt-2 text-xs text-white/55">
              {mode === 'signup'
                ? 'أنشئي حسابكِ وابدئي رحلة التفوق'
                : 'سجّلي دخولكِ للوصول لمناهجكِ'}
            </p>
          </div>

          {/* Mode switcher */}
          <div className="mb-6 flex rounded-xl border border-white/10 bg-white/[0.02] p-1">
            {[
              { id: 'signin', label: 'تسجيل الدخول' },
              { id: 'signup', label: 'حساب جديد' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                  mode === m.id
                    ? 'bg-gradient-to-l from-gold-400 to-gold-600 text-black shadow-gold-glow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="mb-5 grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs font-semibold text-white/80 transition-all hover:border-gold-400/40 hover:bg-white/[0.04]">
              <Chrome className="h-3.5 w-3.5" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs font-semibold text-white/80 transition-all hover:border-gold-400/40 hover:bg-white/[0.04]">
              <Github className="h-3.5 w-3.5" /> Apple
            </button>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              أو
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={(e) => {
                e.preventDefault();
                navigate(mode === 'signup' ? '/student' : '/student');
              }}
              className="space-y-3"
            >
              {mode === 'signup' && (
                <Field
                  icon={User}
                  label="الاسم الكامل"
                  type="text"
                  placeholder="مثال: فاطمة الزهراء"
                />
              )}
              <Field
                icon={Mail}
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@mail.com"
              />
              {mode === 'signup' && (
                <Field
                  icon={Phone}
                  label="رقم الهاتف"
                  type="tel"
                  placeholder="+20 100 ••• 8888"
                />
              )}
              <PasswordField />

              {mode === 'signup' ? (
                <label className="flex items-start gap-2 pt-1 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 accent-gold-400"
                  />
                  <span>
                    أوافق على{' '}
                    <a className="text-gold-200 hover:underline" href="#">
                      شروط الاستخدام
                    </a>{' '}
                    و{' '}
                    <a className="text-gold-200 hover:underline" href="#">
                      سياسة الخصوصية
                    </a>
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center gap-2 text-white/60">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-gold-400"
                    />
                    تذكريني
                  </label>
                  <a
                    href="#"
                    className="font-semibold text-gold-200 hover:text-gold-100"
                  >
                    نسيتِ كلمة المرور؟
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="btn-gold mt-2 w-full justify-center py-3 text-sm"
              >
                <Crown className="h-4 w-4" strokeWidth={2.5} />
                {mode === 'signup' ? 'أنشئي الحساب' : 'تسجيل الدخول'}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Footer perks */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/5 pt-5">
            {[
              { icon: Shield, label: 'محمي 100%' },
              { icon: Sparkles, label: 'محتوى حصري' },
              { icon: CheckCircle2, label: 'ضمان الجودة' },
            ].map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <p.icon className="h-3.5 w-3.5 text-gold-300" />
                <p className="text-[10px] text-white/50">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ icon: Icon, label, type = 'text', placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold text-white/70">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pl-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.04] focus:shadow-gold-glow"
        />
      </div>
    </div>
  );
}

function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold text-white/70">
        كلمة المرور
      </label>
      <div className="relative">
        <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type={show ? 'text' : 'password'}
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.04] focus:shadow-gold-glow"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}