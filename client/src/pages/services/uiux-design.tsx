import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import {
  Palette, MousePointer2, Layout, Layers, ArrowRight,
  Eye, Zap, Users, Target, Sparkles, CheckCircle2,
  BarChart3, Code2, Star, Monitor, PenTool, Figma
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#f59e0b";

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

const capabilities = [
  {
    icon: Layout,
    title: "UX Research & User Flows",
    description: "Persona development, user journey mapping, competitive UX audits, card sorting, and flow diagrams that uncover how real users think and move.",
    accent: "#f59e0b",
  },
  {
    icon: PenTool,
    title: "Wireframing & Prototyping",
    description: "Low-fidelity wireframes and interactive high-fidelity prototypes that validate concepts, gather feedback, and reduce engineering rework.",
    accent: "#0066ff",
  },
  {
    icon: Palette,
    title: "Visual Interface Design",
    description: "Pixel-perfect UI screens with intentional hierarchy, accessibility-compliant contrast, motion principles, and premium visual polish.",
    accent: "#7c3aed",
  },
  {
    icon: Layers,
    title: "Design System Engineering",
    description: "Scalable component libraries, token systems, pattern documentation, and Figma handoff specs that keep design and development in sync.",
    accent: "#00c8ff",
  },
  {
    icon: Monitor,
    title: "Responsive & Adaptive Design",
    description: "Multi-breakpoint design that adapts naturally from mobile to ultra-wide — with touch-first interactions and device-specific experience patterns.",
    accent: "#00ff88",
  },
  {
    icon: BarChart3,
    title: "Usability Testing & UX Audits",
    description: "Structured user testing sessions, heuristic evaluations, heat map analysis, and conversion audits to identify and fix friction points.",
    accent: "#ec4899",
  },
];

const metrics = [
  { value: "3.2x", label: "Avg. engagement lift", icon: BarChart3 },
  { value: "< 3", label: "Clicks to conversion", icon: Target },
  { value: "WCAG AA", label: "Accessibility standard", icon: Eye },
  { value: "4.9/5", label: "Client design rating", icon: Star },
];

const deliverables = [
  { label: "Research & Discovery", items: ["User interviews & personas", "Competitor UX analysis", "Information architecture", "User journey mapping"] },
  { label: "Concept & Wireframe", items: ["Lo-fi wireframes", "Interaction concepts", "Prototype for testing", "Stakeholder walkthroughs"] },
  { label: "Visual Design", items: ["Hi-fi screen designs", "Design system tokens", "Icon & illustration set", "Motion & animation spec"] },
  { label: "Handoff & Support", items: ["Figma dev handoff", "Component annotations", "Responsive specs", "QA & design review"] },
];

const techStack = [
  { name: "Figma", color: "#f59e0b" },
  { name: "FigJam", color: "#7c3aed" },
  { name: "Framer", color: "#0066ff" },
  { name: "Lottie", color: "#00c8ff" },
  { name: "Tailwind CSS", color: "#00ff88" },
  { name: "Storybook", color: "#ec4899" },
  { name: "React", color: "#0066ff" },
  { name: "WCAG 2.2", color: "#f59e0b" },
];

const useCases = [
  {
    icon: Palette,
    title: "Designing a product from zero",
    description: "We define the full UX strategy, create the design system, and deliver developer-ready screens — so your product launches with a premium experience built in.",
  },
  {
    icon: Target,
    title: "Fixing low conversion or engagement",
    description: "We audit existing interfaces, identify friction points, and redesign problem areas to dramatically improve user engagement and conversion outcomes.",
  },
  {
    icon: Layers,
    title: "Building a scalable design system",
    description: "We engineer a complete component library in Figma and code — ensuring design consistency across teams, products, and future features.",
  },
];

export default function UIUXDesign() {
  usePageTitle("UI/UX Design");
  const hero = useScrollInView();
  const caps = useScrollInView();
  const cases = useScrollInView();
  const deliver = useScrollInView();
  const tech = useScrollInView();
  const metricsRef = useScrollInView();
  const cta = useScrollInView();

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="absolute inset-0" style={{ opacity: "var(--joe-glow-opacity)", backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: 0.08 }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: 0.07 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 24 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
              <Palette className="w-4 h-4" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Core Service Pillar</span>
            </div>
            <h1 className="font-heading font-bold text-5xl lg:text-6xl text-joe-text mb-5 leading-tight" data-testid="text-uiux-title">
              UI/UX{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #f97316, #7c3aed)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Design
              </span>
            </h1>
            <p className="text-joe-text/55 text-xl max-w-2xl mx-auto leading-relaxed mb-8" data-testid="text-uiux-subtitle">
              User interface and experience engineering for products that feel premium, guide behavior clearly, and make complex systems simple to use.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="text-white border-0 font-semibold tracking-wide gap-2 shadow-xl" style={{ background: `linear-gradient(135deg, ${accent}, #f97316)`, boxShadow: `0 12px 40px ${accent}30` }} data-testid="button-uiux-cta">
                  Start Your Design Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5 gap-2">
                  <Eye className="w-4 h-4" />
                  See Design Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12" style={{ background: "var(--joe-bg-1)", borderBottom: "1px solid var(--joe-card-border-subtle)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  ref={i === 0 ? metricsRef.ref : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={metricsRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`uiux-metric-${i}`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <span className="font-heading font-bold text-2xl lg:text-3xl" style={{ color: accent }}>{m.value}</span>
                  <span className="text-joe-text/40 text-xs uppercase tracking-wide font-mono">{m.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={caps.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={caps.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Capabilities</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Full-Spectrum UI/UX Services</h2>
            <p className="text-joe-text/45 mt-3 max-w-2xl mx-auto">From research to pixel-perfect screens — we engineer digital experiences that are intuitive, accessible, and visually exceptional.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={caps.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="group flex flex-col gap-4 p-7 rounded-xl border hover-elevate transition-all duration-300"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`uiux-capability-${i}`}
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${cap.accent}12`, border: `1px solid ${cap.accent}28` }}>
                    <Icon className="w-5 h-5" style={{ color: cap.accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base leading-snug">{cap.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed flex-1">{cap.description}</p>
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${cap.accent}30, transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={cases.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>When You Need Us</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Common Design Engagements</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  className="flex flex-col gap-4 p-7 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`uiux-usecase-${i}`}
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base">{uc.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{uc.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={deliver.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={deliver.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Design Process</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Phase-by-Phase Deliverables</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={deliver.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-xl border"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`uiux-phase-${i}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-sm">{phase.label}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-joe-text/50">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={tech.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Tools & Standards</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Design Toolchain</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-lg text-sm font-mono font-medium border" style={{ background: `${t.color}10`, borderColor: `${t.color}28`, color: t.color }} data-testid={`uiux-tech-${i}`}>
                {t.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={cta.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cta.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
              <Sparkles className="w-7 h-7" style={{ color: accent }} />
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to Design Something{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #f97316)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Exceptional?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let's create a digital experience your users love and your competitors can't match — from research to pixel-perfect delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="text-white border-0 font-semibold tracking-wide gap-2 shadow-xl" style={{ background: `linear-gradient(135deg, ${accent}, #f97316)`, boxShadow: `0 12px 40px ${accent}25` }} data-testid="button-uiux-cta-bottom">
                  Start Your Design Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5">All Services</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
