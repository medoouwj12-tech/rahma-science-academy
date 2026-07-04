import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  LucideClipboardList as ClipboardList,
  Plus,
  Timer,
  CheckCircle2,
  XCircle,
  GripVertical,
  Sparkles,
  Award,
  Trash2,
  Eye,
  X,
} from 'lucide-react';
import { quizzes } from '../data/mockData';
import CountUp from './CountUp';
import { useToast } from './Toast';

export default function QuizCreator() {
  const { success, error } = useToast();
  const [quizList, setQuizList] = useState([...quizzes]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'mcq',
      text: 'ما هو العدد الذري للكربون؟',
      marks: 5,
      options: [
        { id: 'a', text: '6', correct: true },
        { id: 'b', text: '8', correct: false },
        { id: 'c', text: '12', correct: false },
        { id: 'd', text: '14', correct: false },
      ],
    },
  ]);

  const handleDeleteQuiz = (quizId) => {
    setQuizList(quizList.filter(q => q.id !== quizId));
    success('تم حذف الاختبار');
  };

  const handleSaveQuiz = () => {
    const newQuiz = {
      id: 'q' + Date.now(),
      title: 'اختبار جديد — ' + questions.length + ' أسئلة',
      course: 'العلوم — إعدادي',
      questions: questions.length,
      duration: 30,
      attempts: 0,
      avgScore: 0,
      status: 'scheduled',
    };
    setQuizList([...quizList, newQuiz]);
    setShowBuilder(false);
    success('تم حفظ ونشر الاختبار بنجاح');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      className="space-y-5"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <ClipboardList className="h-5 w-5 text-gold-400" strokeWidth={1.8} />
            الاختبارات وبنك الأسئلة
          </h3>
          <p className="mt-1 text-xs text-white/50">
            أنشئي اختبارات تفاعلية مع مؤقت صارم وحماية كاملة
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBuilder(true)}
          className="btn-gold gap-2 px-5 py-2.5 text-sm"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          اختبار جديد
        </motion.button>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {quizList.map((q, i) => (
          <QuizCard
            key={q.id}
            quiz={q}
            index={i}
            onPreview={() => setPreviewQuiz(q)}
            onDelete={() => handleDeleteQuiz(q.id)}
          />
        ))}
      </div>

      {/* Builder Modal */}
      <AnimatePresence>
        {showBuilder && (
          <QuizBuilder
            questions={questions}
            setQuestions={setQuestions}
            onClose={() => setShowBuilder(false)}
            onSave={handleSaveQuiz}
          />
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewQuiz && (
          <PreviewQuizModal quiz={previewQuiz} onClose={() => setPreviewQuiz(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function QuizCard({ quiz, index, onPreview, onDelete }) {
  const active = quiz.status === 'active';
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.75 + index * 0.07 }}
      whileHover={{ y: -3 }}
      className="glass-card glass-card-hover group relative overflow-hidden p-5"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gold-400/8 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                active
                  ? 'border border-emerald-300/30 bg-emerald-500/15 text-emerald-300'
                  : 'border border-amber-300/30 bg-amber-500/15 text-amber-300'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              {active ? 'نشط' : 'مجدول'}
            </span>
            <span className="chip">{quiz.course}</span>
          </div>
          <h4 className="mt-2 text-base font-bold text-white">{quiz.title}</h4>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onPreview}
            className="btn-ghost-gold h-8 w-8 p-0"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        <StatBox
          label="أسئلة"
          value={quiz.questions}
          icon={ClipboardList}
          color="gold"
        />
        <StatBox
          label="دقائق"
          value={quiz.duration}
          icon={Timer}
          color="rose"
        />
        <StatBox
          label="متوسط"
          value={quiz.avgScore}
          suffix="%"
          icon={Award}
          color="emerald"
        />
      </div>

      {/* Attempts bar */}
      <div className="relative mt-5">
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <span>المحاولات</span>
          <span className="font-bold text-gold-200">
            <CountUp value={quiz.attempts} /> محاولة
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((quiz.attempts / 2000) * 100, 100)}%` }}
            transition={{ duration: 1.2, delay: 0.9 + index * 0.1 }}
            className="h-full rounded-full bg-gradient-to-l from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
          />
        </div>
      </div>
    </motion.article>
  );
}

function StatBox({ label, value, suffix = '', icon: Icon, color }) {
  const colorMap = {
    gold: 'text-gold-200 border-gold-400/20 bg-gold-400/5',
    rose: 'text-rose-300 border-rose-400/20 bg-rose-500/5',
    emerald:
      'text-emerald-300 border-emerald-400/20 bg-emerald-500/5',
  };
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 ${colorMap[color]}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[10px] text-white/50">{label}</p>
        <p className="font-display text-base font-bold">
          <CountUp value={value} suffix={suffix} />
        </p>
      </div>
    </div>
  );
}

function PreviewQuizModal({ quiz, onClose }) {
  const active = quiz.status === 'active';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card gold-border relative w-full max-w-md p-6"
        dir="rtl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold gold-text">معاينة الاختبار</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-[10px] text-white/50 uppercase mb-1">عنوان الاختبار</p>
            <p className="text-sm font-bold text-white">{quiz.title}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">المنهج</p>
              <p className="text-sm font-bold text-gold-200 mt-1">{quiz.course}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">الحالة</p>
              <p className={`text-sm font-bold mt-1 ${active ? 'text-emerald-300' : 'text-amber-300'}`}>
                {active ? 'نشط' : 'مجدول'}
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">عدد الأسئلة</p>
              <p className="text-lg font-bold text-white mt-1">{quiz.questions}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">المدة</p>
              <p className="text-lg font-bold text-white mt-1">{quiz.duration} دقيقة</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">المتوسط</p>
              <p className="text-lg font-bold text-emerald-300 mt-1">{quiz.avgScore}%</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-[10px] text-white/50">المحاولات</p>
              <p className="text-lg font-bold text-gold-200 mt-1">{quiz.attempts}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuizBuilder({ questions, setQuestions, onClose, onSave }) {
  const [type, setType] = useState('mcq');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type,
        text: 'سؤال جديد...',
        marks: 5,
        options:
          type === 'mcq'
            ? [
                { id: 'a', text: 'خيار 1', correct: true },
                { id: 'b', text: 'خيار 2', correct: false },
              ]
            : [],
      },
    ]);
  };

  const deleteQuestion = (qId) => {
    if (questions.length <= 1) {
      error('لا يمكن حذف السؤال الأخير');
      return;
    }
    setQuestions(questions.filter(q => q.id !== qId));
  };

  const updateQuestionText = (qId, text) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, text } : q));
  };

  const updateQuestionMarks = (qId, marks) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, marks: parseInt(marks) || 0 } : q));
  };

  const updateOptionText = (qId, optId, text) => {
    setQuestions(questions.map(q =>
      q.id === qId
        ? { ...q, options: q.options.map(o => o.id === optId ? { ...o, text } : o) }
        : q
    ));
  };

  const toggleCorrect = (qId, optId) => {
    setQuestions(questions.map(q =>
      q.id === qId
        ? { ...q, options: q.options.map(o => ({ ...o, correct: o.id === optId })) }
        : q
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card gold-border relative max-h-[92vh] w-full max-w-3xl overflow-y-auto p-6 lg:p-8"
        dir="rtl"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/15 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-display text-xl font-bold gold-text">
              <Sparkles className="h-5 w-5 text-gold-300" />
              منشئ الاختبارات الذكي
            </h3>
            <p className="mt-1 text-xs text-white/50">
              ابنِ اختبارات احترافية مع مؤقت صارم وتقييم تلقائي
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-white/40 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Settings */}
        <div className="relative mt-6 grid grid-cols-1 gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-white/60">
              مدة الاختبار (دقيقة)
            </label>
            <div className="relative">
              <Timer className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-400" />
              <input
                defaultValue="30"
                type="number"
                className="w-full rounded-lg border border-white/10 bg-black/30 py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-gold-400/40"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-white/60">
              عدد الأسئلة
            </label>
            <input
              value={questions.length}
              readOnly
              type="number"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-gold-400/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-white/60">
              درجة النجاح %
            </label>
            <input
              defaultValue="60"
              type="number"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-gold-400/40"
            />
          </div>
        </div>

        {/* Question type */}
        <div className="relative mt-5 flex items-center gap-2">
          <span className="text-xs text-white/60">نوع السؤال:</span>
          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1 text-xs">
            {[
              { id: 'mcq', label: 'اختيار متعدد' },
              { id: 'tf', label: 'صح / خطأ' },
              { id: 'essay', label: 'مقالي' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  type === t.id
                    ? 'bg-gold-400/15 text-gold-100 shadow-gold-glow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        <div className="relative mt-4 space-y-3">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 cursor-grab text-white/30 hover:text-gold-300">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-xs font-bold text-gold-200">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    value={q.text}
                    onChange={(e) => updateQuestionText(q.id, e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-gold-400/40"
                  />
                  {q.type === 'mcq' && (
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="group flex items-center gap-2 rounded-lg border border-white/5 bg-black/20 p-2 cursor-pointer"
                          onClick={() => toggleCorrect(q.id, opt.id)}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                              opt.correct
                                ? 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                                : 'border border-white/10 bg-white/5 text-white/40'
                            }`}
                          >
                            {opt.correct ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                          </span>
                          <input
                            value={opt.text}
                            onChange={(e) => { e.stopPropagation(); updateOptionText(q.id, opt.id, e.target.value); }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-transparent text-sm text-white outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <input
                    value={q.marks}
                    onChange={(e) => updateQuestionMarks(q.id, e.target.value)}
                    type="number"
                    className="w-14 rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-center text-xs text-white outline-none focus:border-gold-400/40"
                  />
                  <span className="text-[10px] text-white/40">درجة</span>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.01] py-3 text-sm font-semibold text-white/60 transition-all hover:border-gold-400/40 hover:bg-gold-400/[0.03] hover:text-gold-200"
        >
          <Plus className="h-4 w-4" />
          إضافة سؤال جديد
        </button>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="btn-ghost-gold px-5 py-2.5 text-xs">
            إلغاء
          </button>
          <button
            onClick={onSave}
            className="btn-gold px-5 py-2.5 text-xs"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            حفظ ونشر الاختبار
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}