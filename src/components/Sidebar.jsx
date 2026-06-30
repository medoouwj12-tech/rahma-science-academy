import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LucideClipboardList as ClipboardList,
  LucideRadio as Radio,
  Award,
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  Bell,
} from 'lucide-react';
import { sidebarNav, instructor } from '../data/mockData';

const ICONS = {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Radio,
  Award,
  Shield,
  BarChart3,
  Settings,
};

export default function Sidebar({ active, onSelect }) {
  return (
    <aside
      className="fixed right-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-l border-white/5 bg-black/80 backdrop-blur-2xl lg:flex"
      dir="rtl"
    >
      {/* Brand */}
      <div className="relative flex items-center gap-3 px-6 pb-5 pt-6">
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow">
            <Sparkles className="h-5 w-5 text-black" strokeWidth={2.2} />
          </div>
          <div className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-black bg-emerald-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-300/70">
            منصة تعليمية
          </p>
          <h1 className="truncate font-display text-base font-bold gold-text">
            رحمة خالد
          </h1>
        </div>
      </div>

      <div className="mx-6 divider-gold" />

      {/* Instructor card */}
      <div className="px-4 py-5">
        <div className="glass-card gold-border relative overflow-hidden p-4">
          <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold-400/10 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${instructor.avatarBg} text-base font-black text-black shadow-lg`}
            >
              {instructor.initials}
              <div className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-obsidian-light bg-emerald-400">
                <span className="text-[8px]">✓</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                {instructor.name}
              </p>
              <p className="truncate text-[11px] text-white/50">
                {instructor.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          القائمة الرئيسية
        </p>
        {sidebarNav.map((item, i) => {
          const Icon = ICONS[item.icon] || LayoutDashboard;
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              onClick={() => onSelect(item.id)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-l from-gold-400/15 to-transparent text-gold-100 shadow-gold-glow'
                  : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute right-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-l-full bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600"
                />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isActive
                    ? 'border-gold-400/40 bg-gold-400/10 text-gold-200'
                    : 'border-white/5 bg-white/[0.02] text-white/60 group-hover:border-gold-400/30 group-hover:text-gold-200'
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? 'bg-gold-400 text-black'
                      : item.badge === '!'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="mx-4 divider-gold" />

      {/* Footer actions */}
      <div className="space-y-1 px-3 py-4">
        <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition-all hover:bg-white/[0.03] hover:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02]">
            <Bell className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <span>الإشعارات</span>
          <span className="mr-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-400 px-1.5 text-[10px] font-bold text-black">
            3
          </span>
        </button>
        <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition-all hover:bg-rose-500/10 hover:text-rose-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] group-hover:border-rose-400/30">
            <LogOut className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}