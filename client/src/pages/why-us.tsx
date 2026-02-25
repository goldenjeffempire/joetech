import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { ShieldCheck, BarChart3, GitMerge, MessageSquare, Layers, HeartHandshake, ArrowRight, Target, Users, Zap, Clock, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "AI-First, Not AI-Augmented",
    description: "We don't bolt AI onto existing workflows. We architect systems where intelligence is the foundation — built for how AI actually works in production, not how it looks in a demo.",
    accent: "#00c8ff",
    detail: "Every system we build starts with the data and model architecture, then works outward to the product layer. This means your AI isn't an afterthought — it's the core value driver.",
  },
  {
    icon: Layers,
    title: "Full-Stack Ownership",
    description: "From raw data ingestion to polished user interfaces, we own the entire stack. No handoffs between agencies. One team that understands how every layer connects.",
    accent: "#0066ff",
    detail: "Having a single team responsible for frontend, backend, data pipelines, and ML infrastructure eliminates integration gaps and communication overhead.",
  },
  {
    icon: BarChart3,
    title: "Outcomes, Not Outputs",
    description: "We don't invoice for code — we're accountable for results. Every engagement defines clear business KPIs upfront, and we track them throughout the project lifecycle.",
    accent: "#7c3aed",
    detail: "Before writing a single line of code, we define measurable success criteria tied to your business objectives. Our progress reports focus on impact, not activity.",
  },
  {
    icon: GitMerge,
    title: "Deep Domain Expertise",
    description: "We've built AI systems across FinTech, Healthcare, Legal, and E-Commerce. We speak your industry's language and understand its constraints, compliance requirements, and opportunities.",
    accent: "#00c8ff",
    detail: "Domain expertise means fewer iterations, better data decisions, and solutions that account for real-world constraints like regulatory compliance and industry-specific edge cases.",
  },
  {
    icon: MessageSquare,
    title: "Radical Transparency",
    description: "Weekly progress updates. Shared dashboards. No hidden blockers. You'll always know exactly where your project stands, what's next, and what risks we're managing.",
    accent: "#0066ff",
    detail: "We use shared project boards, weekly demo sessions, and real-time metrics dashboards. If something isn't working, you'll hear about it before it becomes a problem.",
  },
  {
    icon: HeartHandshake,
    title: "Partners, Not Vendors",
    description: "We're invested in your long-term success. Our best relationships are multi-year partnerships where we continuously improve, scale, and evolve the systems we build together.",
    accent: "#7c3aed",
    detail: "Most of our clients have been with us for over a year. We grow with your business, adapting systems and strategies as your needs evolve.",
  },
];

const stats = [
  { icon: Target, value: "96%", label: "Client Retention Rate" },
  { icon: Users, value: "50+", label: "Projects Delivered" },
  { icon: Zap, value: "3.2x", label: "Average ROI" },
  { icon: Clock, value: "<24h", label: "Average Response Time" },
];

const commitments = [
  "Every project starts with clearly defined success metrics",
  "Weekly progress demos with full visibility into the build",
  "Dedicated Slack channel and direct access to the engineering team",
  "30-day post-launch support included with every engagement",
  "Knowledge transfer and documentation as standard deliverables",
  "Flexible engagement models — project, retainer, or embedded",
];

export default function WhyUsPage() {
  usePageTitle("Why Us");
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
          style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/8 mb-6">
              <Award className="w-4 h-4 text-[#00c8ff]" />
              <span className="text-[#00c8ff] text-sm font-mono font-medium">Our Difference</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-joe-text leading-tight">
              Why Choose{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                JOE Technologies
              </span>
            </h1>
            <p className="text-joe-text/55 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              There are many AI consultancies. Here's what makes us the partner that serious companies choose — and stay with.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="text-center p-6 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`stat-card-${i}`}
                >
                  <Icon className="w-6 h-6 text-[#00c8ff] mx-auto mb-3" />
                  <div className="font-heading font-bold text-3xl text-joe-text">{stat.value}</div>
                  <div className="text-joe-text/45 text-sm mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="absolute top-1/2 right-0 w-96 h-96 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">What Sets Us Apart</span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
              Built Different.{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Engineered to Last.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.08 }}
                  className="group relative flex flex-col gap-4 p-7 rounded-xl border hover-elevate overflow-visible"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`why-us-card-${i}`}
                >
                  <span className="absolute top-5 right-5 font-heading font-bold text-4xl opacity-[0.08] leading-none"
                    style={{ color: item.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}28` }}>
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{item.title}</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed mb-3">{item.description}</p>
                    <p className="text-joe-text/40 text-xs leading-relaxed italic">{item.detail}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Our Promise</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Commitments We Make to{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Every Client
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {commitments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`commitment-${i}`}
              >
                <CheckCircle className="w-5 h-5 text-[#00c8ff] flex-shrink-0 mt-0.5" />
                <span className="text-joe-text/65 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl text-joe-text mb-4">
              Ready to Work with a Team That Delivers?
            </h2>
            <p className="text-joe-text/50 mb-8 text-lg">
              Let's discuss how JOE Technologies can drive measurable impact for your business.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold px-8 py-6 text-base gap-2" data-testid="button-why-us-cta">
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
