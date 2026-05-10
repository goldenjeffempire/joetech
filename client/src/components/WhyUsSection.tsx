import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, BarChart3, GitMerge, MessageSquare, Layers, HeartHandshake } from "lucide-react";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Systems-First, AI-Enabled",
    description:
      "We don't build disconnected screens or bolt AI onto broken workflows. We architect digital systems where product, automation, data, and intelligence work together in production.",
    accent: "#48F2FB",
  },
  {
    icon: Layers,
    title: "Full-Stack Ownership",
    description:
      "From raw data ingestion to polished user interfaces, we own the entire stack. No handoffs between agencies. One team that understands how every layer connects.",
    accent: "#4EA3BA",
  },
  {
    icon: BarChart3,
    title: "Outcomes, Not Outputs",
    description:
      "We don't invoice for code — we're accountable for results. Every engagement defines clear business KPIs upfront, and we track them throughout the project lifecycle.",
    accent: "#E867EA",
  },
  {
    icon: GitMerge,
    title: "Deep Domain Expertise",
    description:
      "We've built apps, websites, automations, dashboards, and AI systems across FinTech, Healthcare, Legal, E-Commerce, SaaS, and service businesses. We understand real-world constraints, compliance requirements, and growth opportunities.",
    accent: "#48F2FB",
  },
  {
    icon: MessageSquare,
    title: "Radical Transparency",
    description:
      "Weekly progress updates. Shared dashboards. No hidden blockers. You'll always know exactly where your project stands, what's next, and what risks we're managing.",
    accent: "#4EA3BA",
  },
  {
    icon: HeartHandshake,
    title: "Partners, Not Vendors",
    description:
      "We're invested in your long-term success. Our best relationships are multi-year partnerships where we continuously improve, scale, and evolve the systems we build together.",
    accent: "#E867EA",
  },
];

export default function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-3)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-96 h-96 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Built Different.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engineered to Last.
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            There are many AI consultancies. Here's what makes JOE Technologies the partner
            that serious companies choose.
          </p>
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
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`why-us-card-${i}`}
              >
                <span
                  className="absolute top-5 right-5 font-heading font-bold text-4xl opacity-[0.08] leading-none"
                  style={{ color: item.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${item.accent}12`,
                    border: `1px solid ${item.accent}28`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.accent }} />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-joe-text text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
