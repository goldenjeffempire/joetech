import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Globe, Brain, Database, Bell, CheckCircle2, Zap, ArrowRight,
  MessageSquare, Users, CreditCard, FileText, Workflow,
  Cpu, Cloud, Mail, Smartphone, BarChart3, Shield
} from "lucide-react";

interface WorkflowStep {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  detail: string;
}

interface WorkflowConfig {
  id: string;
  label: string;
  badge: string;
  badgeColor: string;
  description: string;
  trigger: WorkflowStep;
  process: WorkflowStep[];
  output: WorkflowStep;
}

const WORKFLOWS: WorkflowConfig[] = [
  {
    id: "lead",
    label: "Lead Capture",
    badge: "Sales",
    badgeColor: "#48F2FB",
    description: "Intelligent lead qualification and routing with automated follow-up sequences",
    trigger: {
      id: "form",
      label: "Form Submitted",
      icon: Globe,
      color: "#48F2FB",
      detail: "Contact form detected on website",
    },
    process: [
      { id: "qualify", label: "Qualify Lead", icon: Brain, color: "#E867EA", detail: "Score by budget, industry, intent" },
      { id: "enrich", label: "Enrich Data", icon: Database, color: "#48F2FB", detail: "Append company, role, LinkedIn" },
      { id: "route", label: "Route to CRM", icon: Users, color: "#48F2FB", detail: "Assign to correct sales rep" },
    ],
    output: {
      id: "notify",
      label: "Notified & Tagged",
      icon: Bell,
      color: "#00ff88",
      detail: "Sales alerted · Lead tagged · Drip started",
    },
  },
  {
    id: "order",
    label: "Order Processing",
    badge: "E-commerce",
    badgeColor: "#E867EA",
    description: "End-to-end order automation from payment to delivery confirmation",
    trigger: {
      id: "payment",
      label: "Payment Received",
      icon: CreditCard,
      color: "#48F2FB",
      detail: "Stripe webhook fired: payment_intent.succeeded",
    },
    process: [
      { id: "verify", label: "Verify & Validate", icon: Shield, color: "#E867EA", detail: "Fraud check, inventory confirm" },
      { id: "invoice", label: "Generate Invoice", icon: FileText, color: "#48F2FB", detail: "PDF created, stored in S3" },
      { id: "fulfill", label: "Trigger Fulfillment", icon: Workflow, color: "#f59e0b", detail: "Warehouse system notified" },
    ],
    output: {
      id: "confirm",
      label: "Customer Confirmed",
      icon: Mail,
      color: "#00ff88",
      detail: "Email + SMS sent · Dashboard updated",
    },
  },
  {
    id: "ai",
    label: "AI Inference",
    badge: "AI/ML",
    badgeColor: "#00ff88",
    description: "Real-time AI request handling with model routing and result delivery",
    trigger: {
      id: "request",
      label: "AI Request In",
      icon: MessageSquare,
      color: "#48F2FB",
      detail: "User query via API or chat interface",
    },
    process: [
      { id: "preprocess", label: "Preprocess Input", icon: Cpu, color: "#E867EA", detail: "Tokenize, context window, history" },
      { id: "infer", label: "Model Inference", icon: Brain, color: "#48F2FB", detail: "LLM query · vector search · RAG" },
      { id: "postprocess", label: "Post-process", icon: BarChart3, color: "#f59e0b", detail: "Filter, format, confidence score" },
    ],
    output: {
      id: "response",
      label: "Response Delivered",
      icon: Smartphone,
      color: "#00ff88",
      detail: "Streamed to UI · Logged · Billed",
    },
  },
  {
    id: "monitor",
    label: "Auto-Monitoring",
    badge: "DevOps",
    badgeColor: "#f59e0b",
    description: "Proactive infrastructure monitoring with self-healing automation",
    trigger: {
      id: "anomaly",
      label: "Anomaly Detected",
      icon: BarChart3,
      color: "#48F2FB",
      detail: "CPU spike: 94% — threshold exceeded",
    },
    process: [
      { id: "analyze", label: "Root Cause Analysis", icon: Brain, color: "#E867EA", detail: "Service graph traversal, correlation" },
      { id: "scale", label: "Auto-Scale Triggered", icon: Cloud, color: "#48F2FB", detail: "3 → 6 instances in 28 seconds" },
      { id: "rollback", label: "Check Rollback", icon: Shield, color: "#f59e0b", detail: "Deploy version tested, stable" },
    ],
    output: {
      id: "resolved",
      label: "Incident Resolved",
      icon: CheckCircle2,
      color: "#00ff88",
      detail: "Alert closed · Runbook logged · Team notified",
    },
  },
];

function PulsingConnector({ color, active }: { color: string; active: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="flex items-center justify-center w-8 flex-shrink-0">
      <div className="relative w-full h-px" style={{ background: `${color}25` }}>
        {active && !reducedMotion && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            animate={{ x: ["-4px", "28px"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          />
        )}
        {active && reducedMotion && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        )}
        <ArrowRight
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3"
          style={{ color: `${color}50` }}
        />
      </div>
    </div>
  );
}

function StepCard({
  step,
  delay,
  active,
  isInView,
}: {
  step: WorkflowStep;
  delay: number;
  active: boolean;
  isInView: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex-1 rounded-xl border p-4 min-w-0 relative overflow-hidden transition-all duration-300"
      style={{
        background: active ? `${step.color}10` : "rgba(255,255,255,0.03)",
        borderColor: active ? `${step.color}35` : "rgba(255,255,255,0.07)",
        boxShadow: active ? `0 0 20px ${step.color}15` : "none",
      }}
    >
      {active && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)` }}
        />
      )}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color: step.color }} />
      </div>
      <p className="text-white/75 font-semibold text-sm mb-1 leading-tight">{step.label}</p>
      <p className="text-white/30 text-xs leading-relaxed">{step.detail}</p>
    </motion.div>
  );
}

export default function WorkflowVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  const wf = WORKFLOWS[activeWorkflow];

  useEffect(() => {
    if (!isInView) return;
    setActiveStep(-1);
    const steps = [0, 1, 2, 3, 4];
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((s, i) => {
      timers.push(setTimeout(() => setActiveStep(s), 600 + i * 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [isInView, activeWorkflow]);

  const allSteps: WorkflowStep[] = [wf.trigger, ...wf.process, wf.output];

  return (
    <section ref={ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
          opacity: 0.13,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.07 }}
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
            style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.25)" }}
          >
            <Workflow className="w-3.5 h-3.5 text-[#48F2FB]" />
            <span className="text-[#48F2FB] text-xs font-mono uppercase tracking-widest">Workflow Engine</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text">
            Automation{" "}
            <span style={{
              background: "linear-gradient(135deg, #48F2FB, #E867EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              That Works
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Every pipeline we build flows from trigger to outcome — deterministic, observable, and production-hardened.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {WORKFLOWS.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setActiveWorkflow(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200"
              style={{
                background: activeWorkflow === i ? `${w.badgeColor}15` : "rgba(255,255,255,0.04)",
                color: activeWorkflow === i ? w.badgeColor : "rgba(255,255,255,0.35)",
                border: `1px solid ${activeWorkflow === i ? w.badgeColor + "35" : "rgba(255,255,255,0.08)"}`,
              }}
              data-testid={`workflow-tab-${w.id}`}
            >
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${w.badgeColor}20`, color: w.badgeColor }}
              >
                {w.badge}
              </span>
              {w.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorkflow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "rgba(10,15,30,0.85)",
              borderColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-white/50 text-sm font-mono">{wf.description}</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                {[
                  { label: "TRIGGER", color: "#48F2FB" },
                  { label: "PROCESS", color: "#E867EA" },
                  { label: "OUTPUT", color: "#00ff88" },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center justify-center gap-2">
                    <div className="h-px flex-1" style={{ background: `${color}20` }} />
                    <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: `${color}60` }}>
                      {label}
                    </span>
                    <div className="h-px flex-1" style={{ background: `${color}20` }} />
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex items-stretch gap-1">
                <StepCard step={wf.trigger} delay={0} active={activeStep >= 0} isInView={isInView} />
                <PulsingConnector color="#48F2FB" active={activeStep >= 1} />
                {wf.process.map((step, i) => (
                  <span key={step.id} className="contents">
                    <StepCard step={step} delay={0.05 * (i + 1)} active={activeStep >= i + 1} isInView={isInView} />
                    {i < wf.process.length - 1 && <PulsingConnector color={step.color} active={activeStep >= i + 2} />}
                  </span>
                ))}
                <PulsingConnector color="#48F2FB" active={activeStep >= wf.process.length + 1} />
                <StepCard step={wf.output} delay={0.2} active={activeStep >= wf.process.length + 1} isInView={isInView} />
              </div>

              <div className="flex lg:hidden flex-col gap-3">
                {allSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id}>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-300"
                        style={{
                          background: activeStep >= i ? `${step.color}10` : "rgba(255,255,255,0.02)",
                          borderColor: activeStep >= i ? `${step.color}30` : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: step.color }} />
                        </div>
                        <div>
                          <p className="text-white/70 text-sm font-medium">{step.label}</p>
                          <p className="text-white/30 text-xs">{step.detail}</p>
                        </div>
                        {activeStep >= i && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0 text-[#00ff88]" />
                        )}
                      </div>
                      {i < allSteps.length - 1 && (
                        <div className="flex justify-center my-1">
                          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 py-3 border-t border-white/[0.05] flex items-center gap-3">
              {[
                { label: "Execution time", value: "< 2s" },
                { label: "Success rate", value: "99.97%" },
                { label: "Retries on fail", value: "Auto" },
                { label: "Audit log", value: "Full" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-white/20">{label}:</span>
                  <span className="text-[#48F2FB]/60 font-bold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
