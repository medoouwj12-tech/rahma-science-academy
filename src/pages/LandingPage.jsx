import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Star,
  Users,
  Award,
  Zap,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Clock,
  Crown,
  Trophy,
  Shield,
  GraduationCap,
  Quote,
} from 'lucide-react';
import CountUp from '../components/CountUp';
import { courses } from '../data/mockData';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Why Us */}
      <WhyUsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ====================== NAVBAR ====================== */
function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
            <Sparkles className="h-5 w-5 text-black" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-gold-300/70">
              منصة تعليمية
            </p>
            <h1 className="font-display text-base font-bold gold-text">
              رحمة خالد
            </h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-white/70 lg:flex">
          <a href="#home" className="transition-colors hover:text-gold-200">
            الرئيسية
          </a>
          <a href="#courses" className="transition-colors hover:text-gold-200">
            الدورات
          </a>
          <a href="#why" className="transition-colors hover:text-gold-200">
            لماذا نحن
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-gold-200"
          >
            آراء الطلاب
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="btn-ghost-gold px-4 py-2 text-xs"
          >
            تسجيل الدخول
          </Link>
          <Link to="/auth?signup=1" className="btn-gold px-4 py-2 text-xs">
            ابدئي مجاناً
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ====================== HERO ====================== */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-12 lg:pt-20"
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-gold-400/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-60 h-[400px] w-[400px] rounded-full bg-gold-400/8 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-right"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold text-gold-100"
          >
            <Crown className="h-3.5 w-3.5" />
            المنصة التعليمية الأولى في العالم العربي
          </motion.div>

          <h1 className="font-display text-4xl font-black leading-[1.15] text-white sm:text-5xl lg:text-[3.8rem]">
            <span className="gold-shine-text">منصة الأستاذة</span>
            <br />
            <span className="gold-shine-text">رحمة خالد</span>
            <br />
            <span className="text-white">التعليمية</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg lg:max-w-xl lg:text-xl">
            تجربة تعليمية <span className="font-bold text-gold-200">فاخرة</span>{' '}
            تجمع بين أحدث أساليب الشرح، اختبارات تفاعلية، ومتابعة شخصية
            لطلاب الثانوية والجامعة. انضمي لـ{' '}
            <span className="font-bold text-gold-200">
              <CountUp value={10000} />+
            </span>{' '}
            طالب يحققون أعلى الدرجات.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              to="/auth?signup=1"
              className="btn-gold gap-3 px-7 py-3.5 text-sm"
            >
              ابدئي رحلتكِ التعليمية
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <a
              href="#courses"
              className="btn-ghost-gold gap-3 px-7 py-3.5 text-sm"
            >
              <PlayCircle className="h-4 w-4" />
              استكشفي الدورات
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div className="flex -space-x-2 space-x-reverse">
              {['رخ', 'أم', 'يح', 'سك', 'عا'].map((i, idx) => (
                <div
                  key={idx}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-gold-300 to-gold-600 text-xs font-bold text-black"
                >
                  {i}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                  />
                ))}
                <span className="ms-2 text-xs font-bold text-white">
                  4.95/5
                </span>
              </div>
              <p className="text-[11px] text-white/50">
                من أكثر من 8,200 تقييم
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== DASHBOARD MOCKUP ====================== */
function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-xl animate-float">
      {/* Glow behind */}
      <div className="pointer-events-none absolute inset-0 -m-10 rounded-3xl bg-gold-400/15 blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-card gold-border relative overflow-hidden p-4 shadow-gold-glow-lg"
      >
        {/* Window chrome */}
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="text-[10px] font-mono text-white/40">
            rahma-khaled.com/student
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'دوراتي', value: '12', icon: BookOpen },
            { label: 'محاضرات', value: '184', icon: PlayCircle },
            { label: 'شهادات', value: '4', icon: Award },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-3"
            >
              <s.icon className="h-3.5 w-3.5 text-gold-300" strokeWidth={1.8} />
              <p className="mt-2 font-display text-lg font-bold text-white">
                {s.value}
              </p>
              <p className="text-[10px] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mini course card */}
        <div className="mt-3 overflow-hidden rounded-xl border border-white/5">
          <div className="relative h-24 bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-800">
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-base backdrop-blur-md">
              ⚗️
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
              <span className="text-[10px] font-semibold text-white">
                الكيمياء — ثانوي
              </span>
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold text-gold-200 backdrop-blur-md">
                الفصل 5
              </span>
            </div>
          </div>
          <div className="bg-black/40 p-3">
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="text-white/60">التقدم</span>
              <span className="font-bold text-gold-200">78%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-l from-gold-300 to-gold-600" />
            </div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="mt-3 rounded-xl border border-white/5 bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] text-white/50">تقدمي الأسبوعي</span>
            <span className="text-[10px] font-bold text-emerald-400">
              +12%
            </span>
          </div>
          <svg viewBox="0 0 200 40" className="h-10 w-full">
            <defs>
              <linearGradient id="mock-line" x1="0" x2="1">
                <stop offset="0%" stopColor="#B8941F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#F3E5AB" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 L20,25 L40,28 L60,18 L80,22 L100,12 L120,16 L140,8 L160,12 L180,5 L200,8"
              fill="none"
              stroke="url(#mock-line)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px rgba(212,175,55,0.5))"
            />
          </svg>
        </div>
      </motion.div>

      {/* Floating tag */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 top-20 hidden rounded-2xl border border-gold-400/30 bg-black/80 p-3 shadow-gold-glow backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] text-white/50">اختبار منتهي</p>
            <p className="text-sm font-bold text-white">98 / 100</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 bottom-32 hidden rounded-2xl border border-gold-400/30 bg-black/80 p-3 shadow-gold-glow backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/20">
            <Trophy className="h-4 w-4 text-gold-300" />
          </div>
          <div>
            <p className="text-[10px] text-white/50">الترتيب</p>
            <p className="text-sm font-bold text-white">#3 على المستوى</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ====================== STATS ====================== */
function StatsSection() {
  const stats = [
    { label: 'طالب نشط', value: 10000, icon: Users, suffix: '+' },
    { label: 'دورة احترافية', value: 50, icon: BookOpen, suffix: '+' },
    { label: 'اختبار تفاعلي', value: 200, icon: ClipboardList, suffix: '+' },
    { label: 'معدل النجاح', value: 98, icon: Trophy, suffix: '%' },
  ];

  return (
    <section className="relative mt-24 px-4 lg:mt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card gold-border relative overflow-hidden p-6 lg:p-10"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gold-400/10 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative text-center"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/15 to-transparent transition-all group-hover:shadow-gold-glow">
                  <s.icon
                    className="h-6 w-6 text-gold-200"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="font-display text-3xl font-black text-white lg:text-4xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-semibold text-white/60">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== FEATURED COURSES ====================== */
function FeaturedCourses() {
  const featured = courses.slice(0, 4);

  return (
    <section id="courses" className="relative mt-24 px-4 lg:mt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4 text-center lg:text-right"
        >
          <div>
            <span className="chip mb-3">
              <Sparkles className="h-3 w-3" /> دورات مميزة
            </span>
            <h2 className="font-display text-3xl font-black text-white lg:text-4xl">
              دورات <span className="gold-text">احترافية</span> مصممة
              <br className="hidden lg:block" /> لطلاب{' '}
              <span className="gold-text">الطموحين</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60">
            محتوى حصري، شرح مبسّط، اختبارات تفاعلية، ومتابعة شخصية لكل طالب.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass-card glass-card-hover group relative overflow-hidden"
    >
      <div
        className={`relative h-40 overflow-hidden bg-gradient-to-br ${course.cover}`}
      >
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/30 text-3xl backdrop-blur-md transition-transform group-hover:scale-110">
          {course.emoji}
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
          {course.rating}
        </div>
        <div className="absolute bottom-3 right-4 left-4">
          <h3 className="line-clamp-1 font-display text-base font-bold text-white drop-shadow-lg">
            {course.title}
          </h3>
          <p className="text-[10px] text-white/80">{course.subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-[11px] text-white/55">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> {course.chapters} فصل
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {course.lectures} محاضرة
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />{' '}
            <CountUp value={course.enrolled} />
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-[10px] text-white/40">السعر</p>
            <p className="font-display text-lg font-bold gold-text">
              {course.price} ج.م
            </p>
          </div>
          <Link
            to={`/checkout/${course.id}`}
            className="btn-gold px-4 py-2 text-xs"
          >
            اشتركي الآن
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ====================== WHY US ====================== */
function WhyUsSection() {
  const features = [
    {
      icon: Crown,
      title: 'محتوى حصري فاخر',
      desc: 'شرح مبسّط وعميق، مع أمثلة حقيقية وتمارين محلولة لكل درس.',
    },
    {
      icon: Zap,
      title: 'اختبارات تفاعلية فورية',
      desc: 'بنك أسئلة ضخم مع تقييم لحظي وتغذية راجعة ذكية.',
    },
    {
      icon: Shield,
      title: 'حماية كاملة للمحتوى',
      desc: 'علامة مائية متحركة وفيديو محمي ضد أي محاولة تسجيل.',
    },
    {
      icon: Trophy,
      title: 'متابعة شخصية',
      desc: 'تقارير أداء مفصلة للأهل والطلاب مع توصيات ذكية.',
    },
    {
      icon: GraduationCap,
      title: 'شهادات معتمدة',
      desc: 'شهادات إتمام قابلة للتحقق تضاف لسيرتك الذاتية.',
    },
    {
      icon: Radio,
      title: 'بث مباشر أسبوعي',
      desc: 'جلسات مراجعة مباشرة مع الأستاذة للإجابة على كل أسئلتك.',
    },
  ];

  return (
    <section id="why" className="relative mt-24 px-4 lg:mt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="chip mb-3">
            <Sparkles className="h-3 w-3" /> لماذا نحن
          </span>
          <h2 className="font-display text-3xl font-black text-white lg:text-4xl">
            تجربة تعليمية <span className="gold-text">متكاملة</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
            كل ما يحتاجه الطالب لتحقيق أعلى الدرجات، في منصة واحدة
            مصممة بفخامة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover relative overflow-hidden p-6"
            >
              <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gold-400/8 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/15 to-transparent">
                <f.icon
                  className="h-5 w-5 text-gold-200"
                  strokeWidth={1.6}
                />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== TESTIMONIALS ====================== */
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'سارة عبد الرحمن',
      grade: 'الثالث الثانوي',
      text: 'والله المنصة دي غيرت مستواي تماماً. شرح أ. رحمة واضح جداً، والاختبارات بتدربك على كل حاجة.',
      score: '98%',
    },
    {
      name: 'أحمد محمود',
      grade: 'الثاني الثانوي',
      text: 'جربت منصات كتير قبل كده، مفيش زيها. النظام فاخر والمحتوى منظم بشكل احترافي.',
      score: '95%',
    },
    {
      name: 'منى الحسيني',
      grade: 'الثانوية العامة',
      text: 'من ساعة ما اشتركت، درجاتي في الكيمياء والفيزياء اتحسنت بشكل ملحوظ. شكراً أ. رحمة!',
      score: '99%',
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative mt-24 px-4 lg:mt-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="chip mb-3">
            <Star className="h-3 w-3 fill-gold-400 text-gold-400" /> آراء الطلاب
          </span>
          <h2 className="font-display text-3xl font-black text-white lg:text-4xl">
            قصص <span className="gold-text">نجاح حقيقية</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card gold-border relative overflow-hidden p-6"
            >
              <Quote className="absolute left-4 top-4 h-10 w-10 text-gold-400/15" />
              <div className="relative">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold-400 text-gold-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  "{t.text}"
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-black">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-[11px] text-white/50">{t.grade}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40">آخر اختبار</p>
                    <p className="font-display text-lg font-bold gold-text">
                      {t.score}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== CTA ====================== */
function CTASection() {
  return (
    <section className="relative mt-24 px-4 lg:mt-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card gold-border relative overflow-hidden p-8 text-center lg:p-14"
        >
          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

          <div className="relative">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-gold-300" />
            <h2 className="font-display text-3xl font-black leading-tight text-white lg:text-5xl">
              جاهزة للتفوق
              <br />
              <span className="gold-shine-text">هذا الترم؟</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
              انضمي لآلاف الطلاب اللي بيحققوا أعلى الدرجات مع أ. رحمة خالد.
              ابدئي رحلتكِ التعليمية اليوم.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/auth?signup=1" className="btn-gold px-8 py-4 text-sm">
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                ابدئي مجاناً الآن
              </Link>
              <a
                href="#courses"
                className="btn-ghost-gold px-8 py-4 text-sm"
              >
                تصفحي الدورات
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== FOOTER ====================== */
function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-black/60 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
                <Sparkles className="h-5 w-5 text-black" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-300/70">
                  منصة تعليمية
                </p>
                <h3 className="font-display text-base font-bold gold-text">
                  الأستاذة رحمة خالد
                </h3>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/55">
              منصة تعليمية فاخرة لطلاب الثانوية والجامعة في العالم العربي.
              محتوى احترافي، اختبارات تفاعلية، ومتابعة شخصية.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/50">
              روابط سريعة
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#home" className="hover:text-gold-200">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-gold-200">
                  الدورات
                </a>
              </li>
              <li>
                <Link to="/auth" className="hover:text-gold-200">
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link to="/instructor" className="hover:text-gold-200">
                  لوحة الأستاذة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/50">
              التواصل
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>info@rahma-khaled.com</li>
              <li>+20 100 ••• 8888</li>
              <li>القاهرة، مصر</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-xs text-white/40 sm:flex-row sm:text-right">
          <p>
            © 2026{' '}
            <span className="gold-text font-bold">
              منصة الأستاذة رحمة خالد التعليمية
            </span>
            . جميع الحقوق محفوظة.
          </p>
          <p>صُمم بكل شغف في القاهرة 🇪🇬</p>
        </div>
      </div>
    </footer>
  );
}