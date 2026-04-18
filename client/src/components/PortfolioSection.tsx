import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, TrendingUp, Clock, Users, Zap, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ALL_TAG = "All";

const caseStudies = [
  {
    tag: "App Development",
    tagColor: "#00c8ff",
    category: "App Development",
    title: "Enterprise Operations App",
    client: "Growing Service Organization",
    description: "Built a high-performance internal operations platform with role-based dashboards, automated reporting, team workflows, and AI-assisted task routing that unified all daily operations.",
    stack: ["React", "Django", "PostgreSQL", "Python", "CodeLlama"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster operations" },
      { icon: TrendingUp, value: "91%", label: "Process accuracy" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#00c8ff",
  },
  {
    tag: "AI & Machine Learning",
    tagColor: "#00ff88",
    category: "AI & ML",
    title: "Intelligent Customer Workflow Engine",
    client: "Multi-location Business Network",
    description: "Designed an AI-powered digital system that captures leads, qualifies requests, routes work to teams, and surfaces performance insights in real time.",
    stack: ["Python", "scikit-learn", "BERT", "FastAPI", "PostgreSQL", "AWS"],
    metrics: [
      { icon: TrendingUp, value: "91%", label: "Prediction accuracy" },
      { icon: Users, value: "38%", label: "Cost reduction" },
      { icon: Clock, value: "$4.6M", label: "Annual savings" },
    ],
    accent: "#00ff88",
  },
  {
    tag: "Website Design",
    tagColor: "#0066ff",
    category: "Website Design",
    title: "Premium Growth Website System",
    client: "B2B Services Company",
    description: "Launched a premium brand website with conversion-focused content, fast page transitions, reusable sections, SEO metadata, and a full contact funnel.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Vite"],
    metrics: [
      { icon: Zap, value: "98", label: "Lighthouse score" },
      { icon: Clock, value: "< 3s", label: "Load time" },
      { icon: TrendingUp, value: "Top 3", label: "SEO ranking" },
    ],
    accent: "#0066ff",
  },
  {
    tag: "AI & Machine Learning",
    tagColor: "#7c3aed",
    category: "AI & ML",
    title: "Legal Document Intelligence Platform",
    client: "Legal Technology Firm",
    description: "Built an NLP pipeline that extracts, classifies, and routes information from legal contracts and documents, eliminating manual review bottlenecks.",
    stack: ["Python", "RoBERTa", "GPT-4", "Django", "Elasticsearch", "GCP"],
    metrics: [
      { icon: Zap, value: "99.2%", label: "Extraction accuracy" },
      { icon: Clock, value: "85%", label: "Time savings" },
      { icon: TrendingUp, value: "50k+", label: "Docs processed" },
    ],
    accent: "#7c3aed",
  },
  {
    tag: "Automation Systems",
    tagColor: "#f59e0b",
    category: "Automation",
    title: "AI-Powered Customer Support Automation",
    client: "Customer Support Organization",
    description: "Built an intelligent assistant that understands customer questions, retrieves business knowledge, drafts responses, and escalates complex cases to the right team.",
    stack: ["Python", "LangChain", "GPT-4", "FastAPI", "React", "Shopify API"],
    metrics: [
      { icon: TrendingUp, value: "78%", label: "Support automated" },
      { icon: Users, value: "42%", label: "Conversion lift" },
      { icon: Clock, value: "4.8/5", label: "Satisfaction score" },
    ],
    accent: "#f59e0b",
  },
  {
    tag: "UI/UX Design",
    tagColor: "#ec4899",
    category: "UI/UX Design",
    title: "SaaS Dashboard Design System",
    client: "Enterprise SaaS Platform",
    description: "Designed a comprehensive UI design system and product UX for a complex SaaS dashboard serving 50+ user roles, reducing onboarding time and support tickets.",
    stack: ["Figma", "React", "TypeScript", "Storybook", "Tailwind", "Framer"],
    metrics: [
      { icon: TrendingUp, value: "3.2x", label: "Engagement lift" },
      { icon: Users, value: "60%", label: "Onboarding faster" },
      { icon: Clock, value: "4.9/5", label: "Design rating" },
    ],
    accent: "#ec4899",
  },
];

const filterTabs = [
  ALL_TAG,
  "App Development",
  "Website Design",
  "Automation",
  "UI/UX Design",
  "AI & ML",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function PortfolioSection() {
  const { ref, isInView } = useScrollInView();
  const [activeFilter, setActiveFilter] = useState(ALL_TAG);

  const filtered = activeFilter === ALL_TAG
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeFilter);

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
          className="text-center mb-10"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Digital Products That Deliver{" "}
            <span className="text-gradient-blue">Real Results</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            Production apps, websites, AI systems, and automation workflows that improve speed, conversion, and operational performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-1.5 mr-2 text-joe-text/25">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-xs font-mono uppercase tracking-widest">Filter</span>
          </div>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
              style={activeFilter === tab ? {
                background: "linear-gradient(135deg, #00c8ff20, #0066ff20)",
                borderColor: "#00c8ff50",
                color: "#00c8ff",
              } : {
                background: "var(--joe-overlay)",
                borderColor: "var(--joe-card-border)",
                color: "var(--joe-text-muted)",
              }}
              data-testid={`filter-tab-${tab.toLowerCase().replace(/[^a-z]/g, "-")}`}
            >
              {tab}
              {tab !== ALL_TAG && (
                <span className="ml-1.5 text-xs opacity-50">
                  {caseStudies.filter(cs => cs.category === tab).length}
                </span>
              )}
              {tab === ALL_TAG && (
                <span className="ml-1.5 text-xs opacity-50">{caseStudies.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <motion.div
                key={cs.title}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col gap-0 rounded-xl border overflow-visible hover-elevate relative"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`portfolio-card-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${cs.accent}70, transparent)` }}
                />

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
                      <span className="text-joe-text/30 text-xs truncate">{cs.client}</span>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-joe-text/15 group-hover:text-joe-text/45 transition-colors flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-xl mb-2">{cs.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{cs.description}</p>
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
                        <span className="text-joe-text/35 text-xs">{metric.label}</span>
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
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-joe-text/35 font-mono text-sm">No case studies in this category yet.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-joe-text/35 text-sm mb-5">
            Ready to become our next success story?
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 shadow-lg shadow-[#00c8ff]/15"
              data-testid="button-portfolio-cta"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
