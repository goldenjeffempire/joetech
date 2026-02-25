import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Cpu, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    description: "We start by deeply understanding your business, your data landscape, your current technical stack, and the specific outcomes you need AI to drive. No assumptions — only facts.",
    duration: "1–2 weeks",
    deliverables: ["Technical audit report", "Data readiness assessment", "Opportunity matrix"],
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategy & Architecture",
    description: "We design the full system architecture — from data pipelines to model selection to API design — before writing a single line of production code. Aligned, documented, reviewed.",
    duration: "1–2 weeks",
    deliverables: ["System architecture doc", "Tech stack decisions", "Project roadmap"],
  },
  {
    number: "03",
    icon: Cpu,
    title: "Development & Testing",
    description: "Iterative build cycles with constant testing. We develop in sprints, show progress weekly, and maintain rigorous quality standards for every component we ship.",
    duration: "4–16 weeks",
    deliverables: ["Working software", "Test suite", "Documentation"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deployment & Launch",
    description: "Production deployment with CI/CD pipelines, monitoring dashboards, alerting, and runbooks. Your system launches with everything needed to operate confidently at scale.",
    duration: "1–2 weeks",
    deliverables: ["Live deployment", "Monitoring setup", "Runbooks"],
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Optimization & Growth",
    description: "Post-launch, we monitor model performance, track business metrics, and iterate continuously — retraining, fine-tuning, and improving as your usage grows.",
    duration: "Ongoing",
    deliverables: ["Performance reports", "Model updates", "Scalability roadmap"],
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function ProcessSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07091a 0%, #060a15 100%)" }}>
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(0,200,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">How We Work</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mt-3">
            Our Proven
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Engineering Process
            </span>
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
            Every project follows a battle-tested methodology that eliminates surprises
            and maximizes the chance of meaningful impact.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line connector (desktop) */}
          <div className="absolute left-[39px] top-6 bottom-6 w-px bg-gradient-to-b from-[#00c8ff]/40 via-[#0066ff]/30 to-transparent hidden lg:block" />

          <div className="flex flex-col gap-6">
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
                  {/* Step indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className="w-20 h-20 rounded-xl flex items-center justify-center border relative"
                      style={{
                        background: "rgba(0,200,255,0.08)",
                        borderColor: "rgba(0,200,255,0.25)",
                      }}
                    >
                      <Icon className="w-7 h-7 text-[#00c8ff]" />
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)" }}
                      >
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 p-6 rounded-xl border border-white/8 hover-elevate mb-0"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[#00c8ff]/60 font-mono text-xs font-medium">{step.number}</span>
                        <h3 className="font-heading font-bold text-white text-xl mt-0.5">{step.title}</h3>
                      </div>
                      <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#00c8ff]/20 text-[#00c8ff] bg-[#00c8ff]/8 w-fit whitespace-nowrap flex-shrink-0">
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-white/55 text-sm leading-relaxed mb-4">{step.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 font-mono">
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
  );
}
