import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const info = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div className="fixed left-4 top-4 z-[100] flex flex-col gap-2" dir="rtl">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-gold-glow backdrop-blur-xl ${
                t.type === 'success'
                  ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200'
                  : t.type === 'error'
                  ? 'border-rose-400/30 bg-rose-500/15 text-rose-200'
                  : 'border-gold-400/30 bg-gold-400/15 text-gold-200'
              }`}
            >
              {t.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> :
               t.type === 'error' ? <XCircle className="h-4 w-4 shrink-0" /> :
               <AlertCircle className="h-4 w-4 shrink-0" />}
              {t.message}
              <button onClick={() => removeToast(t.id)} className="mr-2 opacity-60 hover:opacity-100">
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>');
  return ctx;
}