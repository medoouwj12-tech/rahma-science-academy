# منصة الأستاذة رحمة خالد التعليمية
### Premium Educational LMS — Full Platform

A complete, ultra-premium educational platform (LMS) for the top-tier instructor **Rahma Khaled**, built with React + Vite + Tailwind CSS + Framer Motion. Includes every page you requested with a luxury dark + gold aesthetic.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `black` | `#000000` | Page background |
| `obsidian` | `#0D0D0D` | Card surfaces |
| `obsidian-light` | `#141414` | Elevated surfaces |
| `gold-400` | `#D4AF37` | Primary metallic accent |
| `gold-100` | `#F3E5AB` | Highlight / gradient |
| `gold-600` | `#B8941F` | Deep accent |

- **Typography**: Cairo (Arabic) + Inter (Latin numerals) + Playfair Display (display)
- **Effects**: glassmorphism, backdrop-blur, gold-gradient text, animated glow
- **Motion**: Framer Motion (fade-up on mount, staggered, animated counters)

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite 5 + React Router DOM 6
- **Styling**: Tailwind CSS 3 with custom dark/gold theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cairo / Inter / Playfair Display (Google Fonts)
- **Charts**: Custom SVG (no chart library bloat)
- **Language**: Arabic-first (RTL), bilingual labels

---

## 🗺️ Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `LandingPage` | Hero + animated stats + featured courses + testimonials + footer |
| `/auth` | `AuthPage` | Sign in / Sign up with social auth UI |
| `/checkout/:courseId` | `CheckoutPage` | Premium checkout flow with payment methods |
| `/instructor` | `InstructorDashboard` | Full control center (analytics, courses, quizzes, security) |
| `/student` | `StudentDashboard` | "Continue learning" + weekly goal + upcoming |
| `/student/course/:id` | `CourseViewer` | Custom video player + playlist + **moving watermark** |
| `/student/quiz/:id` | `QuizInterface` | Sticky countdown + progress bar + warning states |
| `/student/live` | `LiveSessions` | Live + upcoming sessions |
| `/student/certificates` | `Certificates` | Earned certificates gallery |
| `/student/profile` | `ProfilePage` | Student profile + achievements |

---

## ✨ Pages & Features

### 1. Landing Page
- Premium gold shimmer headline
- Floating dashboard mockup with animations
- Trust strip with avatars + 4.95/5 rating
- Animated stats counters (10K+ students, 50+ courses, 200+ quizzes, 98% success)
- Featured courses grid with gradient covers + emoji thumbnails
- "Why us" 6-feature grid
- Testimonials with 3 cards
- CTA section + Footer

### 2. Auth Page
- Tab switcher (Sign in / Sign up)
- Social auth buttons (Google, Apple)
- Fields with gold focus glow
- Password show/hide toggle
- Trust perks footer

### 3. Checkout Page
- 3 payment methods (card / wallet / Vodafone Cash)
- Coupon code with 20% discount
- Animated circular score preview
- Trust badges (256-bit, 14-day refund)
- Order summary with course mini-card

### 4. Instructor Dashboard (لوحة تحكم الأستاذة)
- Welcome banner with shimmer text
- 4 KPI cards with sparklines + animated counters
- Custom SVG Revenue Chart (bars + line + hover)
- Course Manager with create modal (Bunny.net/Vimeo support)
- Quiz Creator with builder modal
- Security Monitor with severity levels + active students

### 5. Student Dashboard
- Welcome banner with streak counter
- 4 quick stats
- "Continue learning" cards with progress bars
- Weekly goal tracker
- Upcoming widget (quizzes/live/tasks)

### 6. Course Viewer (Video Player)
- Custom gold-themed video controls
- Progress bar with hover preview
- **Moving security watermark** (`Watermark.jsx`) — animated across screen
- HD indicator + security badge
- Playlist sidebar (current / completed / locked)
- Lecture info with tabs

### 7. Quiz Interface
- Pre-quiz intro with rules
- Sticky timer with warning states (amber @ <5min, rose @ <1min, pulsing)
- Progress bar with question dots
- Live question grid (5x2) showing status colors
- Question flagging system
- Auto-save answers
- Submit confirmation modal
- Beautiful result screen with animated circular score

### 8. Live Sessions
- Live now banner with viewer count
- Upcoming sessions grid
- Reminder buttons

### 9. Certificates
- 4 certified achievements
- Grade, score, certificate number
- Download PDF / Share

### 10. Profile
- Gradient cover + avatar
- 4 XP stats
- Personal info rows
- Achievements list

---

## 📁 Project Structure

```
D:\منصة رحمة
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                       # Router + shells
    ├── index.css                     # Global utilities
    ├── data/mockData.js              # All mock data
    ├── components/
    │   ├── Sidebar.jsx               # Instructor sidebar
    │   ├── TopBar.jsx                # Instructor top bar
    │   ├── StatsCard.jsx
    │   ├── Sparkline.jsx
    │   ├── CountUp.jsx
    │   ├── RevenueChart.jsx
    │   ├── CourseManager.jsx
    │   ├── QuizCreator.jsx
    │   ├── SecurityMonitor.jsx
    │   └── Watermark.jsx             # Moving security overlay
    └── pages/
        ├── LandingPage.jsx           # /
        ├── AuthPage.jsx              # /auth
        ├── CheckoutPage.jsx          # /checkout/:id
        ├── InstructorDashboard.jsx   # /instructor
        ├── StudentDashboard.jsx      # /student
        ├── CourseViewer.jsx          # /student/course/:id
        ├── QuizInterface.jsx         # /student/quiz/:id
        ├── LiveSessions.jsx          # /student/live
        ├── Certificates.jsx          # /student/certificates
        └── ProfilePage.jsx           # /student/profile
```

---

## 🛠️ Setup & Run

```bash
cd "D:\منصة رحمة"
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Suggested test routes
- `/` — Landing
- `/auth` — Login (try `?signup=1` for register)
- `/checkout/1` — Checkout flow
- `/instructor` — Instructor Dashboard
- `/student` — Student Dashboard
- `/student/course/1` — Video player with watermark
- `/student/quiz/1` — Interactive quiz

---

## 🎯 Next Steps (when ready)

The entire platform is scaffolded. Next enhancements you might want:

1. **Backend integration** (Node.js / Firebase / Supabase)
2. **Bunny.net / Vimeo video API** for real video streaming
3. **Payment gateway** (Stripe / Paymob / Fawry for Egypt)
4. **i18n** (English version toggle)
5. **Real auth** (JWT + protected routes)
6. **PWA** (offline support)
7. **Notifications** (real-time WebSocket)
8. **AI tutor** (chat with course content)

---

## 📜 License

Proprietary — © 2026 منصة الأستاذة رحمة خالد التعليمية.