import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CreditCard,
  Wallet,
  Shield,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  Crown,
  Tag,
  Gift,
  Star,
  Clock,
  Users,
  BookOpen,
} from 'lucide-react';
import { courses } from '../data/mockData';

export default function CheckoutPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(courseId)) || courses[0];
  const [method, setMethod] = useState('card');
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const discount = applied ? 0.2 : 0;
  const subtotal = course.price;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt;

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  if (done) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4 py-10"
        dir="rtl"
      >
        <div className="pointer-events-none fixed inset-0 grid-lines opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card gold-border relative w-full max-w-md overflow-hidden p-8 text-center"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald-400/15 blur-3xl" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 shadow-gold-glow"
          >
            <CheckCircle2 className="h-10 w-10 text-black" strokeWidth={2.4} />
          </motion.div>
          <h1 className="font-display text-2xl font-black text-white">
            تم الاشتراك <span className="gold-text">بنجاح!</span>
          </h1>
          <p className="mt-2 text-sm text-white/65">
            مرحباً بكِ في "{course.title}". ستجدين الدورة في لوحة الطالب.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/student" className="btn-gold px-5 py-2.5 text-sm">
              ابدئي التعلّم
            </Link>
            <Link to="/" className="btn-ghost-gold px-5 py-2.5 text-sm">
              الرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-10" dir="rtl">
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-20" />
      <div className="pointer-events-none fixed -left-32 top-20 h-[400px] w-[400px] rounded-full bg-gold-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2 text-sm text-white/50">
          <Link to="/" className="hover:text-gold-200">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <Link to="/#courses" className="hover:text-gold-200">
            الدورات
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="text-white/80">إتمام الطلب</span>
        </div>

        <h1 className="mb-2 font-display text-3xl font-black text-white lg:text-4xl">
          إتمام <span className="gold-text">الاشتراك</span>
        </h1>
        <p className="mb-8 text-sm text-white/55">
          أنتِ على بُعد خطوة واحدة من بدء رحلتكِ التعليمية
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Payment form */}
          <motion.form
            onSubmit={handlePay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative overflow-hidden p-6 lg:p-7"
          >
            <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
              <CreditCard className="h-5 w-5 text-gold-300" />
              طريقة الدفع
            </h2>

            {/* Methods */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'بطاقة', icon: CreditCard },
                { id: 'wallet', label: 'محفظة', icon: Wallet },
                { id: 'cash', label: 'فودافون كاش', icon: Tag },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    method === m.id
                      ? 'border-gold-400/50 bg-gold-400/10 shadow-gold-glow'
                      : 'border-white/10 bg-white/[0.02] hover:border-gold-400/30'
                  }`}
                >
                  <m.icon
                    className={`h-5 w-5 ${
                      method === m.id ? 'text-gold-200' : 'text-white/60'
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      method === m.id ? 'text-gold-100' : 'text-white/70'
                    }`}
                  >
                    {m.label}
                  </span>
                  {method === m.id && (
                    <CheckCircle2 className="absolute left-2 top-2 h-4 w-4 text-gold-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Form fields */}
            {method === 'card' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-3"
              >
                <Field label="الاسم على البطاقة" placeholder="FATIMA ZAHRA" />
                <Field
                  label="رقم البطاقة"
                  placeholder="4242 4242 4242 4242"
                  icon={CreditCard}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="تاريخ الانتهاء" placeholder="MM/YY" />
                  <Field label="CVV" placeholder="123" />
                </div>
              </motion.div>
            )}

            {method === 'wallet' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-3"
              >
                <Field label="رقم المحفظة" placeholder="01XXX XXX XXXX" />
                <Field label="كلمة المرور" type="password" placeholder="••••" />
              </motion.div>
            )}

            {method === 'cash' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-3"
              >
                <Field label="رقم فودافون كاش" placeholder="010XXXXXXXX" />
              </motion.div>
            )}

            {/* Coupon */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-2 text-[11px] font-semibold text-white/60">
                هل لديكِ كود خصم؟
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Gift className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="RAHMA20"
                    className="w-full rounded-xl border border-white/10 bg-black/30 py-2 pl-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold-400/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => coupon && setApplied(true)}
                  className="btn-ghost-gold px-4 py-2 text-xs"
                >
                  تطبيق
                </button>
              </div>
              {applied && (
                <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  تم تطبيق خصم 20% بنجاح
                </p>
              )}
            </div>

            {/* Trust */}
            <div className="mt-5 flex items-center justify-between text-[11px] text-white/45">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> مدفوعات مشفّرة 256-bit
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> ضمان استرداد 14 يوم
              </span>
            </div>
          </motion.form>

          {/* Summary */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div className="glass-card gold-border relative overflow-hidden p-5 lg:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/10 blur-3xl" />
              <h3 className="font-display text-base font-bold text-white">
                ملخص الطلب
              </h3>

              {/* Course mini-card */}
              <div className="relative mt-4 overflow-hidden rounded-xl border border-white/5">
                <div
                  className={`relative h-28 bg-gradient-to-br ${course.cover}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                  <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/30 text-xl backdrop-blur-md">
                    {course.emoji}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                      {course.chapters} فصل • {course.lectures} محاضرة
                    </span>
                  </div>
                </div>
                <div className="bg-black/40 p-3">
                  <p className="line-clamp-1 text-sm font-bold text-white">
                    {course.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-white/55">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course.enrolled}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> وصول مدى الحياة
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="relative mt-5 space-y-2 border-t border-white/5 pt-4 text-sm">
                <Row label="سعر الدورة" value={`${subtotal.toLocaleString()} ج.م`} />
                {applied && (
                  <Row
                    label="الخصم (20%)"
                    value={`- ${discountAmt.toLocaleString()} ج.م`}
                    color="emerald"
                  />
                )}
                <Row label="ضريبة القيمة المضافة" value="شامل" muted />
                <div className="my-2 h-px bg-white/5" />
                <Row
                  label="الإجمالي"
                  value={`${total.toLocaleString()} ج.م`}
                  bold
                  gold
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                onClick={handlePay}
                className="btn-gold mt-5 w-full justify-center py-3 text-sm disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" strokeWidth={2.5} />
                    ادفعي {total.toLocaleString()} ج.م
                  </>
                )}
              </button>

              {/* Perks */}
              <ul className="mt-5 space-y-2 text-[11px] text-white/55">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  وصول فوري بعد الدفع
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  شهادة إتمام معتمدة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ضمان استرداد 14 يوم
                </li>
                <li className="flex items-center gap-2">
                  <Crown className="h-3.5 w-3.5 text-gold-300" />
                  محتوى حصري مدى الحياة
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-gold-200"
            >
              <ArrowLeft className="h-3 w-3" />
              العودة للتسوق
            </Link>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', icon: Icon }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold text-white/70">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.04] focus:shadow-gold-glow ${
            Icon ? 'pl-3 pr-10' : 'px-3'
          }`}
        />
      </div>
    </div>
  );
}

function Row({ label, value, bold, gold, muted, color }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-xs ${muted ? 'text-white/40' : 'text-white/65'} ${
          bold ? 'text-sm font-bold text-white' : ''
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono ${
          gold
            ? 'font-display text-lg font-black gold-text'
            : color === 'emerald'
            ? 'text-sm font-bold text-emerald-400'
            : bold
            ? 'text-sm font-bold text-white'
            : 'text-sm text-white/80'
        }`}
      >
        {value}
      </span>
    </div>
  );
}