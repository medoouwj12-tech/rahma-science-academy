import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Watermark — moving security overlay that prevents screen recording.
 * Animates the watermark across the screen at irregular intervals so
 * static image extraction becomes impractical.
 */
export default function Watermark() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    let raf;
    let lastMove = 0;
    let x = 30;
    let y = 30;
    let vx = 0.4;
    let vy = 0.3;

    const tick = (now) => {
      if (now - lastMove > 16) {
        x += vx;
        y += vy;
        if (x > 70) vx = -Math.abs(vx);
        if (x < 5) vx = Math.abs(vx);
        if (y > 70) vy = -Math.abs(vy);
        if (y < 5) vy = Math.abs(vy);
        ref.current.style.transform = `translate(${x}vw, ${y}vh)`;
        lastMove = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="pointer-events-none absolute z-10 select-none"
      style={{ top: 0, left: 0 }}
    >
      <div className="rotate-[-30deg] whitespace-nowrap text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/35 drop-shadow-md">
          فاطمة الزهراء • +20 100 ••• 8888
        </p>
        <p className="font-mono text-[9px] text-white/25">
          ID: STU-4821 • رخصة #4821-RAHMA
        </p>
      </div>
    </motion.div>
  );
}