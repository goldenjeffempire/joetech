import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Brain, Cpu, Zap, Shield, Globe,
  Smartphone, MonitorSmartphone, Network, Workflow, Palette,
  CheckCircle, TrendingUp, Database, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const codeLines = [
  { text: "import strategy from '@joe/enterprise-systems'", color: "text-[#c792ea]" },
  { text: "import { apps, websites, ai } from '@joe/build-stack'", color: "text-[#c792ea]" },
  { text: "import performance from '@joe/production-runtime'", color: "text-[#c792ea]" },
  { text: "", color: "" },
  { text: "class JOETechnologiesPlatform {", color: "text-[#82aaff]" },
  { text: "  // Apps, websites, systems and AI engineered to scale", color: "text-[#546e7a]" },
  { text: "", color: "" },
  { text: "  architect(businessGoal) {", color: "text-[#82aaff]" },
  { text: "    const product = strategy.mapToRevenueWorkflow(businessGoal)", color: "text-white/80" },
  { text: "    const system = apps.compose(product).with(ai.agents)", color: "text-white/80" },
  { text: "    return performance.deploy(system, { scale: 'global' })", color: "text-[#c3e88d]" },
  { text: "  }", color: "text-[#82aaff]" },
  { text: "}", color: "text-[#82aaff]" },
  { text: "", color: "" },
  { text: "// Turning digital ambition into production advantage", color: "text-[#546e7a]" },
];

const stats = [
  { value: 50, suffix: "+", label: "Digital Products Shipped" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 10, suffix: "x", label: "Performance Gains" },
  { value: 5, suffix: "", label: "Service Pillars" },
];

const serviceCards = [
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Web & Mobile",
    accent: "#00c8ff",
    metrics: [{ label: "Uptime", value: "99.9%" }, { label: "Performance", value: "10x" }],
  },
  {
    icon: MonitorSmartphone,
    title: "Website Design",
    desc: "SEO & Conversion",
    accent: "#0066ff",
    metrics: [{ label: "Load time", value: "<1.2s" }, { label: "Conversion", value: "+40%" }],
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "Business Workflows",
    accent: "#7c3aed",
    metrics: [{ label: "Time saved", value: "73%" }, { label: "Accuracy", value: "99.1%" }],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Design Systems",
    accent: "#f59e0b",
    metrics: [{ label: "User rating", value: "4.9★" }, { label: "Retention", value: "+62%" }],
  },
  {
    icon: Brain,
    title: "AI & ML",
    desc: "Intelligent Systems",
    accent: "#00ff88",
    metrics: [{ label: "Accuracy", value: "97.4%" }, { label: "Latency", value: "<40ms" }],
  },
];

const liveMetrics = [
  { label: "Active Projects", value: "12", icon: Database, accent: "#00c8ff" },
  { label: "Uptime SLA", value: "99.9%", icon: CheckCircle, accent: "#00ff88" },
  { label: "AI Models", value: "6", icon: Bot, accent: "#7c3aed" },
  { label: "Avg ROI", value: "10x", icon: TrendingUp, accent: "#f59e0b" },
];

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,255,0.45)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,120,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span>{count}{suffix}</span>;
}

function ServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % serviceCards.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(8,13,28,0.97), rgba(3,8,18,0.99))",
        borderColor: "rgba(0,200,255,0.15)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,200,255,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
          <span className="text-white/50 text-xs font-mono uppercase tracking-widest">JOE Platform · Live</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/20 text-xs font-mono">v3.8 production</span>
          <div className="flex gap-1">
            {[serviceCards.length].fill(0).map === undefined
              ? null
              : serviceCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: i === activeIndex
                        ? serviceCards[i].accent
                        : "rgba(255,255,255,0.15)",
                    }}
                    aria-label={`View ${serviceCards[i].title}`}
                  />
                ))}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-2">
          {serviceCards.map((svc, i) => {
            const Icon = svc.icon;
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300"
                style={{
                  background: isActive ? `${svc.accent}12` : "rgba(255,255,255,0.025)",
                  borderColor: isActive ? `${svc.accent}40` : "rgba(255,255,255,0.06)",
                  boxShadow: isActive ? `0 0 20px ${svc.accent}20` : "none",
                }}
                data-testid={`hero-service-tab-${i}`}
              >
                <Icon
                  className="w-4 h-4 transition-all duration-300"
                  style={{ color: isActive ? svc.accent : "rgba(255,255,255,0.3)" }}
                />
                <span
                  className="text-[9px] font-mono font-medium text-center leading-tight transition-all duration-300"
                  style={{ color: isActive ? svc.accent : "rgba(255,255,255,0.3)" }}
                >
                  {svc.title.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border p-5"
          style={{
            background: `${serviceCards[activeIndex].accent}08`,
            borderColor: `${serviceCards[activeIndex].accent}25`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${serviceCards[activeIndex].accent}15`,
                border: `1px solid ${serviceCards[activeIndex].accent}35`,
                boxShadow: `0 0 24px ${serviceCards[activeIndex].accent}20`,
              }}
            >
              {(() => {
                const Icon = serviceCards[activeIndex].icon;
                return <Icon className="w-5 h-5" style={{ color: serviceCards[activeIndex].accent }} />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-heading font-bold text-sm mb-0.5"
                style={{ color: serviceCards[activeIndex].accent }}
              >
                {serviceCards[activeIndex].title}
              </h4>
              <p className="text-white/40 text-xs font-mono">{serviceCards[activeIndex].desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {serviceCards[activeIndex].metrics.map((m, mi) => (
              <div
                key={mi}
                className="flex flex-col gap-0.5 p-3 rounded-lg border"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderColor: `${serviceCards[activeIndex].accent}15`,
                }}
              >
                <span
                  className="font-heading font-bold text-lg"
                  style={{ color: serviceCards[activeIndex].accent }}
                >
                  {m.value}
                </span>
                <span className="text-white/35 text-[10px] font-mono uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-2">
          {liveMetrics.map((lm, i) => {
            const Icon = lm.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <Icon className="w-3 h-3" style={{ color: lm.accent }} />
                <span className="font-heading font-bold text-sm" style={{ color: lm.accent }}>
                  {lm.value}
                </span>
                <span className="text-white/25 text-[9px] font-mono leading-tight text-center">{lm.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="px-5 py-3 border-t flex items-center justify-between"
        style={{ background: "rgba(0,200,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Brain className="w-3 h-3 text-[#00c8ff]" />
            <span className="text-xs text-white/30 font-mono">AI Enabled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#c3e88d]" />
            <span className="text-xs text-white/30 font-mono">Enterprise Grade</span>
          </div>
        </div>
        <div className="text-xs text-white/18 font-mono">React · APIs · AI · Cloud</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < codeLines.length) { setVisibleLines(i + 1); i++; }
        else { clearInterval(interval); setTimeout(() => setShowShowcase(true), 400); }
      }, 95);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--joe-bg-hero)" }}
    >
      <NeuralBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none animate-orb-1"
        style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", opacity: 0.12 }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none animate-orb-2"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: 0.1 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: 0.06 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 w-fit rounded-full px-4 py-2 relative overflow-hidden"
              style={{
                background: "rgba(0,200,255,0.08)",
                border: "1px solid rgba(0,200,255,0.25)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="text-[#00c8ff] text-sm font-medium tracking-wider uppercase font-mono">
                Enterprise Digital Product Engineering
              </span>
              <span className="text-[#00c8ff]/40 text-xs font-mono">// v2.0</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h1 className="font-heading font-bold leading-[1.05] text-joe-text" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                Apps, Websites
                <br />
                <span className="text-gradient-cyber">Digital Systems</span>
                <br />
                & AI Solutions
              </h1>
              <p className="text-joe-text/40 text-xs font-mono tracking-[0.3em] uppercase mt-2">
                engineered to launch. scale. outperform.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-joe-text/60 text-lg leading-relaxed max-w-lg"
            >
              JOE Technologies builds high-performance apps, websites, digital systems,
              and AI-powered solutions for businesses and organizations that need real-world
              production outcomes. Founded by{" "}
              <span className="text-[#00c8ff] font-semibold">Jeffery Onome Emuodafevware</span>{" "}
              — we turn complex ideas into premium digital products that convert, automate, and scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide shadow-xl shadow-[#00c8ff]/25 gap-2 hover:shadow-[#00c8ff]/40 transition-shadow duration-300"
                  data-testid="button-hero-cta-primary"
                >
                  Build With JOE
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-joe-text/15 text-joe-text/75 bg-joe-text/5 hover:bg-joe-text/10 font-semibold tracking-wide gap-2 backdrop-blur-sm"
                  data-testid="button-hero-cta-secondary"
                >
                  <Code2 className="w-4 h-4" />
                  Explore Case Studies
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Smartphone, text: "App Development" },
                { icon: MonitorSmartphone, text: "Web Platforms" },
                { icon: Network, text: "Digital Systems" },
                { icon: Brain, text: "AI Solutions" },
                { icon: Shield, text: "Enterprise-Grade" },
                { icon: Zap, text: "High Performance" },
                { icon: Globe, text: "Global Scale" },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-joe-text/50 text-xs font-mono"
                  style={{ background: "var(--joe-overlay)", border: "1px solid var(--joe-card-border)" }}
                >
                  <Icon className="w-3 h-3 text-[#00c8ff]" />
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6"
              style={{ borderTop: "1px solid var(--joe-card-border)" }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5" data-testid={`stat-${i}`}>
                  <span className="font-heading font-bold text-3xl text-[#00c8ff]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={statsVisible} />
                  </span>
                  <span className="text-joe-text/35 text-xs uppercase tracking-wide font-mono leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-2xl opacity-20 blur-2xl gradient-border-animate"
                style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff, #7c3aed, #00c8ff)" }}
              />

              {!showShowcase ? (
                <div
                  className="relative rounded-xl border overflow-hidden"
                  style={{
                    background: "var(--joe-terminal-bg)",
                    borderColor: "rgba(0,200,255,0.15)",
                    boxShadow: "0 0 60px rgba(0,200,255,0.08), 0 25px 50px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-xs text-white/25 font-mono">joe_platform.ts</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                      <span className="text-xs text-white/20 font-mono">running</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end pt-6 pr-3 gap-0"
                      style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                      {Array.from({ length: Math.max(visibleLines, 1) }).map((_, i) => (
                        <span key={i} className="text-xs font-mono leading-[1.7rem] text-white/15 select-none">{i + 1}</span>
                      ))}
                    </div>

                    <div className="pl-14 pr-6 py-6 font-mono text-sm leading-7 min-h-[280px]">
                      {codeLines.slice(0, visibleLines).map((line, i) => (
                        <div key={i} className={`${line.color} transition-opacity duration-200`}>
                          {line.text || "\u00A0"}
                        </div>
                      ))}
                      {visibleLines < codeLines.length && (
                        <span className="inline-block w-2 h-[18px] bg-[#00c8ff] animate-blink align-middle" />
                      )}
                    </div>
                  </div>

                  <div
                    className="px-4 py-2.5 border-t flex items-center gap-5"
                    style={{ background: "rgba(0,200,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Brain className="w-3 h-3 text-[#00c8ff]" />
                      <span className="text-xs text-white/35 font-mono">AI Enabled</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#c3e88d]" />
                      <span className="text-xs text-white/35 font-mono">Enterprise Grade</span>
                    </div>
                    <div className="ml-auto text-xs text-white/20 font-mono">React · APIs · AI · Cloud</div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ServiceShowcase />
                </motion.div>
              )}

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xl"
                style={{ background: "linear-gradient(135deg, #0066ff, #0044cc)", boxShadow: "0 8px 24px rgba(0,102,255,0.5)" }}
              >
                App Systems
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xl"
                style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", boxShadow: "0 8px 24px rgba(124,58,237,0.5)" }}
              >
                AI Workflows
              </motion.div>
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-5 bottom-16 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xl"
                style={{ background: "linear-gradient(135deg, #00c8ff, #0088bb)", boxShadow: "0 8px 24px rgba(0,200,255,0.4)" }}
              >
                Web Platforms
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link
          href="#trusted"
          className="text-joe-text/25 hover:text-joe-text/50 transition-colors flex flex-col items-center gap-2"
          data-testid="button-scroll-indicator"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(0,200,255,0.2)" }}
          >
            <div className="w-1 h-2 rounded-full bg-[#00c8ff]/50 animate-bounce" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
