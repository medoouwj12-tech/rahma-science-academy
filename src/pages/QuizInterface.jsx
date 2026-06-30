import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  Timer,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Circle,
  Flag,
  Eye,
  EyeOff,
  Shield,
  Trophy,
  X,
  Send,
  Sparkles,
  BookOpen,
  RefreshCw,
  Home,
} from 'lucide-react';
import Watermark from '../components/Watermark';

const sampleQuestions = [
  {
    id: 1,
    text: 'ما هو العدد الذري لعنصر الكربون (C)؟',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '6' },
      { id: 'c', text: '8' },
      { id: 'd', text: '12' },
    ],
    correct: 'b',
    marks: 5,
    explanation: 'الكربون في الجدول الدوري يقع في المجموعة 14 وله 6 بروتونات.',
  },
  {
    id: 2,
    text: 'أي من المركبات التالية يُعتبر حمضاً according to نظرية أرينيوس؟',
    options: [
      { id: 'a', text: 'NaOH' },
      { id: 'b', text: 'HCl' },
      { id: 'c', text: 'NH₃' },
      { id: 'd', text: 'KCl' },
    ],
    correct: 'b',
    marks: 5,
  },
  {
    id: 3,
    text: 'ما وحدة قياس التركيز المولاري؟',
    options: [
      { id: 'a', text: 'مول/لتر' },
      { id: 'b', text: 'جرام/لتر' },
      { id: 'c', text: 'مول/كيلوجرام' },
      { id: 'd', text: 'لتر/مول' },
    ],
    correct: 'a',
    marks: 5,
  },
  {
    id: 4,
    text: 'التفاعل الكيميائي يحافظ على:',
    options: [
      { id: 'a', text: 'كتلة المتفاعلات فقط' },
      { id: 'b', text: 'عدد الذرات فقط' },
      { id: 'c', text: 'كتلة و عدد الذرات' },
      { id: 'd', text: 'حجم المواد' },
    ],
    correct: 'c',
    marks: 5,
  },
  {
    id: 5,
    text: 'العنصر الذي عدده الذري 11 هو:',
    options: [
      { id: 'a', text: 'الصوديوم' },
      { id: 'b', text: 'المغنيسيوم' },
      { id: 'c', text: 'البوتاسيوم' },
      { id: 'd', text: 'الكالسيوم' },
    ],
    correct: 'a',
    marks: 5,
  },
  {
    id: 6,
    text: 'ما الغاز الناتج عن تفاعل الأحماض مع الفلزات النشطة؟',
    options: [
      { id: 'a', text: 'الأكسجين' },
      { id: 'b', text: 'النيتروجين' },
      { id: 'c', text: 'الهيدروجين' },
      { id: 'd', text: 'ثاني أكسيد الكربون' },
    ],
    correct: 'c',
    marks: 5,
  },
  {
    id: 7,
    text: 'الرمز الكيميائي للذهب هو:',
    options: [
      { id: 'a', text: 'Gd' },
      { id: 'b', text: 'Go' },
      { id: 'c', text: 'Au' },
      { id: 'd', text: 'Ag' },
    ],
    correct: 'c',
    marks: 5,
  },
  {
    id: 8,
    text: 'كم إلكترون يستوعب مستوى الطاقة الثاني (n=2)؟',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '6' },
      { id: 'c', text: '8' },
      { id: 'd', text: '18' },
    ],
    correct: 'c',
    marks: 5,
  },
];

export default function QuizInterface() {
  const { quizId } = useParams();
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min
  const [showReview, setShowReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [started, submitted, timeLeft]);

  const total = sampleQuestions.length;
  const question = sampleQuestions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isLowTime = timeLeft < 60; // last minute warning
  const isWarnTime = timeLeft < 5 * 60;

  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const selectAnswer = (qid, oid) => {
    setAnswers((a) => ({ ...a, [qid]: oid }));
  };

  const toggleFlag = (idx) => {
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const score = submitted
    ? sampleQuestions.reduce(
        (acc, q) => (answers[q.id] === q.correct ? acc + q.marks : acc),
        0
      )
    : 0;
  const maxScore = sampleQuestions.length * 5;

  /* ===== Pre-quiz instructions ===== */
  if (!started) {
    return (
      <QuizIntro
        onStart={() => setStarted(true)}
        total={total}
        maxScore={maxScore}
      />
    );
  }

  /* ===== Result screen ===== */
  if (submitted) {
    const percent = Math.round((score / maxScore) * 100);
    const passed = percent >= 60;
    return (
      <ResultScreen
        score={score}
        maxScore={maxScore}
        percent={percent}
        passed={passed}
        onRetake={() => {
          setSubmitted(false);
          setStarted(false);
          setAnswers({});
          setCurrentIdx(0);
          setTimeLeft(30 * 60);
        }}
      />
    );
  }

  /* ===== Active quiz ===== */
  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      {/* Sticky timer + progress header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card gold-border sticky top-0 z-30 mb-5 overflow-hidden backdrop-blur-2xl"
      >
        <div className="px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600">
                <BookOpen className="h-5 w-5 text-black" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  اختبار الكيمياء
                </p>
                <h1 className="font-display text-sm font-bold text-white lg:text-base">
                  اختبار الوحدة الثالثة
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="chip">
                <Shield className="h-3 w-3" /> مُراقب
              </span>
              <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-xs font-bold text-gold-200">
                سؤال {currentIdx + 1} / {total}
              </span>
            </div>

            {/* Timer */}
            <motion.div
              animate={
                isLowTime
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 0.6, repeat: Infinity }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-lg font-black ${
                isLowTime
                  ? 'border-rose-400/40 bg-rose-500/15 text-rose-300 shadow-[0_0_30px_-6px_rgba(244,63,94,0.6)]'
                  : isWarnTime
                  ? 'border-amber-400/40 bg-amber-500/10 text-amber-300'
                  : 'border-gold-400/30 bg-gold-400/10 text-gold-200'
              }`}
            >
              <Timer className="h-5 w-5" />
              {fmtTime(timeLeft)}
              {isLowTime && (
                <AlertTriangle className="h-4 w-4 animate-pulse text-rose-400" />
              )}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-white/55">
              <span>
                {answeredCount} إجابة •{' '}
                <span className="text-gold-200">{flagged.size} مُعلَّم</span>
              </span>
              <span>
                {Math.round(((currentIdx + 1) / total) * 100)}%
              </span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-l from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
              />
              {/* Question dots */}
              <div className="absolute inset-0 flex items-center justify-between px-0.5">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      answers[q.id]
                        ? 'bg-emerald-400'
                        : flagged.has(i)
                        ? 'bg-amber-400'
                        : 'bg-white/20'
                    } ${i === currentIdx ? 'scale-150 ring-2 ring-gold-300 ring-offset-2 ring-offset-black' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Question area */}
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="glass-card gold-border relative overflow-hidden p-6 lg:p-8"
        >
          <Watermark />

          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-xs font-bold text-gold-200">
                السؤال {currentIdx + 1}
              </span>
              <button
                onClick={() => toggleFlag(currentIdx)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  flagged.has(currentIdx)
                    ? 'border-amber-400/40 bg-amber-500/15 text-amber-300'
                    : 'border-white/10 text-white/60 hover:border-gold-400/40 hover:text-gold-200'
                }`}
              >
                <Flag className="h-3.5 w-3.5" />
                {flagged.has(currentIdx) ? 'مُعلَّم' : 'علِّم للمراجعة'}
              </button>
            </div>

            <h2 className="font-display text-2xl font-bold leading-snug text-white lg:text-3xl">
              {question.text}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((opt, i) => {
                const isSelected = answers[question.id] === opt.id;
                const letter = ['أ', 'ب', 'ج', 'د'][i];
                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => selectAnswer(question.id, opt.id)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition-all lg:p-5 ${
                      isSelected
                        ? 'border-gold-400/60 bg-gold-400/10 shadow-gold-glow'
                        : 'border-white/5 bg-white/[0.02] hover:border-gold-400/30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-black transition-all ${
                        isSelected
                          ? 'bg-gold-400 text-black shadow-gold-glow'
                          : 'border border-white/10 bg-white/[0.02] text-white/60 group-hover:border-gold-400/40 group-hover:text-gold-200'
                      }`}
                    >
                      {letter}
                    </div>
                    <span
                      className={`flex-1 text-base font-semibold ${
                        isSelected ? 'text-white' : 'text-white/80'
                      }`}
                    >
                      {opt.text}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-gold-300" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/5 pt-6">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="btn-ghost-gold px-4 py-2.5 text-sm disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
                السابق
              </button>

              {currentIdx < total - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="btn-gold gap-2 px-6 py-2.5 text-sm"
                >
                  التالي
                  <ChevronLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="btn-gold gap-2 px-6 py-2.5 text-sm"
                >
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                  إرسال الاختبار
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar — navigator + warning */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Question grid */}
          <div className="glass-card relative overflow-hidden p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              خريطة الأسئلة
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {sampleQuestions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`relative aspect-square rounded-lg border text-xs font-bold transition-all ${
                    i === currentIdx
                      ? 'border-gold-400 bg-gold-400/15 text-gold-200 shadow-gold-glow'
                      : answers[q.id]
                      ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                      : flagged.has(i)
                      ? 'border-amber-400/40 bg-amber-500/15 text-amber-300'
                      : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-gold-400/40'
                  }`}
                >
                  {i + 1}
                  {flagged.has(i) && (
                    <Flag className="absolute -left-1 -top-1 h-2.5 w-2.5 text-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Warning box */}
          <motion.div
            animate={
              isLowTime
                ? { scale: [1, 1.02, 1] }
                : {}
            }
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`rounded-2xl border p-4 ${
              isLowTime
                ? 'border-rose-400/40 bg-rose-500/10'
                : isWarnTime
                ? 'border-amber-400/30 bg-amber-500/10'
                : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                className={`h-5 w-5 shrink-0 ${
                  isLowTime
                    ? 'text-rose-400'
                    : isWarnTime
                    ? 'text-amber-400'
                    : 'text-gold-300'
                }`}
              />
              <div className="text-xs">
                <p
                  className={`font-bold ${
                    isLowTime
                      ? 'text-rose-300'
                      : isWarnTime
                      ? 'text-amber-300'
                      : 'text-white'
                  }`}
                >
                  {isLowTime
                    ? '⚠️ آخر دقيقة!'
                    : isWarnTime
                    ? '⏰ الوقت ينفد'
                    : '📋 تنبيهات'}
                </p>
                <ul className="mt-2 space-y-1 text-white/65">
                  <li>• لا تنقلي بين التبويبات</li>
                  <li>• الإجابة تُحفظ تلقائياً</li>
                  <li>• اضغطي إرسال عند الانتهاء</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Submit button */}
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="btn-gold w-full justify-center py-3 text-sm"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
            إرسال الاختبار
          </button>

          <p className="text-center text-[11px] text-white/40">
            {answeredCount} من {total} سؤال تمت الإجابة عليه
          </p>
        </motion.aside>
      </div>

      {/* Submit confirm modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowSubmitConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card gold-border relative max-w-md p-6 text-center"
            >
              <Send className="mx-auto mb-3 h-12 w-12 text-gold-300" />
              <h3 className="font-display text-xl font-bold text-white">
                إرسال الاختبار؟
              </h3>
              <p className="mt-2 text-sm text-white/60">
                أجبتِ على {answeredCount} من {total} سؤال.
                {total - answeredCount > 0 &&
                  ` باقي ${total - answeredCount} سؤال بدون إجابة.`}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="btn-ghost-gold px-5 py-2.5 text-xs"
                >
                  رجوع
                </button>
                <button
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    setSubmitted(true);
                  }}
                  className="btn-gold px-5 py-2.5 text-xs"
                >
                  نعم، إرسال
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========== Pre-quiz intro ========== */
function QuizIntro({ onStart, total, maxScore }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card gold-border relative w-full max-w-2xl overflow-hidden p-8 lg:p-12"
        dir="rtl"
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gold-400/8 blur-3xl" />

        <div className="relative text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
          >
            <Trophy className="h-10 w-10 text-black" strokeWidth={1.8} />
          </motion.div>

          <span className="chip mb-3">
            <Shield className="h-3 w-3" /> اختبار مُراقب
          </span>
          <h1 className="font-display text-3xl font-black text-white lg:text-4xl">
            اختبار <span className="gold-text">الوحدة الثالثة</span>
          </h1>
          <p className="mt-2 text-base text-white/60">
            كيمياء — الصف الثالث الثانوي
          </p>

          <div className="my-8 grid grid-cols-3 gap-3">
            {[
              { label: 'أسئلة', value: total },
              { label: 'دقيقة', value: 30 },
              { label: 'درجة', value: maxScore },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gold-400/20 bg-gold-400/[0.04] p-3"
              >
                <p className="font-display text-2xl font-black text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] text-white/50">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-right text-sm text-white/65">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>المدة 30 دقيقة — يبدأ العداد تلقائياً عند البدء</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>الإجابة تُحفظ تلقائياً عند الاختيار</span>
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>يُمنع تبديل التبويبات أو نسخ الشاشة</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>علامة مائية متحركة تحمي المحتوى</span>
            </p>
          </div>

          <button onClick={onStart} className="btn-gold w-full justify-center py-4 text-base">
            <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            ابدئي الاختبار الآن
          </button>

          <Link
            to="/student"
            className="mt-3 inline-flex items-center gap-1 text-xs text-white/50 hover:text-gold-200"
          >
            <ChevronRight className="h-3 w-3" />
            العودة لصفحة الطالب
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ========== Result screen ========== */
function ResultScreen({ score, maxScore, percent, passed, onRetake }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card gold-border relative w-full max-w-2xl overflow-hidden p-8 lg:p-12"
        dir="rtl"
      >
        <div
          className={`pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl ${
            passed ? 'bg-emerald-400/15' : 'bg-rose-400/10'
          }`}
        />

        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-gold-glow ${
              passed
                ? 'bg-gradient-to-br from-emerald-300 to-emerald-600'
                : 'bg-gradient-to-br from-rose-300 to-rose-600'
            }`}
          >
            {passed ? (
              <CheckCircle2 className="h-12 w-12 text-black" strokeWidth={2} />
            ) : (
              <XCircle className="h-12 w-12 text-black" strokeWidth={2} />
            )}
          </motion.div>

          <h1 className="font-display text-3xl font-black text-white lg:text-4xl">
            {passed ? (
              <>
                أحسنتِ! <span className="gold-text">نجحتِ</span>
              </>
            ) : (
              <>
                حاولي <span className="gold-text">مرة أخرى</span>
              </>
            )}
          </h1>

          {/* Score circle */}
          <div className="my-8 flex justify-center">
            <div className="relative h-44 w-44">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#result-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percent / 100) * 264} 264`}
                  initial={{ strokeDasharray: '0 264' }}
                  animate={{
                    strokeDasharray: `${(percent / 100) * 264} 264`,
                  }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
                  }}
                />
                <defs>
                  <linearGradient id="result-grad">
                    <stop offset="0%" stopColor="#F3E5AB" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8941F" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-5xl font-black gold-text">
                  {percent}%
                </p>
                <p className="text-xs text-white/50">
                  {score} / {maxScore} درجة
                </p>
              </div>
            </div>
          </div>

          <div className="my-6 grid grid-cols-3 gap-3">
            <ResultStat label="صحيحة" value={Math.round((score / 5))} color="emerald" />
            <ResultStat
              label="خاطئة"
              value={Math.round((maxScore - score) / 5)}
              color="rose"
            />
            <ResultStat label="التقييم" value={passed ? 'ممتاز' : 'جيد'} color="gold" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={onRetake} className="btn-ghost-gold gap-2 px-5 py-2.5 text-sm">
              <RefreshCw className="h-4 w-4" />
              إعادة الاختبار
            </button>
            <Link to="/student" className="btn-gold gap-2 px-5 py-2.5 text-sm">
              <Home className="h-4 w-4" />
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ResultStat({ label, value, color }) {
  const colorMap = {
    emerald: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
    rose: 'border-rose-400/30 bg-rose-500/10 text-rose-300',
    gold: 'border-gold-400/30 bg-gold-400/10 text-gold-200',
  };
  return (
    <div className={`rounded-2xl border p-3 ${colorMap[color]}`}>
      <p className="font-display text-2xl font-black">{value}</p>
      <p className="mt-1 text-[11px] opacity-70">{label}</p>
    </div>
  );
}