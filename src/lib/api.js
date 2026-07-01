// مساعد لإجراء fetch — يضيف base URL مرة واحدة
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const coursesApi = {
  list: (stage) => api(`/courses${stage ? `?stage=${stage}` : ''}`),
  create: (data) => api('/courses', { method: 'POST', body: JSON.stringify(data) }),
};

export const enrollmentsApi = {
  list: (studentId) => api(`/enrollments?student_id=${studentId}`),
  enroll: (studentId, courseId) =>
    api('/enrollments', { method: 'POST', body: JSON.stringify({ student_id: studentId, course_id: courseId }) }),
};

export const bookingsApi = {
  list: (studentId) => api(`/bookings?student_id=${studentId}`),
  create: (data) => api('/bookings', { method: 'POST', body: JSON.stringify(data) }),
};

export const paymentsApi = {
  list: (studentId) => api(`/payments?student_id=${studentId}`),
  create: (data) => api('/payments', { method: 'POST', body: JSON.stringify(data) }),
};

export const statsApi = {
  get: () => api('/stats'),
};
