import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Smartphone, MonitorSmartphone, Workflow, Palette, Brain,
  CheckCircle2, ArrowRight, ChevronRight, RefreshCw, Zap,
  Clock, Layers, Code2, Shield, BarChart3,
  Bell, CreditCard, Search, Users, Database, Globe,
  MessageSquare, Lock, Eye, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SERVICES = [
  {
    id: "app-development",
    name: "App Development",
    icon: Smartphone,
    accent: "#00c8ff",
    basePrice: 3500,
    baseWeeks: 6,
    description: "Web & mobile applications",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    features: [
      { id: "auth", label: "User Authentication", price: 500, weeks: 1, icon: Lock },
      { id: "dashboard", label: "Admin Dashboard", price: 800, weeks: 2, icon: BarChart3 },
      { id: "payments", label: "Payment Integration", price: 700, weeks: 2, icon: CreditCard },
      { id: "notifications", label: "Push Notifications", price: 450, weeks: 1, icon: Bell },
      { id: "api", label: "REST API", price: 600, weeks: 2, icon: Code2 },
      { id: "search", label: "Advanced Search", price: 550, weeks: 1, icon: Search },
      { id: "roles", label: "Role-Based Access", price: 650, weeks: 2, icon: Shield },
      { id: "analytics", label: "In-App Analytics", price: 700, weeks: 2, icon: Eye },
    ],
  },
  {
    id: "website-design",
    name: "Website Design",
    icon: MonitorSmartphone,
    accent: "#0066ff",
    basePrice: 1800,
    baseWeeks: 3,
    description: "Brand sites & digital storefronts",
    stack: ["Next.js", "TailwindCSS", "Framer Motion", "CMS", "SEO"],
    features: [
      { id: "cms", label: "CMS Integration", price: 500, weeks: 1, icon: Settings },
      { id: "blog", label: "Blog / News Module", price: 400, weeks: 1, icon: Globe },
      { id: "forms", label: "Contact & Lead Forms", price: 300, weeks: 1, icon: MessageSquare },
      { id: "seo", label: "Full SEO Setup", price: 600, weeks: 1, icon: Search },
      { id: "ecom", label: "E-commerce Store", price: 1200, weeks: 3, icon: CreditCard },
      { id: "animations", label: "Custom Animations", price: 700, weeks: 2, icon: Zap },
      { id: "analytics", label: "Analytics Dashboard", price: 450, weeks: 1, icon: BarChart3 },
      { id: "multilang", label: "Multi-language Support", price: 600, weeks: 2, icon: Globe },
    ],
  },
  {
    id: "automation",
    name: "Automation Systems",
    icon: Workflow,
    accent: "#7c3aed",
    basePrice: 2500,
    baseWeeks: 4,
    description: "Workflow & process automation",
    stack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL"],
    features: [
      { id: "workflows", label: "Custom Workflow Engine", price: 800, weeks: 2, icon: Workflow },
      { id: "integrations", label: "Third-party Integrations", price: 700, weeks: 2, icon: Code2 },
      { id: "reporting", label: "Automated Reporting", price: 600, weeks: 2, icon: BarChart3 },
      { id: "triggers", label: "Event Triggers & Rules", price: 550, weeks: 1, icon: Bell },
      { id: "scheduling", label: "Task Scheduling", price: 450, weeks: 1, icon: Clock },
      { id: "monitoring", label: "Real-time Monitoring", price: 700, weeks: 2, icon: Eye },
      { id: "datasyncs", label: "Data Sync Pipelines", price: 900, weeks: 3, icon: Database },
      { id: "alerts", label: "Smart Alerting System", price: 500, weeks: 1, icon: Bell },
    ],
  },
  {
    id: "uiux-design",
    name: "UI/UX Design",
    icon: Palette,
    accent: "#f59e0b",
    basePrice: 1500,
    baseWeeks: 3,
    description: "Product interfaces & design systems",
    stack: ["Figma", "Framer", "Design System", "Prototyping", "Testing"],
    features: [
      { id: "research", label: "User Research", price: 600, weeks: 2, icon: Users },
      { id: "wireframes", label: "Wireframes & Flows", price: 500, weeks: 1, icon: Layers },
      { id: "designsys", label: "Design System", price: 900, weeks: 3, icon: Palette },
      { id: "prototype", label: "Interactive Prototype", price: 700, weeks: 2, icon: Eye },
      { id: "testing", label: "Usability Testing", price: 600, weeks: 2, icon: CheckCircle2 },
      { id: "accessibility", label: "Accessibility Audit", price: 500, weeks: 1, icon: Shield },
      { id: "mobile", label: "Mobile UX Design", price: 700, weeks: 2, icon: Smartphone },
      { id: "branding", label: "Brand Identity System", price: 800, weeks: 2, icon: Globe },
    ],
  },
  {
    id: "custom-ai",
    name: "AI & Machine Learning",
    icon: Brain,
    accent: "#00ff88",
    basePrice: 5000,
    baseWeeks: 8,
    description: "Intelligent systems & AI integration",
    stack: ["Python", "PyTorch", "LangChain", "FastAPI", "Vector DB"],
    features: [
      { id: "chatbot", label: "AI Chatbot / Assistant", price: 1200, weeks: 3, icon: MessageSquare },
      { id: "nlp", label: "NLP Processing Engine", price: 1500, weeks: 4, icon: Brain },
      { id: "prediction", label: "Predictive Analytics", price: 1800, weeks: 5, icon: BarChart3 },
      { id: "automation", label: "AI Workflow Automation", price: 1400, weeks: 4, icon: Workflow },
      { id: "search", label: "Semantic Search", price: 1100, weeks: 3, icon: Search },
      { id: "vision", label: "Computer Vision", price: 2000, weeks: 5, icon: Eye },
      { id: "rag", label: "RAG Knowledge System", price: 1600, weeks: 4, icon: Database },
      { id: "agents", label: "AI Agent Framework", price: 2200, weeks: 6, icon: Code2 },
    ],
  },
];

const SCALES = [
  {
    id: "startup",
    label: "Startup",
    description: "Lean MVP — core features, fast to market",
    multiplier: 1.0,
    timeline_add: 0,
    color: "#00c8ff",
    perks: ["MVP scope", "1 round of revisions", "Basic deployment"],
  },
  {
    id: "business",
    label: "Business",
    description: "Full-featured — team workflows, integrations",
    multiplier: 1.65,
    timeline_add: 2,
    color: "#0066ff",
    perks: ["Full feature set", "3 rounds of revisions", "Cloud deployment"],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Custom scale — white-glove support & SLA",
    multiplier: 2.5,
    timeline_add: 4,
    color: "#7c3aed",
    perks: ["Unlimited revisions", "Dedicated support", "SLA + monitoring"],
  },
];

const STEPS = ["Service", "Features", "Scale", "Results"];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 transition-all duration-300"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300"
              style={{
                background: i <= currentStep ? "#00c8ff" : "rgba(255,255,255,0.06)",
                color: i <= currentStep ? "#000" : "rgba(255,255,255,0.3)",
                border: i === currentStep ? "2px solid #00c8ff" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: i === currentStep ? "0 0 14px rgba(0,200,255,0.5)" : "none",
              }}
            >
              {i < currentStep ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className="text-xs font-mono hidden sm:block transition-colors duration-300"
              style={{ color: i === currentStep ? "#00c8ff" : i < currentStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)" }}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="h-px w-6 sm:w-10 transition-all duration-500"
              style={{ background: i < currentStep ? "#00c8ff40" : "rgba(255,255,255,0.08)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServiceBuilderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedScale, setSelectedScale] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.id === selectedService);
  const scale = SCALES.find((s) => s.id === selectedScale);


  function reset() {
    setStep(0);
    setSelectedService(null);
    setSelectedFeatures([]);
    setSelectedScale(null);
  }

  function toggleFeature(id: string) {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const canProceed =
    (step === 0 && selectedService) ||
    (step === 1) ||
    (step === 2 && selectedScale);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: 0.07 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}
          >
            <Zap className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span className="text-[#7c3aed] text-xs font-mono uppercase tracking-widest">Interactive Builder</span>
          </div>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text">
            Build Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #7c3aed, #00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Custom Solution
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Select your service, pick features, and choose your scale — then connect with a sales rep to get your tailored quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border overflow-hidden"
          style={{
            background: "rgba(10, 15, 30, 0.85)",
            borderColor: "rgba(255,255,255,0.08)",
            boxShadow: "0 0 60px rgba(0,0,0,0.4), 0 0 120px rgba(124,58,237,0.06)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="px-6 pt-6 pb-0 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                Service Configuration Builder
              </span>
              {step > 0 && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs font-mono transition-colors"
                  data-testid="button-builder-reset"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
            <StepIndicator currentStep={step} />
          </div>

          <div className="p-6 lg:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">

              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white/80 font-heading font-semibold text-lg mb-6">
                    What do you need built?
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SERVICES.map((svc) => {
                      const Icon = svc.icon;
                      const selected = selectedService === svc.id;
                      return (
                        <motion.button
                          key={svc.id}
                          onClick={() => setSelectedService(svc.id)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative text-left p-5 rounded-xl border transition-all duration-200"
                          style={{
                            background: selected ? `${svc.accent}12` : "rgba(255,255,255,0.03)",
                            borderColor: selected ? `${svc.accent}50` : "rgba(255,255,255,0.08)",
                            boxShadow: selected ? `0 0 20px ${svc.accent}20` : "none",
                          }}
                          data-testid={`builder-service-${svc.id}`}
                        >
                          {selected && (
                            <div className="absolute top-3 right-3">
                              <CheckCircle2 className="w-4 h-4" style={{ color: svc.accent }} />
                            </div>
                          )}
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                            style={{ background: `${svc.accent}15`, border: `1px solid ${svc.accent}30` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: svc.accent }} />
                          </div>
                          <p className="text-white/85 font-semibold text-sm mb-1">{svc.name}</p>
                          <p className="text-white/35 text-xs">{svc.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 1 && service && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white/80 font-heading font-semibold text-lg">
                        Select your features
                      </h3>
                      <p className="text-white/30 text-sm mt-1">Base package included — add what you need</p>
                    </div>
                    {selectedFeatures.length > 0 && (
                      <div
                        className="text-xs font-mono px-3 py-1.5 rounded-full"
                        style={{ background: `${service.accent}15`, color: service.accent, border: `1px solid ${service.accent}30` }}
                      >
                        {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? "s" : ""} selected
                      </div>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feat) => {
                      const Icon = feat.icon;
                      const selected = selectedFeatures.includes(feat.id);
                      return (
                        <motion.button
                          key={feat.id}
                          onClick={() => toggleFeature(feat.id)}
                          whileHover={{ y: -1 }}
                          className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200"
                          style={{
                            background: selected ? `${service.accent}10` : "rgba(255,255,255,0.03)",
                            borderColor: selected ? `${service.accent}40` : "rgba(255,255,255,0.07)",
                          }}
                          data-testid={`builder-feature-${feat.id}`}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                            style={{
                              background: selected ? `${service.accent}20` : "rgba(255,255,255,0.05)",
                              border: `1px solid ${selected ? service.accent + "40" : "rgba(255,255,255,0.08)"}`,
                            }}
                          >
                            {selected
                              ? <CheckCircle2 className="w-4 h-4" style={{ color: service.accent }} />
                              : <Icon className="w-4 h-4 text-white/30" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/75 text-sm font-medium">{feat.label}</p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white/80 font-heading font-semibold text-lg mb-6">
                    Choose your scale
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {SCALES.map((sc) => {
                      const selected = selectedScale === sc.id;
                      return (
                        <motion.button
                          key={sc.id}
                          onClick={() => setSelectedScale(sc.id)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative text-left p-6 rounded-xl border transition-all duration-200"
                          style={{
                            background: selected ? `${sc.color}12` : "rgba(255,255,255,0.03)",
                            borderColor: selected ? `${sc.color}50` : "rgba(255,255,255,0.08)",
                            boxShadow: selected ? `0 0 24px ${sc.color}18` : "none",
                          }}
                          data-testid={`builder-scale-${sc.id}`}
                        >
                          {selected && (
                            <CheckCircle2 className="absolute top-4 right-4 w-4 h-4" style={{ color: sc.color }} />
                          )}
                          <div
                            className="text-xs font-mono font-bold uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full inline-block"
                            style={{ background: `${sc.color}15`, color: sc.color, border: `1px solid ${sc.color}30` }}
                          >
                            {sc.label}
                          </div>
                          <p className="text-white/55 text-sm leading-relaxed mb-4">{sc.description}</p>
                          <ul className="space-y-1.5">
                            {sc.perks.map((p) => (
                              <li key={p} className="flex items-center gap-2 text-xs text-white/35">
                                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: sc.color }} />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && service && scale && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)" }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#00ff88]" />
                    </div>
                    <div>
                      <p className="text-white/80 font-semibold">Your Configuration is Ready</p>
                      <p className="text-white/35 text-xs font-mono">
                        {service.name} · {scale.label} Scale
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="p-5 rounded-xl border"
                      style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.25)" }}
                    >
                      <Layers className="w-5 h-5 mb-3 text-[#7c3aed]" />
                      <div className="font-heading font-bold text-2xl text-[#7c3aed]">{selectedFeatures.length + 1}</div>
                      <p className="text-white/60 text-sm font-medium mt-1">Features Selected</p>
                      <p className="text-white/25 text-xs font-mono mt-1">Including base package</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="p-5 rounded-xl border"
                      style={{ background: "rgba(0,200,255,0.06)", borderColor: "rgba(0,200,255,0.2)" }}
                    >
                      <MessageSquare className="w-5 h-5 mb-3 text-[#00c8ff]" />
                      <p className="text-white/80 text-sm font-semibold leading-snug">Pricing tailored to your project</p>
                      <p className="text-white/35 text-xs mt-2 leading-relaxed">
                        Exact pricing and timelines depend on specifics. Connect with a sales rep on WhatsApp and we'll give you a precise quote.
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">Recommended Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {service.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-md"
                            style={{
                              background: `${service.accent}10`,
                              color: service.accent,
                              border: `1px solid ${service.accent}25`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">What's Included</p>
                      <ul className="space-y-1.5">
                        {scale.perks.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-xs text-white/50">
                            <CheckCircle2 className="w-3 h-3 text-[#00ff88] flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                        <li className="flex items-center gap-2 text-xs text-white/50">
                          <CheckCircle2 className="w-3 h-3 text-[#00ff88] flex-shrink-0" />
                          Free strategy call included
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border mb-6" style={{ background: "rgba(0,255,136,0.04)", borderColor: "rgba(0,255,136,0.15)" }}>
                    <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">Connect with a Sales Representative</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/2349017078791?text=${encodeURIComponent(`Hi JOE Technologies, I used the Service Builder and I'm interested in a ${service.name} (${scale.label} scale) with ${selectedFeatures.length} add-on feature${selectedFeatures.length !== 1 ? "s" : ""}. I'd like to discuss pricing and timeline.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="button-builder-wa-primary"
                      >
                        <Button className="gap-2 font-semibold text-white border-0 shadow-lg" style={{ background: "linear-gradient(135deg, #25d366, #128c7e)", boxShadow: "0 4px 18px rgba(37,211,102,0.25)" }}>
                          <MessageSquare className="w-4 h-4" />
                          Chat with Jeffery
                        </Button>
                      </a>
                      <a
                        href={`https://wa.me/2348159088343?text=${encodeURIComponent(`Hi JOE Technologies, I used the Service Builder and I'm interested in a ${service.name} (${scale.label} scale) with ${selectedFeatures.length} add-on feature${selectedFeatures.length !== 1 ? "s" : ""}. I'd like to discuss pricing and timeline.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="button-builder-wa-secondary"
                      >
                        <Button variant="outline" className="gap-2 font-semibold border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366]/10 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          Chat with Sales
                        </Button>
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-mono transition-colors"
                    data-testid="button-builder-restart"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Start over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step < 3 && (
            <div className="px-6 lg:px-8 pb-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-white/35 hover:text-white/65 text-sm font-mono transition-colors"
                  data-testid="button-builder-back"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              <Button
                disabled={!canProceed}
                onClick={() => setStep((s) => s + 1)}
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                data-testid="button-builder-next"
              >
                {step === 2 ? "See My Options" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
