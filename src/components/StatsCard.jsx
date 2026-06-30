import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './Sparkline';
import CountUp from './CountUp';

/**
 * StatsCard — premium analytics tile with sparkline, animated counter,
 * and dynamic gold glow on hover.
 */
const iconMap = {
  Users: 'Users',
  Crown: 'Crown',
  TrendingUp: 'TrendingUp',
  Wallet: 'Wallet',
};

import {
  Users,
  Crown,
  TrendingUp as TrendingUpIcon,
  Wallet,
} from 'lucide-react';

const ICONS = { Users, Crown, TrendingUp: TrendingUpIcon, Wallet };

export default function StatsCard({
  label,
  labelEn,
  value,
  prefix = '',
  suffix = '',
  delta,
  trend = 'up',
  spark,
  icon,
  delay = 0,
}) {
  const Icon = ICONS[icon] || Users;
  const positive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="glass-card glass-card-hover group relative overflow-hidden p-5 lg:p-6"
    >
      {/* Top-right gold glow blob */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl transition-opacity duration-700 group-hover:bg-gold-400/25" />

      {/* Subtle gold corner accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-12 bg-gradient-to-r from-gold-400/60 to-transparent" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            {labelEn}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-white/80">
            {label}
          </p>
        </div>
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 to-transparent">
          <Icon className="h-5 w-5 text-gold-200" strokeWidth={1.6} />
          <div className="absolute inset-0 rounded-xl bg-gold-400/0 transition-colors duration-500 group-hover:bg-gold-400/5" />
        </div>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1 font-display text-3xl font-bold leading-none text-white lg:text-[2rem]">
            <CountUp
              value={value}
              prefix={prefix}
              suffix={suffix}
              className="tabular-nums"
            />
          </div>
          <div
            className={`mt-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
              positive
                ? 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300'
                : 'border-rose-400/20 bg-rose-400/5 text-rose-300'
            }`}
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
            ) : (
              <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
            )}
            {delta}
            <span className="text-white/40">آخر 30 يوم</span>
          </div>
        </div>
        <Sparkline data={spark} width={100} height={44} />
      </div>

      {/* Bottom thin gold line that fills on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}