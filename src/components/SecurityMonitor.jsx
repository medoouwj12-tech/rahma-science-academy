import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  Eye,
  Ban,
  CheckCircle2,
  Filter,
  Activity,
  Wifi,
} from 'lucide-react';
import { securityLogs, recentStudents } from '../data/mockData';
import CountUp from './CountUp';

const severityStyle = {
  high: {
    color: 'rose',
    label: 'خطر عالي',
    bg: 'border-rose-400/30 bg-rose-500/10',
    text: 'text-rose-300',
    glow: 'shadow-[0_0_30px_-6px_rgba(244,63,94,0.5)]',
  },
  medium: {
    color: 'amber',
    label: 'انتباه',
    bg: 'border-amber-400/30 bg-amber-500/10',
    text: 'text-amber-300',
    glow: 'shadow-[0_0_30px_-6px_rgba(251,191,36,0.4)]',
  },
  low: {
    color: 'emerald',
    label: 'طبيعي',
    bg: 'border-emerald-400/30 bg-emerald-500/10',
    text: 'text-emerald-300',
    glow: '',
  },
};

const deviceIcons = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
};

export default function SecurityMonitor() {
  const [filter, setFilter] = useState('all');
  const [logs, setLogs] = useState([...securityLogs]);
  const filtered = logs.filter((l) => filter === 'all' || l.severity === filter);

  const stats = {
    high: logs.filter((l) => l.severity === 'high').length,
    medium: logs.filter((l) => l.severity === 'medium').length,
    low: logs.filter((l) => l.severity === 'low').length,
  };

  const handleBan = (logId, studentName) => {
    if (confirm('هل تريدين حظر هذا الطالب: ' + studentName + '؟')) {
      setLogs(logs.filter(l => l.id !== logId));
      alert('تم حظر الطالب بنجاح وتسجيل خروجه من كل الأجهزة. ⛔');
    }
  };

  const handleDismiss = (logId) => {
    setLogs(logs.filter(l => l.id !== logId));
    alert('تم تجاهل هذا التنبيه. ✅');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.85 }}
      className="space-y-5"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <Shield className="h-5 w-5 text-gold-400" strokeWidth={1.8} />
            مراقبة الطلاب والأمان
          </h3>
          <p className="mt-1 text-xs text-white/50">
            حماية كاملة ضد محاولات الغش وتسجيل الدخول من أجهزة متعددة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="chip">
            <Wifi className="h-3 w-3" /> النظام متصل
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-xs font-semibold text-gold-200">
            <Activity className="h-3 w-3 animate-pulse" />
            مراقبة لحظية
          </span>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SecurityStatCard
          title="تهديدات نشطة"
          titleEn="Active Threats"
          value={stats.high}
          icon={AlertTriangle}
          severity="high"
          delay={0.9}
        />
        <SecurityStatCard
          title="تنبيهات تحتاج مراجعة"
          titleEn="Pending Review"
          value={stats.medium}
          icon={Eye}
          severity="medium"
          delay={1}
        />
        <SecurityStatCard
          title="جلسات آمنة"
          titleEn="Safe Sessions"
          value="99.2"
          suffix="%"
          icon={CheckCircle2}
          severity="low"
          delay={1.1}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Security Logs */}
        <div className="glass-card gold-border relative overflow-hidden p-5 xl:col-span-2">
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-rose-400/8 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <h4 className="flex items-center gap-2 font-display text-base font-bold text-white">
              <AlertTriangle className="h-4 w-4 text-gold-400" />
              سجل الأمان الأخير
            </h4>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1 text-[11px] font-semibold">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'high', label: 'خطر' },
                { id: 'medium', label: 'انتباه' },
                { id: 'low', label: 'آمن' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-md px-3 py-1.5 transition-all ${
                    filter === f.id
                      ? 'bg-gold-400/15 text-gold-100'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-4 space-y-3">
            {filtered.map((log, i) => (
              <SecurityLogRow key={log.id} log={log} index={i} onBan={handleBan} onDismiss={handleDismiss} />
            ))}
          </div>
        </div>

        {/* Recent Students */}
        <div className="glass-card gold-border relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/8 blur-3xl" />

          <h4 className="font-display text-base font-bold text-white">
            الطلاب النشطون الآن
          </h4>
          <p className="mt-1 text-xs text-white/50">
            آخر النشاطات في الحصص المباشرة
          </p>

          <div className="mt-5 space-y-3">
            {recentStudents.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.06 }}
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-gold-400/30 hover:bg-white/[0.04]"
              >
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-sm font-bold text-black">
                    {s.name.charAt(0)}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-obsidian-light ${
                      s.status === 'online' ? 'bg-emerald-400' : 'bg-white/30'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {s.name}
                  </p>
                  <p className="truncate text-[11px] text-white/50">
                    {s.course} • {s.progress}%
                  </p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 1, delay: 1.3 + i * 0.06 }}
                      className="h-full rounded-full bg-gradient-to-l from-gold-300 to-gold-600"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-display text-base font-bold text-gold-200">
                    {s.score}
                  </p>
                  <p className="text-[10px] text-white/40">درجة</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SecurityStatCard({ title, titleEn, value, suffix = '', icon: Icon, severity, delay = 0 }) {
  const s = severityStyle[severity];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -3 }}
      className={`glass-card relative overflow-hidden p-5 ${s.glow}`}
    >
      <div
        className={`pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full blur-3xl ${
          severity === 'high'
            ? 'bg-rose-400/20'
            : severity === 'medium'
            ? 'bg-amber-400/15'
            : 'bg-emerald-400/15'
        }`}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            {titleEn}
          </p>
          <p className="text-sm font-semibold text-white/80">{title}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${s.bg}`}
        >
          <Icon className={`h-5 w-5 ${s.text}`} strokeWidth={1.8} />
        </div>
      </div>
      <p className="relative mt-4 font-display text-3xl font-bold text-white">
        <CountUp value={typeof value === 'string' ? parseFloat(value) : value} suffix={suffix} decimals={typeof value === 'string' ? 1 : 0} />
      </p>
    </motion.div>
  );
}

function SecurityLogRow({ log, index, onBan, onDismiss }) {
  const s = severityStyle[log.severity];
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.95 + index * 0.06 }}
      className={`group relative overflow-hidden rounded-xl border ${s.bg} p-4 transition-all hover:scale-[1.005]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${s.bg} ${s.text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  log.severity === 'high'
                    ? 'bg-rose-400 animate-pulse'
                    : log.severity === 'medium'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              {s.label}
            </span>
            <span className="text-[10px] text-white/40">•</span>
            <span className="flex items-center gap-1 text-[10px] text-white/40">
              <Clock className="h-3 w-3" />
              {log.timestamp}
            </span>
          </div>

          <p className="mt-2 text-sm font-bold text-white">{log.student}</p>
          <p className="text-[11px] text-white/50">{log.phone}</p>

          <p className="mt-2 text-sm font-semibold text-white/90">
            {log.activity}
          </p>

          {/* IP & device details */}
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DeviceBlock
              device={log.device1}
              ip={log.ip1}
              location={log.location1}
              primary
            />
            {log.device2 !== '—' && (
              <DeviceBlock
                device={log.device2}
                ip={log.ip2}
                location={log.location2}
              />
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onBan(log.id, log.student)}
            title="حظر الطالب"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Ban className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDismiss(log.id)}
            title="تجاهل التنبيه"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DeviceBlock({ device, ip, location, primary = false }) {
  const isMobile = /iphone|samsung|ipad|mobile/i.test(device);
  const Icon = isMobile ? Smartphone : Monitor;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border p-2 ${
        primary
          ? 'border-gold-400/20 bg-gold-400/[0.04]'
          : 'border-rose-400/20 bg-rose-500/[0.04]'
      }`}
    >
      <Icon
        className={`h-3.5 w-3.5 shrink-0 ${
          primary ? 'text-gold-300' : 'text-rose-300'
        }`}
        strokeWidth={1.8}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold text-white">
          {device}
        </p>
        <p className="flex items-center gap-2 text-[10px] text-white/50">
          <span className="flex items-center gap-0.5">
            <Globe className="h-2.5 w-2.5" />
            {ip}
          </span>
          <span className="flex items-center gap-0.5">
            <MapPin className="h-2.5 w-2.5" />
            {location}
          </span>
        </p>
      </div>
    </div>
  );
}