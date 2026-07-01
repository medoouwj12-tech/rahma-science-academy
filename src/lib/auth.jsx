// Auth Context — local-only for now (no Clerk integration yet)
// Will be replaced with Clerk when keys are added

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

  // Fallback: simple email/password stored in DB
  async function signIn(email, password) {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'فشل تسجيل الدخول');
    setUser(data.user);
    return data.user;
  }

  async function signUp({ email, password, full_name, role = 'student', stage }) {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'signup', email, password, full_name, role, stage }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'فشل إنشاء الحساب');
    setUser(data.user);
    return data.user;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}
