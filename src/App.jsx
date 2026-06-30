import { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Award,
  Radio,
  User,
  Sparkles,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import InstructorDashboard from './pages/InstructorDashboard';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import CourseViewer from './pages/CourseViewer';
import QuizInterface from './pages/QuizInterface';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import LiveSessions from './pages/LiveSessions';
import Certificates from './pages/Certificates';
import ProfilePage from './pages/ProfilePage';

const studentNav = [
  { id: '/student', label: 'دوراتي', icon: BookOpen },
  { id: '/student/quizzes', label: 'الاختبارات', icon: ClipboardList },
  { id: '/student/live', label: 'البث المباشر', icon: Radio },
  { id: '/student/certificates', label: 'الشهادات', icon: Award },
  { id: '/student/profile', label: 'الملف الشخصي', icon: User },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        <Route
          path="/instructor/*"
          element={<InstructorShell />}
        />
        <Route path="/student/*" element={<StudentShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

/* ============== Instructor shell (existing sidebar layout) ============== */
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

function InstructorShell() {
  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-30" />
      <Sidebar />
      <div className="lg:mr-[280px]">
        <TopBar />
        <main className="px-4 py-5 lg:px-8 lg:py-7">
          <InstructorDashboard />
        </main>
      </div>
    </div>
  );
}

/* ============== Student shell (different sidebar) ============== */
function StudentShell() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-20" />

      {/* Sidebar (right side, RTL) */}
      <aside className="fixed right-0 top-0 z-40 hidden h-screen w-[260px] flex-col border-l border-white/5 bg-black/85 backdrop-blur-2xl lg:flex">
        <Link
          to="/"
          className="flex items-center gap-3 px-6 pb-5 pt-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold-glow">
            <Sparkles className="h-5 w-5 text-black" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-300/70">
              منصة تعليمية
            </p>
            <h1 className="font-display text-base font-bold gold-text">
              رحمة خالد
            </h1>
          </div>
        </Link>
        <div className="mx-6 divider-gold" />

        <div className="px-4 py-5">
          <div className="glass-card gold-border flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-black text-black">
              ف
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                فاطمة الزهراء
              </p>
              <p className="truncate text-[11px] text-white/50">طالبة متميزة</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {studentNav.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.id ||
              (item.id === '/student' &&
                location.pathname === '/student/');
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-l from-gold-400/15 to-transparent text-gold-100 shadow-gold-glow'
                    : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                    active
                      ? 'border-gold-400/40 bg-gold-400/10 text-gold-200'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <span className="flex-1 text-right">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <Link
            to="/instructor"
            className="flex items-center gap-3 rounded-xl border border-gold-400/20 bg-gold-400/5 px-3 py-2.5 text-sm font-semibold text-gold-200 transition-all hover:bg-gold-400/10"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>لوحة الأستاذة</span>
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-black/80 px-4 py-3 backdrop-blur-2xl lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600">
            <Sparkles className="h-4 w-4 text-black" strokeWidth={2.2} />
          </div>
          <span className="font-display text-sm font-bold gold-text">
            رحمة خالد
          </span>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[280px] border-l border-white/10 bg-obsidian p-3"
            >
              <div className="mb-3 flex items-center justify-between border-b border-white/5 p-3">
                <span className="font-display text-sm font-bold gold-text">
                  القائمة
                </span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5 text-white/60" />
                </button>
              </div>
              {studentNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/70 hover:bg-white/5"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:mr-[260px]">
        <Routes>
          <Route index element={<StudentDashboard />} />
          <Route path="course/:courseId" element={<CourseViewer />} />
          <Route path="quiz/:quizId" element={<QuizInterface />} />
          <Route path="quizzes" element={<StudentDashboard />} />
          <Route path="live" element={<LiveSessions />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}