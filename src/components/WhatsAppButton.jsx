import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '201033304460'; // International format
  const message = encodeURIComponent(
    'السلام عليكم أستاذة رحمة، أريد الاستفسار عن المناهج والاشتراك في المنصة'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      className="fixed bottom-6 left-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* Ring waves */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-25" />
        
        {/* Gold Border Highlight on Hover */}
        <span className="absolute inset-0 rounded-full border border-gold-400/0 transition-all group-hover:border-gold-400/50" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.004 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.5 22l4.31-1.34c1.55.93 3.35 1.48 5.27 1.48 5.52 0 10-4.48 10-10S17.52 2 12.004 2zm5.79 13.92c-.25.7-1.44 1.34-2.02 1.43-.5.08-1.14.15-3.32-.76-2.79-1.16-4.57-4-4.71-4.19-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.33.26-.27.56-.34.75-.34.19 0 .37.01.53.02.17.01.4.06.61.56.26.62.88 2.14.95 2.29.07.15.12.33.02.53-.1.2-.21.33-.33.48-.12.14-.26.32-.37.43-.12.12-.25.26-.11.5.14.24.63 1.03 1.35 1.67.92.82 1.7 1.07 1.94 1.19.24.12.38.1.52-.06.14-.17.62-.72.79-.97.17-.25.34-.21.57-.12.24.09 1.5.71 1.76.84.26.13.43.2.49.31.06.11.06.66-.19 1.36z" />
        </svg>

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 scale-75 whitespace-nowrap rounded-xl border border-gold-400/20 bg-black/90 px-3.5 py-1.5 text-xs font-bold text-gold-100 opacity-0 shadow-gold-glow backdrop-blur-md transition-all group-hover:scale-100 group-hover:opacity-100">
          تواصل مباشر مع الدعم
        </span>
      </a>
    </motion.div>
  );
}
