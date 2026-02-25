import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { Search, PenTool, Cpu, Rocket, TrendingUp, ArrowRight, GitBranch, MessageCircle, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    description: "We start by deeply understanding your business, your data landscape, your current technical stack, and the specific outcomes you need AI to drive. No assumptions — only facts.",
    duration: "1–2 weeks",
    deliverables: ["Technical audit report", "Data readiness assessment", "Opportunity matrix"],
    details: "This phase includes stakeholder interviews, data source cataloging, infrastructure review, and competitive landscape analysis. We identify quick wins and long-term opportunities, then prioritize based on impact and feasibility.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategy & Architecture",
    description: "We design the full system architecture — from data pipelines to model selection to API design — before writing a single line of production code.",
    duration: "1–2 weeks",
    deliverables: ["System architecture doc", "Tech stack decisions", "Project roadmap"],
    details: "Architecture decisions are documented and reviewed collaboratively. We define data flows, model serving strategies, API contracts, security boundaries, and scalability considerations upfront.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Development & Testing",
    description: "Iterative build cycles with constant testing. We develop in sprints, show progress weekly, and maintain rigorous quality standards for every component we ship.",
    duration: "4–16 weeks",
    deliverables: ["Working software", "Test suite", "Documentation"],
    details: "Each sprint delivers working functionality you can see and test. We write comprehensive unit, integration, and end-to-end tests. Code reviews happen on every pull request, and we maintain CI/CD pipelines throughout.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deployment & Launch",
    description: "Production deployment with CI/CD pipelines, monitoring dashboards, alerting, and runbooks. Your system launches with everything needed to operate confidently at scale.",
    duration: "1–2 weeks",
    deliverables: ["Live deployment", "Monitoring setup", "Runbooks"],
    details: "We handle infrastructure provisioning, security hardening, load testing, and gradual rollout. Monitoring dashboards track system health, model performance, and business metrics from day one.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Optimization & Growth",
    description: "Post-launch, we monitor model performance, track business metrics, and iterate continuously — retraining, fine-tuning, and improving as your usage grows.",
    duration: "Ongoing",
    deliverables: ["Performance reports", "Model updates", "Scalability roadmap"],
    details: "We set up automated monitoring for data drift, model degradation, and performance bottlenecks. Regular reviews ensure the system evolves with your business needs and takes advantage of new capabilities.",
  },
];

const principles = [
  {
    icon: GitBranch,
    title: "Iterative by Design",
    description: "We deliver working software in 2-week sprints. You see progress constantly, not just at the end.",
    accent: "#00c8ff",
  },
  {
    icon: MessageCircle,
    title: "Communication First",
    description: "Weekly demos, shared dashboards, and a dedicated Slack channel. You always know what's happening.",
    accent: "#0066ff",
  },
  {
    icon: Shield,
    title: "Quality Non-Negotiable",
    description: "Every component is tested, reviewed, and documented before it ships. No shortcuts, no tech debt.",
    accent: "#7c3aed",
  },
  {
    icon: BarChart3,
    title: "Metrics-Driven",
    description: "We define success criteria upfront and track them throughout. Decisions are driven by data, not gut feeling.",
    accent: "#00c8ff",
  },
];

export default function ProcessPage() {
  usePageTitle("Our Process");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="absolute inset-0" style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/8 mb-6">
              <Cpu className="w-4 h-4 text-[#00c8ff]" />
              <span className="text-[#00c8ff] text-sm font-mono font-medium">How We Work</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-joe-text leading-tight">
              Our Proven{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Engineering Process
              </span>
            </h1>
            <p className="text-joe-text/55 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Every project follows a battle-tested methodology that eliminates surprises and maximizes the chance of meaningful impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="absolute inset-0" style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-[39px] top-6 bottom-6 w-px bg-gradient-to-b from-[#00c8ff]/40 via-[#0066ff]/30 to-transparent hidden lg:block" />

            <div ref={ref} className="flex flex-col gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                    className="flex gap-6 lg:gap-10"
                    data-testid={`process-step-${i}`}
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center border relative"
                        style={{ background: "rgba(0,200,255,0.08)", borderColor: "rgba(0,200,255,0.25)" }}>
                        <Icon className="w-7 h-7 text-[#00c8ff]" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white"
                          style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)" }}>
                          {i + 1}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-6 rounded-xl border hover-elevate"
                      style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div>
                          <span className="text-[#00c8ff]/60 font-mono text-xs font-medium">{step.number}</span>
                          <h3 className="font-heading font-bold text-joe-text text-xl mt-0.5">{step.title}</h3>
                        </div>
                        <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#00c8ff]/20 text-[#00c8ff] bg-[#00c8ff]/8 w-fit whitespace-nowrap flex-shrink-0">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-joe-text/55 text-sm leading-relaxed mb-3">{step.description}</p>
                      <p className="text-joe-text/40 text-xs leading-relaxed italic mb-4">{step.details}</p>

                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <span key={d} className="text-xs px-2.5 py-1 rounded-md border text-joe-text/50 font-mono"
                            style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Our Principles</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              How We{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Operate
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border text-center hover-elevate"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`principle-card-${i}`}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}28` }}>
                    <Icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{p.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl text-joe-text mb-4">
              Ready to See This Process in Action?
            </h2>
            <p className="text-joe-text/50 mb-8 text-lg">
              Every great project starts with a conversation. Let's talk about what you're building.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold px-8 py-6 text-base gap-2" data-testid="button-process-cta">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
