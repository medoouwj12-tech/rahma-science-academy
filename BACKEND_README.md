# منصة رحمة — Backend Setup

## 1. Neon Database
1. افتحي حساب على [neon.tech](https://neon.tech) (مجاني).
2. أنشئي مشروع جديد باسم `rahma-lms`.
3. من Dashboard → Connection Details → انسخي `DATABASE_URL`.
4. من SQL Editor نفّذي محتوى ملف `db/schema.sql`.

## 2. Vercel Deploy
1. ارفعي المشروع على Vercel (نفسه الـ frontend).
2. في **Settings → Environment Variables** أضيفي:
   - `DATABASE_URL` = (الـ connection string من Neon)
   - `VITE_API_URL` = `https://your-app.vercel.app/api`
3. اعملي redeploy.

## 3. الـ API Endpoints
- `GET /api/courses` — قائمة الكورسات
- `POST /api/courses` — إنشاء كورس (instructor)
- `GET /api/enrollments?student_id=...` — اشتراكات الطالب
- `POST /api/enrollments` — تسجيل في كورس
- `GET /api/bookings?student_id=...` — الحجوزات
- `POST /api/bookings` — حجز حصة
- `GET /api/payments?student_id=...` — المدفوعات
- `POST /api/payments` — إنشاء عملية دفع (Paymob)
- `GET /api/stats` — إحصائيات لوحة المدرّسة

## 4. Next Steps
- [ ] ربط Clerk (Auth)
- [ ] ربط Paymob (Payment)
- [ ] Cloudflare R2 لتخزين الفيديوهات
