import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Crown,
  Sparkles,
  ArrowLeft,
  Calendar,
  Trophy,
  Zap,
  Users,
  Search,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Bell,
  Lock,
  User as UserIcon,
  Settings,
  Star
} from 'lucide-react';
import { statsCards, recentStudents } from '../data/mockData';
import { statsApi } from '../lib/api';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import CourseManager from '../components/CourseManager';
import QuizCreator from '../components/QuizCreator';
import SecurityMonitor from '../components/SecurityMonitor';
import CountUp from '../components/CountUp';
import LiveSessions from './LiveSessions';
import Certificates from './Certificates';
import { useToast } from '../components/Toast';

/**
 * InstructorDashboard — the main page.
 * Supports activeTab prop to switch between dashboard sections.
 */
export default function InstructorDashboard({ activeTab = 'overview', setActiveTab }) {
  const { success, error } = useToast();
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Welcome banner */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card gold-border relative overflow-hidden p-6 lg:p-8"
            >
              {/* Decorative gold arcs */}
              <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-bold text-gold-100">
                      <Crown className="h-3 w-3" />
                      لوحة تحكم الأستاذة
                    </span>
                    <span className="chip">
                      <Calendar className="h-3 w-3" />
                      <CountUp value={30} /> يونيو 2026
                    </span>
                  </div>

                  <h1 className="mt-4 font-display text-3xl font-black leading-tight text-white lg:text-[2.5rem]">
                    أهلاً بكِ،{' '}
                    <span className="gold-shine-text">أ. رحمة خالد</span>
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 lg:text-base">
                    لديكِ{' '}
                    <span className="font-bold text-gold-200">
                      <CountUp value={248} /> طالب نشط
                    </span>{' '}
                    يدرسون الآن، و{' '}
                    <span className="font-bold text-gold-200">
                      <CountUp value={12} /> محاضرة جديدة
                    </span>{' '}
                    تنتظر النشر اليوم.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('courses')}
                      className="btn-gold gap-2"
                    >
                      <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                      إنشاء محتوى جديد
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('analytics')}
                      className="btn-ghost-gold gap-2"
                    >
                      عرض التحليلات الكاملة
                      <ArrowLeft className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Side achievements */}
                <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:grid-cols-1">
                  <Achievement
                    icon={Trophy}
                    label="أفضل instructor"
                    value="هذا الشهر"
                    accent="from-amber-300/15 to-amber-700/5 border-amber-400/30"
                  />
                  <Achievement
                    icon={Zap}
                    label="معدل رضا الطلاب"
                    value={
                      <span className="font-display text-2xl font-black text-gold-200">
                        <CountUp value={98} suffix="%" />
                      </span>
                    }
                    accent="from-gold-300/15 to-gold-700/5 border-gold-400/30"
                  />
                </div>
              </div>
            </motion.section>

            {/* Stats grid */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statsCards.map((s, i) => (
                <StatsCard key={s.id} {...s} delay={0.1 + i * 0.07} />
              ))}
            </section>

            {/* Revenue chart */}
            <section>
              <RevenueChart />
            </section>
          </>
        );
      case 'courses':
        return <CourseManager />;
      case 'quizzes':
        return <QuizCreator />;
      case 'security':
        return <SecurityMonitor />;
      case 'students':
        return <StudentsDirectory />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'live':
        return <LiveSessions />;
      case 'certificates':
        return <Certificates />;
      default:
        return <div className="text-center py-12 text-white/50">التبويب غير متوفر حالياً</div>;
    }
  };

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {renderContent()}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-white/5 pt-6 text-center text-xs text-white/40"
      >
        <p>
          © 2026{' '}
          <span className="gold-text font-bold">منصة الأستاذة رحمة خالد التعليمية</span>{' '}
          • جميع الحقوق محفوظة
        </p>
        <p className="mt-1">
          صُمم بكل {'\u2728'} لطلاب العلوم في المرحلة الابتدائية والإعدادية
          والثانوي التجريبي
        </p>
      </motion.footer>
    </div>
  );
}

function Achievement({ icon: Icon, label, value, accent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-br ${accent} p-4 backdrop-blur-xl`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/40">
        <Icon className="h-5 w-5 text-gold-200" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/50">
          {label}
        </p>
        <div className="font-display text-base font-bold text-white">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   Sub-Components for new views
   ========================================================================= */

function StudentsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const filteredStudents = recentStudents.filter(s => {
    const matchesSearch = s.name.includes(searchTerm) || s.course.includes(searchTerm);
    const matchesStage = stageFilter === 'all' || 
      (stageFilter === 'primary' && s.course.includes('ابتدائي')) ||
      (stageFilter === 'prep' && s.course.includes('إعدادي')) ||
      (stageFilter === 'sec' && (s.course.includes('ثانوي') || s.course.toLowerCase().includes('science')));
    return matchesSearch && matchesStage;
  });

  return (
    <div className="glass-card gold-border p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-gold-300" />
            دليل الطلاب المسجلين
          </h2>
          <p className="text-xs text-white/50 mt-1">متابعة تقدم الطلاب ومستوياتهم الدراسية وتواصل مباشر معهم</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="ابحث باسم الطالب أو المنهج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pl-3 pr-10 text-sm text-white outline-none focus:border-gold-400/40"
          />
        </div>
        
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1 text-xs font-semibold">
          {[
            { id: 'all', label: 'كل المراحل' },
            { id: 'primary', label: 'الابتدائي' },
            { id: 'prep', label: 'الإعدادي' },
            { id: 'sec', label: 'الثانوي / التجريبي' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStageFilter(tab.id)}
              className={`rounded-md px-3 py-1.5 transition-all ${
                stageFilter === tab.id
                  ? 'bg-gold-400/15 text-gold-100 shadow-gold-glow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-white/50 font-bold uppercase tracking-wider">
              <th className="pb-3 text-right">اسم الطالب</th>
              <th className="pb-3 text-right">المنهج الدراسي</th>
              <th className="pb-3 text-center">نسبة التقدم</th>
              <th className="pb-3 text-center">متوسط الاختبارات</th>
              <th className="pb-3 text-center">الحالة</th>
              <th className="pb-3 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-white/80">
            {filteredStudents.map((student, i) => (
              <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                <td className="py-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-200 font-bold text-sm">
                    {student.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{student.name}</p>
                    <p className="text-[11px] text-white/40">طالب مسجل</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-medium">{student.course}</span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col items-center justify-center min-w-[120px]">
                    <div className="flex justify-between w-full text-[10px] text-white/50 mb-1">
                      <span>التقدم</span>
                      <span>{student.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-l from-gold-300 to-gold-600 h-full rounded-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-flex items-center justify-center rounded-lg px-2 py-1 text-xs font-bold ${
                    student.score >= 90 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' :
                    student.score >= 80 ? 'bg-gold-500/15 text-gold-200 border border-gold-400/20' :
                    'bg-rose-500/15 text-rose-300 border border-rose-500/20'
                  }`}>
                    {student.score}%
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    student.status === 'online' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-white/5 text-white/40 border border-white/5'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${student.status === 'online' ? 'bg-emerald-400' : 'bg-white/30'}`} />
                    {student.status === 'online' ? 'متصل' : 'غائب'}
                  </span>
                </td>
                <td className="py-4 text-left">
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost-gold h-8 text-xs gap-1.5 py-1 px-3.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    مراسلة واتساب
                  </a>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-white/40">
                  لم يتم العثور على طلاب تطابق معايير البحث
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const paymentLogs = [
    { id: 'PAY-1049', student: 'أحمد محمود السيد', stage: 'إعدادي', amount: 240, method: 'فودافون كاش', date: 'اليوم، 17:15' },
    { id: 'PAY-1048', student: 'منى الحسيني', stage: 'إعدادي', amount: 240, method: 'إنستاباي', date: 'اليوم، 16:42' },
    { id: 'PAY-1047', student: 'يوسف إبراهيم حلمي', stage: 'ابتدائي', amount: 200, method: 'فودافون كاش', date: 'اليوم، 15:30' },
    { id: 'PAY-1046', student: 'كريم وليد فؤاد', stage: 'ثانوي', amount: 300, method: 'فودافون كاش', date: 'أمس، 22:10' },
    { id: 'PAY-1045', student: 'فاطمة الزهراء', stage: 'إعدادي', amount: 240, method: 'إنستاباي', date: 'أمس، 19:45' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card gold-border p-6">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-gold-300" />
          التحليلات المالية وإحصائيات الطلاب
        </h2>
        <p className="text-xs text-white/50 mb-6">متابعة دقيقة للأداء المالي لمناهجك ونسبة الاشتراكات النشطة ونمو أعداد الطلاب</p>

        {/* Small stats cards inside analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <p className="text-[11px] text-white/45 uppercase tracking-wider">متوسط الدخل لكل طالب</p>
            <p className="text-2xl font-black text-white mt-1">242 ج.م</p>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <span>+4.2%</span> مقارنة بالشهر السابق
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <p className="text-[11px] text-white/45 uppercase tracking-wider">الاشتراكات الجديدة هذا الأسبوع</p>
            <p className="text-2xl font-black text-white mt-1">+48 اشتراك</p>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <span>+12%</span> نمو مستمر
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <p className="text-[11px] text-white/45 uppercase tracking-wider">المنهج الأكثر طلباً</p>
            <p className="text-lg font-bold text-gold-300 mt-1">العلوم — إعدادي</p>
            <p className="text-[10px] text-white/40 mt-1">يمثل 48% من إجمالي الدخل</p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="border-t border-white/5 pt-6">
          <h3 className="text-sm font-bold text-white/80 mb-4">منحنى نمو الأرباح والطلاب</h3>
          <RevenueChart />
        </div>
      </div>

      {/* Payment logs */}
      <div className="glass-card gold-border p-6">
        <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-400" />
          سجل المعاملات والعمليات الأخيرة (بوابات Vodafone Cash & Instapay)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/50 font-bold">
                <th className="pb-3 text-right">رقم العملية</th>
                <th className="pb-3 text-right">اسم الطالب</th>
                <th className="pb-3 text-right">المرحلة</th>
                <th className="pb-3 text-center">وسيلة الدفع</th>
                <th className="pb-3 text-center">المبلغ المدفوع</th>
                <th className="pb-3 text-center">التاريخ والوقت</th>
                <th className="pb-3 text-left">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-white/80">
              {paymentLogs.map((log, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 text-xs font-mono text-white/60">{log.id}</td>
                  <td className="py-4 font-bold text-white">{log.student}</td>
                  <td className="py-4">{log.stage}</td>
                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center justify-center rounded-lg px-2.5 py-0.5 text-xs font-semibold ${
                      log.method === 'فودافون كاش' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-4 text-center font-bold text-white">{log.amount} ج.م</td>
                  <td className="py-4 text-center text-xs text-white/50">{log.date}</td>
                  <td className="py-4 text-left">
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      ناجحة
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'الأستاذة رحمة خالد',
    email: 'rahma.khaled@science.com',
    phone: '+20 100 123 4567',
    subject: 'مدرِّسة العلوم والساينس',
    bio: 'أستاذة مادة العلوم للمرحلة الابتدائية والإعدادية والساينس للمدارس اللغات والتجريبية.'
  });

  const [notifs, setNotifs] = useState({
    smsAlert: true,
    emailReport: false,
    telegramAlert: true,
    weeklyDigest: true
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    success('تم حفظ بيانات الملف الشخصي بنجاح');
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      error('كلمة المرور الجديدة غير متطابقة');
      return;
    }
    success('تم تعديل كلمة المرور بنجاح');
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="glass-card gold-border p-6 space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-gold-300" />
          إعدادات المنصة والملف الشخصي
        </h2>
        <p className="text-xs text-white/50 mt-1">تعديل معلوماتك الشخصية، إدارة كلمات المرور وتخصيص إشعارات النظام</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Settings Sub-Sidebar */}
        <div className="flex flex-row md:flex-col gap-2 border-b md:border-b-0 md:border-l border-white/5 pb-4 md:pb-0 md:pl-4 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'profile', label: 'الملف الشخصي', icon: UserIcon },
            { id: 'notifs', label: 'الإشعارات والتنبيهات', icon: Bell },
            { id: 'security', label: 'الأمان والحماية', icon: Lock }
          ].map(subTab => {
            const Icon = subTab.icon;
            return (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-semibold transition-all ${
                  activeSubTab === subTab.id
                    ? 'bg-gold-400/10 text-gold-200 border-r-2 border-gold-400'
                    : 'text-white/60 hover:bg-white/[0.02] hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{subTab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Form */}
        <div className="min-w-0">
          {activeSubTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/60">الاسم الكامل</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/60">التخصص الدراسي</label>
                  <input
                    type="text"
                    value={profile.subject}
                    onChange={(e) => setProfile({ ...profile, subject: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/60">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 text-left"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/60">رقم الهاتف (واتساب)</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 text-left"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/60">نبذة تعريفية (Bio)</label>
                <textarea
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 resize-none"
                />
              </div>
              <button type="submit" className="btn-gold px-6 py-2.5 text-xs">حفظ التغييرات</button>
            </form>
          )}

          {activeSubTab === 'notifs' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white/80 mb-2">اختر التنبيهات التي ترغبين في تلقيها:</h3>
              <div className="space-y-4">
                {[
                  { id: 'smsAlert', label: 'تنبيهات الرسائل القصيرة (SMS)', desc: 'عند تسجيل طالب جديد أو محاولات تسجيل دخول غير مصرح بها.' },
                  { id: 'telegramAlert', label: 'إشعارات تطبيق التليجرام (Telegram)', desc: 'تحديثات مباشرة ومتابعة دورية لحالة النظام والطلاب.' },
                  { id: 'emailReport', label: 'تقرير بريدي دوري (Email Report)', desc: 'إرسال تقرير إحصائي مفصل أسبوعياً عن إيرادات المنصة وتقدم الطلاب.' },
                  { id: 'weeklyDigest', label: 'ملخص أسبوعي', desc: 'إحصائيات حول تفاعل الطلاب في المحاضرات المباشرة والاختبارات.' }
                ].map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-white/45">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={notifs[item.id]}
                        onChange={(e) => setNotifs({ ...notifs, [item.id]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white/80 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'security' && (
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/60">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 text-left"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/60">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 text-left"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/60">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-4 text-sm text-white outline-none focus:border-gold-400/40 text-left"
                />
              </div>
              <button type="submit" className="btn-gold px-6 py-2.5 text-xs">تحديث كلمة المرور</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}