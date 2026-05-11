import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { BarChart3, GitBranch, Cpu, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    number: "01",
    title: "Business Discovery",
    description: "Clarify goals, users, bottlenecks, data flows, and the digital product opportunities with the strongest return.",
    icon: BarChart3,
    accent: "#48F2FB",
  },
  {
    number: "02",
    title: "Product Architecture",
    description: "Design UX flows, system modules, data models, APIs, integrations, AI layers, and a scalable deployment plan.",
    icon: GitBranch,
    accent: "#48F2FB",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description: "Engineer the frontend, backend, automations, dashboards, and AI capabilities with clear release milestones.",
    icon: Cpu,
    accent: "#E867EA",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "Ship to production with performance tuning, analytics, monitoring, SEO, and continuous improvement loops.",
    icon: Server,
    accent: "#00ff88",
  },
];

export default function HomeProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Engineering Process</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            From Idea to{" "}
            <span className="text-gradient-cyber">Production System</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            A focused four-phase delivery model that takes complex digital requirements from discovery to deployed, production-ready systems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="relative flex flex-col gap-4 p-6 rounded-xl border hover-elevate cursor-default"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`process-step-${i}`}
              >
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 -right-3 w-6 h-px z-20"
                    style={{ background: `linear-gradient(90deg, ${step.accent}60, transparent)` }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-3xl leading-none" style={{ color: `${step.accent}30` }}>
                    {step.number}
                  </span>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: step.accent }} />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{step.title}</h3>
                  <p className="text-joe-text/45 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/process">
            <Button
              size="lg"
              variant="outline"
              className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
              data-testid="button-home-process-cta"
            >
              See Full Process
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
