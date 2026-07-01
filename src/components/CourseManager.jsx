import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Plus,
  MoreVertical,
  Users,
  Clock,
  Star,
  Edit3,
  Trash2,
  Eye,
  Upload,
  Layers,
  Search,
  X,
} from 'lucide-react';
import { courses } from '../data/mockData';
import CountUp from './CountUp';

export default function CourseManager() {
  const [courseList, setCourseList] = useState([...courses]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);

  const filtered = courseList.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (
      search &&
      !c.title.includes(search) &&
      !c.subtitle.includes(search)
    )
      return false;
    return true;
  });

  const handleDeleteCourse = (courseId) => {
    if (confirm('هل أنتِ متأكدة من حذف هذا المنهج؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setCourseList(courseList.filter(c => c.id !== courseId));
    }
  };

  const handleCreateCourse = (newCourse) => {
    setCourseList([...courseList, {
      ...newCourse,
      id: Date.now(),
      enrolled: 0,
      rating: 0,
      status: 'draft',
      cover: 'from-violet-400 via-purple-500 to-violet-700',
      emoji: '📚',
      color: '#8B5CF6',
    }]);
    setShowCreate(false);
  };

  const handleEditCourse = (updated) => {
    setCourseList(courseList.map(c => c.id === updated.id ? { ...c, ...updated } : c));
    setEditingCourse(null);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
      className="space-y-5"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <Layers className="h-5 w-5 text-gold-400" strokeWidth={1.8} />
            إدارة المناهج والمحتوى
          </h3>
          <p className="mt-1 text-xs text-white/50">
            أنشئي، حرّري، وانشري مناهج العلوم بسهولة تامة
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreate(true)}
          className="btn-gold gap-2 px-5 py-2.5 text-sm"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          منهج جديد
        </motion.button>
      </div>

      {/* Toolbar */}
      <div className="glass-card flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحثي عن منهج..."
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 pl-3 pr-9 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold-400/40"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1 text-xs font-semibold">
          {[
            { id: 'all', label: `الكل (${courseList.length})` },
            { id: 'published', label: 'منشور' },
            { id: 'draft', label: 'مسودة' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-3 py-1.5 transition-all ${
                filter === f.id
                  ? 'bg-gold-400/15 text-gold-100 shadow-gold-glow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => alert('جاري فتح مدير رفع الفيديوهات...')}
          className="btn-ghost-gold h-9 px-3 text-xs"
        >
          <Upload className="h-3.5 w-3.5" />
          رفع فيديو
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c, i) => (
          <CourseCard
            key={c.id}
            course={c}
            index={i}
            onEdit={() => setEditingCourse(c)}
            onDelete={() => handleDeleteCourse(c.id)}
            onPreview={() => setPreviewCourse(c)}
          />
        ))}

        {/* New course placeholder */}
        <motion.button
          onClick={() => setShowCreate(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + filtered.length * 0.07 }}
          whileHover={{ scale: 1.01 }}
          className="group flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] p-6 text-center transition-all hover:border-gold-400/40 hover:bg-gold-400/[0.03]"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 transition-all group-hover:scale-110 group-hover:border-gold-400/60">
            <Plus className="h-6 w-6 text-gold-300" strokeWidth={2} />
          </div>
          <div>
            <p className="font-bold text-white">أنشئي منهج جديد</p>
            <p className="mt-1 text-xs text-white/50">
              ابدئي ببناء منهج علوم متكامل لطلابكِ
            </p>
          </div>
        </motion.button>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && <CreateCourseModal onClose={() => setShowCreate(false)} onCreate={handleCreateCourse} />}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingCourse && <EditCourseModal course={editingCourse} onClose={() => setEditingCourse(null)} onSave={handleEditCourse} />}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCourse && <PreviewCourseModal course={previewCourse} onClose={() => setPreviewCourse(null)} />}
      </AnimatePresence>
    </motion.section>
  );
}

function CourseCard({ course, index, onEdit, onDelete, onPreview }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 + index * 0.07 }}
      whileHover={{ y: -4 }}
      className="glass-card glass-card-hover group relative overflow-hidden"
    >
      {/* Cover */}
      <div
        className={`relative h-32 overflow-hidden bg-gradient-to-br ${course.cover}`}
      >
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/30 text-3xl backdrop-blur-md">
          {course.emoji}
        </div>
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold backdrop-blur-md ${
              course.status === 'published'
                ? 'border border-emerald-300/40 bg-emerald-500/20 text-emerald-200'
                : 'border border-amber-300/40 bg-amber-500/20 text-amber-200'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                course.status === 'published'
                  ? 'bg-emerald-400'
                  : 'bg-amber-400'
              }`}
            />
            {course.status === 'published' ? 'منشور' : 'مسودة'}
          </span>
        </div>
        <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
            <CountUp value={course.rating} decimals={2} />
          </div>
          <div className="font-display text-base font-bold text-white drop-shadow-lg">
            {course.price} <span className="text-xs font-medium">ج.م / حصة</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h4 className="line-clamp-1 text-base font-bold text-white">
          {course.title}
        </h4>
        <p className="mt-1 line-clamp-1 text-xs text-white/50">
          {course.subtitle}
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
          <Mini icon={Layers} label="فصل" value={course.chapters} />
          <Mini icon={Clock} label="محاضرة" value={course.lectures} />
          <Mini icon={Users} label="طالب" value={course.enrolled} gold />
        </div>

        {/* Action row */}
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={onEdit}
            className="btn-gold flex-1 py-2 text-xs"
          >
            <Edit3 className="h-3.5 w-3.5" strokeWidth={2.5} />
            تعديل
          </button>
          <button
            onClick={onPreview}
            className="btn-ghost-gold h-9 w-9 p-0"
          >
            <Eye className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="btn-ghost-gold h-9 w-9 p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 top-full z-10 mt-1 min-w-[140px] rounded-lg border border-white/10 bg-obsidian-light p-1 shadow-xl"
              >
                <button
                  onClick={() => { setMenuOpen(false); alert('تمت إضافة محاضرة جديدة بنجاح!'); }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-white/80 hover:bg-white/5"
                >
                  <Upload className="h-3.5 w-3.5" /> إضافة محاضرة
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDelete(); }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" /> حذف المنهج
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Mini({ icon: Icon, label, value, gold = false }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md ${
          gold ? 'border border-gold-400/20 bg-gold-400/10' : ''
        }`}
      >
        <Icon
          className={`h-3.5 w-3.5 ${gold ? 'text-gold-300' : 'text-white/50'}`}
          strokeWidth={1.8}
        />
      </div>
      <p
        className={`font-display text-sm font-bold ${
          gold ? 'text-gold-100' : 'text-white'
        }`}
      >
        <CountUp value={value} />
      </p>
      <p className="text-[10px] text-white/40">{label}</p>
    </div>
  );
}

function CreateCourseModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('40');
  const [stage, setStage] = useState('');
  const [chapters, setChapters] = useState('12');
  const [lectures, setLectures] = useState('36');

  const handleSubmit = () => {
    if (!title.trim()) { alert('من فضلك أدخلي عنوان المنهج'); return; }
    onCreate({
      title,
      subtitle: subtitle || stage,
      price: parseInt(price) || 40,
      stage: stage || 'غير محدد',
      chapters: parseInt(chapters) || 12,
      lectures: parseInt(lectures) || 36,
      priceUnit: 'ج.م / الحصة',
    });
    alert('تم إنشاء المنهج بنجاح! ✅');
  };

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
        className="glass-card gold-border relative max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 lg:p-8"
        dir="rtl"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/15 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold gold-text">
              منهج جديد
            </h3>
            <p className="mt-1 text-xs text-white/50">
              أنشئي منهج علوم لطلابكِ في دقائق
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-white/40 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="relative mt-6 space-y-4">
          <Field label="عنوان المنهج" placeholder="مثلاً: العلوم — المرحلة الإعدادية" value={title} onChange={setTitle} />
          <Field label="الوصف المختصر" placeholder="ملخص جذاب للمنهج..." textarea value={subtitle} onChange={setSubtitle} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="سعر الحصة (ج.م)" placeholder="40" value={price} onChange={setPrice} />
            <Field label="المرحلة الدراسية" placeholder="إعدادي — الترم الأول" value={stage} onChange={setStage} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="عدد الفصول" placeholder="12" value={chapters} onChange={setChapters} />
            <Field label="عدد المحاضرات" placeholder="36" value={lectures} onChange={setLectures} />
          </div>

          {/* Video upload */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/70">
              رفع المحاضرات (Bunny.net / Vimeo ID)
            </label>
            <div className="group flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] transition-all hover:border-gold-400/40 hover:bg-gold-400/[0.03]">
              <Upload className="h-7 w-7 text-gold-300 transition-transform group-hover:-translate-y-1" />
              <p className="text-sm font-semibold text-white">
                اسحبي ملفات الفيديو هنا
              </p>
              <p className="text-[11px] text-white/40">
                أو ألصقي Bunny/Vimeo ID مباشرةً
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost-gold px-5 py-2.5 text-xs"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-gold px-5 py-2.5 text-xs"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              إنشاء المنهج
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditCourseModal({ course, onClose, onSave }) {
  const [title, setTitle] = useState(course.title);
  const [subtitle, setSubtitle] = useState(course.subtitle);
  const [price, setPrice] = useState(String(course.price));
  const [chapters, setChapters] = useState(String(course.chapters));
  const [lectures, setLectures] = useState(String(course.lectures));

  const handleSubmit = () => {
    if (!title.trim()) { alert('من فضلك أدخلي عنوان المنهج'); return; }
    onSave({
      ...course,
      title,
      subtitle,
      price: parseInt(price) || course.price,
      chapters: parseInt(chapters) || course.chapters,
      lectures: parseInt(lectures) || course.lectures,
    });
    alert('تم تعديل المنهج بنجاح! ✅');
  };

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
        className="glass-card gold-border relative max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 lg:p-8"
        dir="rtl"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/15 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold gold-text">
              تعديل المنهج
            </h3>
            <p className="mt-1 text-xs text-white/50">
              عدّلي بيانات المنهج واحفظي التغييرات
            </p>
          </div>
          <button onClick={onClose} className="text-2xl text-white/40 hover:text-white">×</button>
        </div>

        <div className="relative mt-6 space-y-4">
          <Field label="عنوان المنهج" value={title} onChange={setTitle} />
          <Field label="الوصف المختصر" textarea value={subtitle} onChange={setSubtitle} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="سعر الحصة (ج.م)" value={price} onChange={setPrice} />
            <Field label="عدد الفصول" value={chapters} onChange={setChapters} />
            <Field label="عدد المحاضرات" value={lectures} onChange={setLectures} />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost-gold px-5 py-2.5 text-xs">إلغاء</button>
            <button type="button" onClick={handleSubmit} className="btn-gold px-5 py-2.5 text-xs">
              <Edit3 className="h-4 w-4" strokeWidth={2.5} />
              حفظ التعديلات
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PreviewCourseModal({ course, onClose }) {
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
        className="glass-card gold-border relative w-full max-w-lg overflow-hidden"
        dir="rtl"
      >
        <div className={`relative h-40 bg-gradient-to-br ${course.cover}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <div className="absolute right-5 top-5 text-4xl">{course.emoji}</div>
          <button onClick={onClose} className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-md">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 right-5 left-5">
            <h3 className="font-display text-xl font-bold text-white">{course.title}</h3>
            <p className="text-xs text-white/60 mt-1">{course.subtitle}</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[10px] text-white/50 uppercase">الفصول</p>
              <p className="font-display text-lg font-bold text-white">{course.chapters}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[10px] text-white/50 uppercase">المحاضرات</p>
              <p className="font-display text-lg font-bold text-white">{course.lectures}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[10px] text-white/50 uppercase">الطلاب المسجلين</p>
              <p className="font-display text-lg font-bold text-gold-200">{course.enrolled}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[10px] text-white/50 uppercase">السعر</p>
              <p className="font-display text-lg font-bold text-white">{course.price} ج.م</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>التقييم: <span className="text-gold-200 font-bold">{course.rating} ⭐</span></span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${course.status === 'published' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
              {course.status === 'published' ? 'منشور' : 'مسودة'}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, placeholder, textarea = false, value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/70">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.04] focus:shadow-gold-glow"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.04] focus:shadow-gold-glow"
        />
      )}
    </div>
  );
}