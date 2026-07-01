import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import { revenueData } from '../data/mockData';
import CountUp from './CountUp';

/**
 * RevenueChart — custom-built premium chart with:
 *  - Animated gold gradient bars (revenue)
 *  - Smooth path line (students)
 *  - Interactive hover tooltip
 *  - Period switcher
 */
export default function RevenueChart() {
  const [period, setPeriod] = useState('6m');
  const [hoverIdx, setHoverIdx] = useState(null);

  const max = Math.max(...revenueData.map((d) => d.revenue));
  const maxStudents = Math.max(...revenueData.map((d) => d.students));

  const W = 800;
  const H = 280;
  const PAD_L = 60;
  const PAD_R = 30;
  const PAD_T = 30;
  const PAD_B = 50;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const barW = (innerW / revenueData.length) * 0.55;
  const slot = innerW / revenueData.length;
  const linePoints = revenueData.map((d, i) => {
    const x = PAD_L + slot * i + slot / 2;
    const y = PAD_T + innerH - (d.students / maxStudents) * innerH;
    return [x, y];
  });

  const linePath = linePoints
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const areaPath =
    `M${linePoints[0][0]},${PAD_T + innerH} ` +
    linePoints.map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`).join(' ') +
    ` L${linePoints[linePoints.length - 1][0]},${PAD_T + innerH} Z`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="glass-card gold-border relative overflow-hidden p-5 lg:p-7"
      dir="rtl"
    >
      {/* Decorative bg glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-gold-400/5 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-white">
              الإيرادات والاشتراكات
            </h3>
            <span className="chip">
              <TrendingUp className="h-3 w-3" />
              +18.9%
            </span>
          </div>
          <p className="mt-1 text-xs text-white/50">
            نظرة على أداء المنصة خلال آخر 6 أشهر
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Period switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 text-xs font-semibold">
            {['1m', '3m', '6m', '1y'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  period === p
                    ? 'bg-gradient-to-l from-gold-400 to-gold-600 text-black shadow-gold-glow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {p === '1m' && 'شهر'}
                {p === '3m' && '3 أشهر'}
                {p === '6m' && '6 أشهر'}
                {p === '1y' && 'سنة'}
              </button>
            ))}
          </div>
          <button className="btn-ghost-gold h-9 px-3 text-xs">
            <Filter className="h-3.5 w-3.5" />
            تصفية
          </button>
          <button className="btn-ghost-gold h-9 px-3 text-xs">
            <Download className="h-3.5 w-3.5" />
            تصدير
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="relative mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPI label="إجمالي الإيرادات" value={1122650} prefix="ج.م " />
        <KPI label="متوسط شهري" value={187108} prefix="ج.م " />
        <KPI label="إجمالي الطلاب الجدد" value={3182} delta="+342" />
        <KPI label="متوسط التقييم" value={4.87} decimals={2} suffix="/5" />
      </div>

      {/* Chart */}
      <div className="relative mt-6 overflow-hidden rounded-xl border border-white/5 bg-black/30 p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-[280px] w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rev-bar" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="rev-bar-hover" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="students-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="students-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((g, i) => {
            const y = PAD_T + innerH * (1 - g);
            return (
              <g key={i}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={W - PAD_R}
                  y2={y}
                  stroke="rgba(15,23,42,0.06)"
                  strokeDasharray="3 4"
                />
                <text
                  x={PAD_L - 10}
                  y={y + 4}
                  fill="rgba(15,23,42,0.45)"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="Cairo"
                >
                  {Math.round((max * g) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {revenueData.map((d, i) => {
            const x = PAD_L + slot * i + (slot - barW) / 2;
            const h = (d.revenue / max) * innerH;
            const y = PAD_T + innerH - h;
            const hovered = hoverIdx === i;
            return (
              <g
                key={d.month}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.rect
                  x={x}
                  width={barW}
                  initial={{ y: PAD_T + innerH, height: 0 }}
                  animate={{ y, height: h }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  rx="6"
                  fill={hovered ? 'url(#rev-bar-hover)' : 'url(#rev-bar)'}
                  style={{
                    filter: hovered
                      ? 'drop-shadow(0 0 14px rgba(37,99,235,0.4))'
                      : 'drop-shadow(0 0 6px rgba(37,99,235,0.15))',
                  }}
                />
                {hovered && (
                  <motion.text
                    x={x + barW / 2}
                    y={y - 8}
                    fill="#2563EB"
                    fontSize="11"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="Inter"
                    initial={{ opacity: 0, y: y - 4 }}
                    animate={{ opacity: 1, y: y - 8 }}
                  >
                    {(d.revenue / 1000).toFixed(0)}k ج.م
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* Students line area */}
          <motion.path
            d={areaPath}
            fill="url(#students-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />

          {/* Students line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#students-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.7, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(37,99,235,0.4))' }}
          />

          {/* Student points */}
          {linePoints.map(([x, y], i) => (
            <motion.g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r={hoverIdx === i ? 6 : 4}
                fill="#3B82F6"
                stroke="#000"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6 + i * 0.06, type: 'spring' }}
              />
            </motion.g>
          ))}

          {/* X-axis labels */}
          {revenueData.map((d, i) => {
            const x = PAD_L + slot * i + slot / 2;
            return (
              <text
                key={d.month}
                x={x}
                y={H - PAD_B + 25}
                fill="rgba(15,23,42,0.6)"
                fontSize="11"
                textAnchor="middle"
                fontFamily="Cairo"
                fontWeight={hoverIdx === i ? '700' : '500'}
                style={{
                  fill:
                    hoverIdx === i ? '#2563eb' : 'rgba(15,23,42,0.6)',
                }}
              >
                {d.month}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center gap-4 px-2 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-gradient-to-b from-gold-100 to-gold-600" />
            الإيرادات (ج.م)
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-gradient-to-l from-gold-100 via-gold-400 to-gold-600" />
            الطلاب النشطين
          </div>
          <div className="ms-auto flex items-center gap-1 text-white/40">
            <Calendar className="h-3 w-3" />
            تحديث الآن
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KPI({ label, value, prefix = '', suffix = '', decimals = 0, delta }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <p className="text-[11px] font-medium text-white/50">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-lg font-bold text-white lg:text-xl">
          <CountUp
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </span>
        {delta && (
          <span className="text-[11px] font-semibold text-emerald-400">
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}