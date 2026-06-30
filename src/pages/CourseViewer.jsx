import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Lock,
  Download,
  Subtitles,
  Cast,
  Shield,
} from 'lucide-react';
import { courses } from '../data/mockData';
import Watermark from '../components/Watermark';

const playlist = [
  { id: 1, title: 'مقدمة الدورة وأهدافها', duration: '08:42', completed: true, locked: false, current: false },
  { id: 2, title: 'الجدول الدوري — الجزء الأول', duration: '24:18', completed: true, locked: false, current: false },
  { id: 3, title: 'الجدول الدوري — الجزء الثاني', duration: '22:05', completed: true, locked: false, current: false },
  { id: 4, title: 'التفاعلات الكيميائية', duration: '28:31', completed: true, locked: false, current: false },
  { id: 5, title: 'التفاعلات الكيميائية — الجزء الثاني', duration: '24:18', completed: false, locked: false, current: true },
  { id: 6, title: 'الروابط الكيميائية', duration: '26:45', completed: false, locked: false, current: false },
  { id: 7, title: 'الأحماض والقواعد', duration: '32:12', completed: false, locked: false, current: false },
  { id: 8, title: 'اختبار الوحدة الأولى', duration: '30:00', completed: false, locked: false, current: false },
  { id: 9, title: 'الكيمياء العضوية — مقدمة', duration: '28:00', completed: false, locked: true, current: false },
  { id: 10, title: 'الهيدروكربونات', duration: '26:30', completed: false, locked: true, current: false },
];

export default function CourseViewer() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId)) || courses[0];

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(35); // %
  const [currentTime, setCurrentTime] = useState(8 * 60 + 35); // 8:35
  const [showControls, setShowControls] = useState(true);

  // Simulate playback
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 0.4;
      });
      setCurrentTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const totalSeconds = 24 * 60 + 18;
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen px-4 py-5 lg:px-8 lg:py-7" dir="rtl">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 text-xs text-white/50"
      >
        <Link to="/student" className="hover:text-gold-200">
          دوراتي
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-white/80">{course.title}</span>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        {/* Player section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Player */}
          <div
            className="glass-card gold-border relative aspect-video overflow-hidden bg-black p-0"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => playing && setShowControls(false)}
          >
            {/* Background gradient simulating video */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${course.cover} opacity-40`}
            />
            <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Mock video content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ scale: playing ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
              >
                {playing ? (
                  <Pause className="h-9 w-9 text-gold-200" />
                ) : (
                  <Play
                    className="h-9 w-9 translate-x-0.5 text-gold-200"
                    fill="#F3E5AB"
                  />
                )}
              </motion.div>
              <p className="mt-4 font-display text-lg font-bold text-white">
                {playlist.find((p) => p.current)?.title}
              </p>
              <p className="mt-1 text-xs text-white/60">
                محاضرة 5 من 84 • {course.title}
              </p>
            </div>

            {/* Security watermark */}
            <Watermark />

            {/* Security badge */}
            <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
              <Shield className="h-3 w-3" />
              فيديو محمي
            </div>

            {/* Live indicator */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/15 px-2 py-1 text-[10px] font-bold text-gold-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
              HD • 1080p
            </div>

            {/* Controls */}
            <motion.div
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 8 }}
              className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-4"
            >
              {/* Progress bar */}
              <div className="mb-3 group/progress">
                <div className="relative h-1 cursor-pointer rounded-full bg-white/15 transition-all group-hover/progress:h-1.5">
                  <div
                    className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gold-200 bg-gold-400 shadow-gold-glow opacity-0 transition-opacity group-hover/progress:opacity-100"
                    style={{ right: `calc(${progress}% - 6px)` }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-black transition-transform hover:scale-110"
                  >
                    {playing ? (
                      <Pause className="h-4 w-4" fill="#000" />
                    ) : (
                      <Play className="h-4 w-4 translate-x-0.5" fill="#000" />
                    )}
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setMuted(!muted)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <span className="text-xs font-mono font-semibold text-white/80">
                    {fmt(currentTime)} / {fmt(totalSeconds)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <Subtitles className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <Cast className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video info */}
          <div className="glass-card relative overflow-hidden p-5 lg:p-6">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="chip mb-2">
                    محاضرة 5 • الفصل 2
                  </span>
                  <h1 className="font-display text-2xl font-bold text-white">
                    {playlist.find((p) => p.current)?.title}
                  </h1>
                  <p className="mt-2 text-sm text-white/60">
                    في هذه المحاضرة نغطي التفاعلات الكيميائية بالتفصيل مع
                    تمارين محلولة. المحتوى محمي ضد النسخ بعلامة مائية متحركة.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost-gold h-9 px-3 text-xs">
                    <Download className="h-3.5 w-3.5" />
                    ملخص المحاضرة
                  </button>
                  <button className="btn-gold h-9 px-4 text-xs">
                    ابدئي الاختبار
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6 flex gap-1 border-b border-white/5">
                {['الوصف', 'الموارد', 'الملاحظات', 'الأسئلة'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                      i === 0
                        ? 'text-gold-200'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {tab}
                    {i === 0 && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-l from-gold-300 to-gold-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm leading-relaxed text-white/70">
                <p>
                  محاضرة تفاعلية تشمل: شرح نظري مفصّل، 12 تمرين محلول،
                  مثالين واقعيين من الحياة اليومية، وملخص PDF للتحميل.
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    شهادة إتمام لكل فصل
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    وصول مدى الحياة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    دعم مباشر مع الأستاذة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card relative max-h-[800px] overflow-hidden"
          dir="rtl"
        >
          <div className="sticky top-0 z-10 border-b border-white/5 bg-obsidian-light p-5 backdrop-blur-xl">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-white">
              <span className="text-lg">📚</span>
              محاضرات الدورة
            </h3>
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
              <span>
                {playlist.filter((p) => p.completed).length} /{' '}
                {playlist.length} مكتمل
              </span>
              <span>42%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-l from-gold-300 to-gold-600 transition-all"
                style={{ width: '42%' }}
              />
            </div>
          </div>

          <div className="max-h-[640px] overflow-y-auto p-3">
            {playlist.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className={`group mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-right transition-all ${
                  p.current
                    ? 'border border-gold-400/40 bg-gold-400/10 shadow-gold-glow'
                    : 'hover:bg-white/[0.03]'
                }`}
                disabled={p.locked}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    p.current
                      ? 'bg-gold-400 text-black'
                      : p.completed
                      ? 'border border-emerald-400/30 bg-emerald-500/15 text-emerald-300'
                      : p.locked
                      ? 'border border-white/10 bg-white/[0.02] text-white/30'
                      : 'border border-white/10 bg-white/[0.02] text-white/40 group-hover:border-gold-400/30 group-hover:text-gold-200'
                  }`}
                >
                  {p.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : p.locked ? (
                    <Lock className="h-4 w-4" />
                  ) : p.current ? (
                    <Play className="h-4 w-4 fill-current" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-semibold ${
                      p.current
                        ? 'text-gold-100'
                        : p.locked
                        ? 'text-white/40'
                        : 'text-white'
                    }`}
                  >
                    {p.title}
                  </p>
                  <p className="text-[11px] text-white/40">
                    محاضرة {p.id} • {p.duration}
                  </p>
                </div>
                {p.current && (
                  <span className="text-[10px] font-bold text-gold-300">
                    الآن
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}