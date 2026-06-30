import { motion } from 'framer-motion';
import { Search, Bell, MessageSquare, Plus, Menu } from 'lucide-react';
import { instructor } from '../data/mockData';

export default function TopBar({ onMenuClick }) {
  return (
    <header
      className="sticky top-0 z-30 border-b border-white/5 bg-black/60 backdrop-blur-2xl"
      dir="rtl"
    >
      <div className="flex items-center gap-3 px-4 py-3 lg:gap-6 lg:px-8 lg:py-4">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="hidden min-w-0 sm:block">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-300/70">
            لوحة التحكم الرئيسية
          </p>
          <h2 className="truncate font-display text-base font-bold text-white lg:text-lg">
            مرحبًا بعودتكِ، <span className="gold-text">أ. رحمة</span>
          </h2>
        </div>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="ابحثي عن منهج، طالب، اختبار..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-4 pr-11 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-gold-400/40 focus:bg-white/[0.05] focus:shadow-gold-glow"
          />
          <kbd className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-white/50">
            ⌘K
          </kbd>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <IconBtn icon={MessageSquare} count={5} />
          <IconBtn icon={Bell} count={3} gold />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold hidden gap-2 px-4 py-2.5 text-xs sm:inline-flex"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            منهج جديد
          </motion.button>

          {/* Mobile avatar */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${instructor.avatarBg} text-sm font-black text-black shadow-gold-glow lg:hidden`}
          >
            {instructor.initials}
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ icon: Icon, count, gold = false }) {
  return (
    <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/70 transition-all hover:border-gold-400/40 hover:text-gold-200 hover:shadow-gold-glow">
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      {count > 0 && (
        <span
          className={`absolute -left-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-black shadow-md ${
            gold ? 'bg-gold-400' : 'bg-rose-500 text-white'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}