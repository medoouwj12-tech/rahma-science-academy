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
  Copy,
  Check,
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

  // Form states
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderName, setSenderName] = useState('');
  const [txnId, setTxnId] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const discount = applied ? 0.2 : 0;
  const subtotal = course.price;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handlePay = (e) => {
    if (e) e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  if (done) {
    const isManual = method === 'cash' || method === 'instapay';
    const waNumber = '201033304460';
    const waMessage = `السلام عليكم أستاذة رحمة، قمت بتحويل مبلغ ${total} ج.م للاشتراك في كورس "${course.title}" عبر ${
      method === 'cash' ? 'فودافون كاش' : 'إنستاباي'
    }.
بيانات التفعيل:
- الاسم: ${studentName || 'غير محدد'}
- البريد الإلكتروني: ${studentEmail || 'غير محدد'}
- الهاتف: ${studentPhone || 'غير محدد'}
- تفاصيل التحويل: من ${method === 'cash' ? senderPhone : senderName} ${txnId ? `(رقم المعاملة: ${txnId})` : ''}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    return (
      <div
        className="flex min-h-screen items-center justify-center px-4 py-10"
        dir="rtl"
      >
        <div className="pointer-events-none fixed inset-0 grid-lines opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card gold-border relative w-full max-w-lg overflow-hidden p-8 text-center shadow-gold-glow-lg"
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
            {isManual ? 'تم تسجيل الطلب ' : 'تم الاشتراك '}
            <span className="gold-text">بنجاح!</span>
          </h1>

          {isManual ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-4 text-sm text-white/80">
              <p className="font-bold text-gold-200">⚠️ خطوة التفعيل المتبقية:</p>
              <p>
                لتفعيل الكورس فوراً على حسابكِ، يرجى الضغط على الزر أدناه لإرسال لقطة الشاشة (إيصال التحويل) للأستاذة رحمة خالد عبر الواتساب.
              </p>
              <div className="text-right text-xs space-y-1 text-white/60">
                <p>• قيمة التحويل: <span className="text-gold-100 font-bold">{total} ج.م</span></p>
                <p>• رقم التحويل: <span className="text-gold-100 font-bold">01007466197</span></p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-white/65">
              مرحباً بكِ في "{course.title}". ستجدين المنهج في لوحة الطالب.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {isManual ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-2 px-6 py-3 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 border-none shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] text-white font-bold"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.5 22l4.31-1.34c1.55.93 3.35 1.48 5.27 1.48 5.52 0 10-4.48 10-10S17.52 2 12.004 2zm5.79 13.92c-.25.7-1.44 1.34-2.02 1.43-.5.08-1.14.15-3.32-.76-2.79-1.16-4.57-4-4.71-4.19-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.33.26-.27.56-.34.75-.34.19 0 .37.01.53.02.17.01.4.06.61.56.26.62.88 2.14.95 2.29.07.15.12.33.02.53-.1.2-.21.33-.33.48-.12.14-.26.32-.37.43-.12.12-.25.26-.11.5.14.24.63 1.03 1.35 1.67.92.82 1.7 1.07 1.94 1.19.24.12.38.1.52-.06.14-.17.62-.72.79-.97.17-.25.34-.21.57-.12.24.09 1.5.71 1.76.84.26.13.43.2.49.31.06.11.06.66-.19 1.36z"/>
                </svg>
                إرسال إيصال الدفع عبر الواتساب
              </a>
            ) : (
              <Link to="/student" className="btn-gold px-5 py-2.5 text-sm">
                ابدئي التعلّم
              </Link>
            )}
            <Link to="/student" className="btn-ghost-gold px-5 py-2.5 text-sm border-white/10 hover:border-gold-400/40">
              لوحة الطالب
            </Link>
            <Link to="/" className="btn-ghost-gold px-5 py-2.5 text-sm border-white/10 hover:border-gold-400/40">
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
            مناهج العلوم
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
            {/* Student Info Section */}
            <div className="mb-6 space-y-4">
              <h2 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-white">
                <Users className="h-5 w-5 text-gold-300 animate-pulse" />
                بيانات الطالب الأساسية
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="الاسم بالكامل"
                  placeholder="مثال: فاطمة الزهراء أحمد"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                <Field
                  label="رقم الهاتف للتواصل"
                  placeholder="مثال: 010XXXXXXXX"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  required
                />
              </div>
              <Field
                label="البريد الإلكتروني للتفعيل"
                placeholder="example@mail.com"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>

            <div className="my-6 h-px bg-white/5" />

            <h2 className="mb-5 flex items-center gap-2 font-display text-base font-bold text-white">
              <CreditCard className="h-5 w-5 text-gold-300" />
              طريقة الدفع
            </h2>

            {/* Methods */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'بطاقة ائتمانية', icon: CreditCard },
                { id: 'instapay', label: 'إنستاباي', icon: Wallet },
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

            {/* Form fields based on payment method */}
            {method === 'card' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-3"
              >
                <div className="rounded-2xl border border-gold-400/25 bg-gold-400/5 p-4 text-xs leading-relaxed text-white/80">
                  <p className="font-bold text-gold-200">الدفع الآمن بالبطاقة:</p>
                  <p className="mt-1 text-white/70">
                    سيتم معالجة بيانات بطاقتكِ بأمان تام عبر بوابة دفع Paymob المصرية لتفعيل حسابكِ مباشرة.
                  </p>
                </div>
                <Field label="الاسم على البطاقة" placeholder="FATIMA ZAHRA" required={method === 'card'} />
                <Field
                  label="رقم البطاقة"
                  placeholder="4242 4242 4242 4242"
                  icon={CreditCard}
                  required={method === 'card'}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="تاريخ الانتهاء" placeholder="MM/YY" required={method === 'card'} />
                  <Field label="CVV" placeholder="123" required={method === 'card'} />
                </div>
              </motion.div>
            )}

            {method === 'instapay' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-4"
              >
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-white/80">
                  <p className="mb-2 font-bold text-emerald-400">خطوات التحويل عبر إنستاباي (Instapay):</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/70">
                    <li>افتح تطبيق إنستاباي على هاتفكِ المحمول.</li>
                    <li>قم بتحويل قيمة الاشتراك إلى رقم الهاتف المخصص أدناه.</li>
                    <li>اكتب الاسم المحول منه، ثم اضغط تأكيد وأرسل الإيصال عبر الواتساب للتفعيل الفوري.</li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/45">رقم التحويل (إنستاباي)</p>
                      <p className="font-mono text-base font-bold text-white tracking-wider">01007466197</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('01007466197', 'phone')}
                      className="btn-ghost-gold flex items-center gap-1.5 px-3 py-1.5 text-[11px] h-auto border-white/10 hover:border-gold-400/40"
                    >
                      {copiedText === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gold-300" />}
                      <span>{copiedText === 'phone' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <p className="text-[10px] text-white/45">المبلغ الإجمالي</p>
                      <p className="font-mono text-base font-bold text-gold-200">{total} ج.م</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(total.toString(), 'amount')}
                      className="btn-ghost-gold flex items-center gap-1.5 px-3 py-1.5 text-[11px] h-auto border-white/10 hover:border-gold-400/40"
                    >
                      {copiedText === 'amount' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gold-300" />}
                      <span>{copiedText === 'amount' ? 'تم النسخ' : 'نسخ المبلغ'}</span>
                    </button>
                  </div>
                </div>

                <Field
                  label="اسم الحساب المحوَّل منه في إنستاباي"
                  placeholder="مثال: أحمد محمد علي"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required={method === 'instapay'}
                />
                <Field
                  label="رقم العملية / المرجع (إن وجد)"
                  placeholder="مثال: 561284"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                />
              </motion.div>
            )}

            {method === 'cash' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 space-y-4"
              >
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-xs leading-relaxed text-white/80">
                  <p className="mb-2 font-bold text-red-400">خطوات التحويل عبر فودافون كاش:</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/70">
                    <li>قم بتحويل قيمة الاشتراك إلى رقم فودافون كاش للمنصة أدناه.</li>
                    <li>تأكد من إرسال المبلغ كـ (تحويل أموال) وليس شحن رصيد.</li>
                    <li>أدخل الرقم المحول منه ورقم العملية، ثم اضغط تأكيد وأرسل الإيصال.</li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/45">رقم فودافون كاش للمنصة</p>
                      <p className="font-mono text-base font-bold text-white tracking-wider">01007466197</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('01007466197', 'phone')}
                      className="btn-ghost-gold flex items-center gap-1.5 px-3 py-1.5 text-[11px] h-auto border-white/10 hover:border-gold-400/40"
                    >
                      {copiedText === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gold-300" />}
                      <span>{copiedText === 'phone' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <p className="text-[10px] text-white/45">المبلغ المطلوب تحويله</p>
                      <p className="font-mono text-base font-bold text-gold-200">{total} ج.م</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(total.toString(), 'amount')}
                      className="btn-ghost-gold flex items-center gap-1.5 px-3 py-1.5 text-[11px] h-auto border-white/10 hover:border-gold-400/40"
                    >
                      {copiedText === 'amount' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gold-300" />}
                      <span>{copiedText === 'amount' ? 'تم النسخ' : 'نسخ المبلغ'}</span>
                    </button>
                  </div>
                </div>

                <Field
                  label="رقم الهاتف المحول منه كاش"
                  placeholder="مثال: 010XXXXXXXX"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  required={method === 'cash'}
                />
                <Field
                  label="رقم العملية / التحويل"
                  placeholder="مثال: 1098462710"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  required={method === 'cash'}
                />
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
                <Row label="سعر الحصة" value={`${subtotal} ج.م`} />
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
                    جاري معالجة الطلب...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" strokeWidth={2.5} />
                    {method === 'card'
                      ? `دفع ${total.toLocaleString()} ج.م بالبطاقة`
                      : method === 'instapay'
                      ? 'تأكيد التحويل عبر إنستاباي'
                      : 'تأكيد التحويل عبر كاش'}
                  </>
                )}
              </button>

              {/* Perks */}
              <ul className="mt-5 space-y-2 text-[11px] text-white/55">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  تفعيل سريع ومتابعة شخصية
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  شهادة إتمام معتمدة لكل طالبة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ضمان استرداد 14 يوم
                </li>
                <li className="flex items-center gap-2">
                  <Crown className="h-3.5 w-3.5 text-gold-300" />
                  وصول كامل ومستمر للمناهج
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-gold-200"
            >
              <ArrowLeft className="h-3 w-3" />
              العودة للرئيسية
            </Link>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', icon: Icon, value, onChange, required = false }) {
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
          value={value}
          onChange={onChange}
          required={required}
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