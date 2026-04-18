import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Database, Globe, Zap, TrendingUp, Server, Shield } from "lucide-react";

const METRIC_KEYS = ["Requests/s", "CPU %", "Memory %", "Latency ms", "Uptime %", "Errors/min"];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LOG_TEMPLATES = [
  { level: "INFO", color: "#00c8ff", msgs: [
    "Request processed: POST /api/orders → 201 Created (12ms)",
    "Auth token validated for user_id=8471 (session active)",
    "Cache hit: product catalog loaded from Redis (0.3ms)",
    "Webhook dispatched: order.confirmed → crm.endpoint",
    "Background job enqueued: generate-invoice #INV-00238",
    "Health check passed: all 6 services nominal",
  ]},
  { level: "OK", color: "#00ff88", msgs: [
    "Deployment completed: v2.4.1 live on prod cluster",
    "AI model inference: 98.3% confidence · 47ms",
    "Data pipeline executed: 14,302 records synced",
    "Scheduled backup completed: 0 errors · 2.1GB",
    "Auto-scaling triggered: 3 → 5 instances (load: 74%)",
  ]},
  { level: "WARN", color: "#f59e0b", msgs: [
    "Rate limit approaching: IP 203.0.113.42 (87/100)",
    "Slow query detected: 342ms — index recommended",
    "Queue depth elevated: 234 items pending (threshold 200)",
    "JWT expiry in 5 minutes for 12 active sessions",
  ]},
  { level: "SYS", color: "#7c3aed", msgs: [
    "Cronjob triggered: analytics-aggregation (00:00 UTC)",
    "SSL certificate auto-renewed: 90 days",
    "Database vacuum initiated: freeing 840MB",
    "Config reload: feature flags updated from remote",
  ]},
];

function nextLog() {
  const group = LOG_TEMPLATES[randomBetween(0, LOG_TEMPLATES.length - 1)];
  const msg = group.msgs[randomBetween(0, group.msgs.length - 1)];
  const ts = new Date();
  return {
    id: Math.random(),
    level: group.level,
    color: group.color,
    msg,
    time: `${ts.getHours().toString().padStart(2, "0")}:${ts.getMinutes().toString().padStart(2, "0")}:${ts.getSeconds().toString().padStart(2, "0")}`,
  };
}

const CHART_SERIES = [
  { label: "App Traffic", color: "#00c8ff", min: 40, max: 90 },
  { label: "AI Inference", color: "#7c3aed", min: 30, max: 80 },
  { label: "Automation", color: "#00ff88", min: 20, max: 70 },
];

function generateBars(n = 16, min = 20, max = 90) {
  return Array.from({ length: n }, () => randomBetween(min, max));
}

const LIVE_METRICS = [
  { label: "Active Users", icon: Globe, color: "#00c8ff", min: 1240, max: 2100, suffix: "" },
  { label: "API Calls/min", icon: Zap, color: "#7c3aed", min: 4200, max: 8900, suffix: "" },
  { label: "Uptime SLA", icon: Shield, color: "#00ff88", min: 99, max: 100, suffix: "%" },
  { label: "Avg Latency", icon: Activity, color: "#f59e0b", min: 12, max: 48, suffix: "ms" },
];

export default function SimulationDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const logRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState(() => Array.from({ length: 6 }, () => nextLog()));
  const [bars, setBars] = useState(() =>
    CHART_SERIES.map((s) => generateBars(16, s.min, s.max))
  );
  const [metrics, setMetrics] = useState(() =>
    LIVE_METRICS.map((m) => randomBetween(m.min, m.max))
  );
  const [activeSeries, setActiveSeries] = useState(0);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!isInView || !running) return;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [nextLog(), ...prev].slice(0, 12);
        return next;
      });
      setBars((prev) =>
        prev.map((series, i) => {
          const s = CHART_SERIES[i];
          const next = [...series.slice(1), randomBetween(s.min, s.max)];
          return next;
        })
      );
      setMetrics(LIVE_METRICS.map((m) => randomBetween(m.min, m.max)));
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView, running]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <section ref={ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.12,
        }}
      />
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)", opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00c8ff] text-xs font-mono uppercase tracking-widest">Live System Monitor</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text">
            Real-Time{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Platform Intelligence
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Every system we build ships with live monitoring, performance analytics, and intelligent alerting built in.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {LIVE_METRICS.map(({ label, icon: Icon, color, suffix }, i) => (
            <div
              key={label}
              className="rounded-xl border p-5"
              style={{
                background: "rgba(10,15,30,0.7)",
                borderColor: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4" style={{ color }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              </div>
              <motion.div
                key={`${metrics[i]}-${tick}`}
                initial={{ opacity: 0.6, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-heading font-bold text-2xl"
                style={{ color }}
                data-testid={`dashboard-metric-${i}`}
              >
                {metrics[i].toLocaleString()}{suffix}
              </motion.div>
              <p className="text-white/30 text-xs font-mono mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-xl border overflow-hidden"
            style={{
              background: "rgba(10,15,30,0.85)",
              borderColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-[#00c8ff]" />
                <span className="text-white/60 text-sm font-mono">Performance Analytics</span>
              </div>
              <div className="flex gap-2">
                {CHART_SERIES.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setActiveSeries(i)}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md transition-all duration-200"
                    style={{
                      background: activeSeries === i ? `${s.color}18` : "rgba(255,255,255,0.04)",
                      color: activeSeries === i ? s.color : "rgba(255,255,255,0.3)",
                      border: `1px solid ${activeSeries === i ? s.color + "35" : "rgba(255,255,255,0.06)"}`,
                    }}
                    data-testid={`dashboard-series-${i}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-end gap-1 h-36 mb-3">
                {bars[activeSeries].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm relative overflow-hidden"
                    style={{ height: `${h}%` }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div
                      className="absolute inset-0 rounded-sm"
                      style={{
                        background: `linear-gradient(to top, ${CHART_SERIES[activeSeries].color}80, ${CHART_SERIES[activeSeries].color}25)`,
                      }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: CHART_SERIES[activeSeries].color, opacity: 0.8 }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/20">
                <span>-30s</span>
                <span>-20s</span>
                <span>-10s</span>
                <span>NOW</span>
              </div>
            </div>

            <div className="px-5 pb-4 grid grid-cols-3 gap-3">
              {[
                { label: "Peak", value: `${Math.max(...bars[activeSeries])}%` },
                { label: "Avg", value: `${Math.round(bars[activeSeries].reduce((a, b) => a + b, 0) / bars[activeSeries].length)}%` },
                { label: "Min", value: `${Math.min(...bars[activeSeries])}%` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center p-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="font-mono font-bold text-sm" style={{ color: CHART_SERIES[activeSeries].color }}>{value}</div>
                  <div className="text-white/25 text-[10px] font-mono">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl border overflow-hidden flex flex-col"
            style={{
              background: "rgba(10,15,30,0.85)",
              borderColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-[#7c3aed]" />
                <span className="text-white/60 text-sm font-mono">System Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-white/25 text-[10px] font-mono">LIVE</span>
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{
                    background: running ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.05)",
                    color: running ? "#00ff88" : "rgba(255,255,255,0.3)",
                    border: `1px solid ${running ? "rgba(0,255,136,0.25)" : "rgba(255,255,255,0.08)"}`,
                  }}
                  data-testid="dashboard-toggle-logs"
                >
                  {running ? "PAUSE" : "RESUME"}
                </button>
              </div>
            </div>

            <div
              ref={logRef}
              className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs"
              style={{ maxHeight: "320px" }}
            >
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2.5 group"
                    data-testid="dashboard-log-entry"
                  >
                    <span className="text-white/20 flex-shrink-0 mt-px">{log.time}</span>
                    <span
                      className="flex-shrink-0 px-1.5 py-px rounded text-[10px] font-bold mt-px"
                      style={{ background: `${log.color}15`, color: log.color, border: `1px solid ${log.color}25` }}
                    >
                      {log.level}
                    </span>
                    <span className="text-white/45 leading-relaxed group-hover:text-white/65 transition-colors">{log.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="px-5 py-3 border-t border-white/[0.05] flex items-center gap-3 flex-shrink-0">
              <Cpu className="w-3.5 h-3.5 text-white/20" />
              <div className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #00c8ff, #7c3aed)" }}
                  animate={{ width: `${randomBetween(30, 80)}%` }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
              <span className="text-white/20 text-[10px] font-mono">CPU</span>
              <Database className="w-3.5 h-3.5 text-white/20 ml-2" />
              <div className="w-12 h-1 rounded-full overflow-hidden bg-white/[0.05]">
                <div className="h-full rounded-full w-2/3" style={{ background: "#00ff8840" }} />
              </div>
              <span className="text-white/20 text-[10px] font-mono">MEM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

