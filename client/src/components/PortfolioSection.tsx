import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, TrendingUp, Clock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const caseStudies = [
  {
    tag: "FinTech",
    tagColor: "#00c8ff",
    title: "Enterprise Operations App",
    client: "Growing Service Organization",
    description: "Built a high-performance internal operations platform with role-based dashboards, automated reporting, team workflows, and AI-assisted task routing.",
    challenge: "Manual reporting and disconnected tools slowed delivery, visibility, and team accountability.",
    solution: "Designed a modular React interface, Django API layer, PostgreSQL data model, and automation logic that unified daily operations in one platform.",
    stack: ["Python", "CodeLlama", "Django", "React", "PostgreSQL"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster reviews" },
      { icon: TrendingUp, value: "91%", label: "Bug catch rate" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#00c8ff",
  },
  {
    tag: "Healthcare",
    tagColor: "#00ff88",
    title: "Intelligent Customer Workflow Engine",
    client: "Multi-location Business Network",
    description: "Designed an AI-powered digital system that captures leads, qualifies requests, routes work to teams, and surfaces performance insights in real time.",
    challenge: "Customer requests were spread across forms, calls, spreadsheets, and manual handoffs.",
    solution: "Created a connected workflow engine with lead intake, qualification rules, team routing, AI summaries, and executive dashboards.",
    stack: ["Python", "scikit-learn", "BERT", "FastAPI", "PostgreSQL", "AWS"],
    metrics: [
      { icon: TrendingUp, value: "91%", label: "Prediction accuracy" },
      { icon: Users, value: "38%", label: "Readmission reduction" },
      { icon: Clock, value: "$4.6M", label: "Annual savings" },
    ],
    accent: "#00ff88",
  },
  {
    tag: "Legal Tech",
    tagColor: "#7c3aed",
    title: "Premium Growth Website System",
    client: "B2B Services Company",
    description: "Launched a premium brand website with conversion-focused content, fast page transitions, reusable sections, SEO metadata, and contact funnel optimization.",
    challenge: "The company had strong services but an outdated website that did not communicate trust or convert visitors.",
    solution: "Rebuilt the web experience around clear messaging, service hierarchy, visual proof, performance optimization, and structured calls to action.",
    stack: ["Python", "RoBERTa", "GPT-4", "Django", "Elasticsearch", "GCP"],
    metrics: [
      { icon: Zap, value: "99.2%", label: "Extraction accuracy" },
      { icon: Clock, value: "85%", label: "Time savings" },
      { icon: TrendingUp, value: "50k+", label: "Docs processed" },
    ],
    accent: "#7c3aed",
  },
  {
    tag: "E-Commerce",
    tagColor: "#ff6b35",
    title: "AI Service Assistant",
    client: "Customer Support Organization",
    description: "Built an intelligent assistant that understands customer questions, retrieves business knowledge, drafts responses, and escalates complex cases to the right team.",
    challenge: "Support volume was growing faster than the team, causing slower replies and inconsistent customer experiences.",
    solution: "Implemented a retrieval-augmented AI workflow with guardrails, response review, handoff routing, analytics, and knowledge-base synchronization.",
    stack: ["Python", "LangChain", "GPT-4", "FastAPI", "React", "Shopify API"],
    metrics: [
      { icon: TrendingUp, value: "42%", label: "Conversion lift" },
      { icon: Users, value: "78%", label: "Support automation" },
      { icon: Clock, value: "4.8/5", label: "User satisfaction" },
    ],
    accent: "#ff6b35",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function PortfolioSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-1)" }}>
      <div className="absolute top-1/2 left-0 w-96 h-96 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />
      <div className="absolute top-1/3 right-0 w-64 h-64 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: "calc(var(--joe-glow-opacity) * 0.6)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Digital Products That Deliver
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Real Results
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            We build production apps, websites, digital systems, and AI workflows that improve speed, visibility, conversion, and operational performance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col gap-0 rounded-xl border overflow-visible hover-elevate"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
              data-testid={`portfolio-card-${i}`}
            >
              <div className="p-6" style={{ borderBottom: "1px solid var(--joe-card-border)" }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${cs.accent}15`,
                        color: cs.accent,
                        border: `1px solid ${cs.accent}30`,
                      }}
                    >
                      {cs.tag}
                    </span>
                    <span className="text-joe-text/30 text-xs">{cs.client}</span>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-joe-text/20 group-hover:text-joe-text/50 transition-colors flex-shrink-0 mt-0.5"
                  />
                </div>
                <h3 className="font-heading font-bold text-joe-text text-xl mb-2">{cs.title}</h3>
                <p className="text-joe-text/55 text-sm leading-relaxed">{cs.description}</p>
              </div>

              <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--joe-divide)" }}>
                {cs.metrics.map((metric, mi) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div key={mi} className="flex flex-col items-center gap-1 p-4 text-center"
                      style={mi < 2 ? { borderRight: "1px solid var(--joe-divide)" } : undefined}>
                      <MetricIcon className="w-4 h-4 mb-1 opacity-40" style={{ color: cs.accent }} />
                      <span className="font-heading font-bold text-xl" style={{ color: cs.accent }}>
                        {metric.value}
                      </span>
                      <span className="text-joe-text/40 text-xs">{metric.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border text-joe-text/45 font-mono"
                    style={{
                      background: "var(--joe-overlay)",
                      borderColor: "var(--joe-card-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-joe-text/40 text-sm mb-5">
            Ready to become our next success story?
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 shadow-lg shadow-[#00c8ff]/15"
              data-testid="button-portfolio-cta"
            >
              Let's Build Something Great
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
