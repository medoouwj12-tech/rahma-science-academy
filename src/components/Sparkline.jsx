import { motion } from 'framer-motion';
import { useId } from 'react';

/**
 * Sparkline — minimalist SVG trend line with gold gradient stroke
 * and a soft area fill.
 */
export default function Sparkline({
  data = [],
  width = 120,
  height = 40,
  stroke = 'url(#spark-grad)',
  fill = 'url(#spark-fill)',
  strokeWidth = 2,
  className = '',
  showDot = true,
}) {
  const id = useId().replace(/:/g, '');

  if (!data.length) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const areaPath =
    `M${points[0][0]},${height} ` +
    points.map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`).join(' ') +
    ` L${points[points.length - 1][0]},${height} Z`;

  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`spark-grad-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#B8941F" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F3E5AB" />
        </linearGradient>
        <linearGradient id={`spark-fill-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#spark-fill-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={`url(#spark-grad-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {showDot && (
        <motion.circle
          cx={last[0]}
          cy={last[1]}
          r="3"
          fill="#F3E5AB"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        />
      )}
    </svg>
  );
}