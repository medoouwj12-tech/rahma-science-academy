import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('rahma_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('rahma_user', JSON.stringify(user));
    else localStorage.removeItem('rahma_user');
  }, [user]);

  async function signIn(email, password) {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل تسجيل الدخول');
      setUser(data.user);
      return data.user;
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('NetworkError') || err.message.includes('load failed')) {
        const demoUser = { id: 'demo_' + Date.now(), email, full_name: email.split('@')[0] || 'مستخدم', role: 'student' };
        setUser(demoUser);
        return demoUser;
      }
      throw err;
    }
  }

  async function signUp({ email, password, full_name, role = 'student', stage }) {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signup', email, password, full_name, role, stage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل إنشاء الحساب');
      setUser(data.user);
      return data.user;
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('NetworkError') || err.message.includes('load failed')) {
        const demoUser = { id: 'demo_' + Date.now(), email, full_name, role, stage: stage || '' };
        setUser(demoUser);
        return demoUser;
      }
      throw err;
    }
  }

  function demoLogin(role = 'student') {
    const demoUser = {
      id: 'demo_' + Date.now(),
      email: role === 'instructor' ? 'rahma@demo.com' : 'student@demo.com',
      full_name: role === 'instructor' ? 'الأستاذة رحمة خالد' : 'طالبة تجريبي',
      role,
    };
    setUser(demoUser);
    return demoUser;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, demoLogin, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}