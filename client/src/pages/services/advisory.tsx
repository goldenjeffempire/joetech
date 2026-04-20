import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Lightbulb, Users, Search, UserPlus, Sparkles, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#E867EA";

const included = [
  {
    icon: Users,
    title: "Fractional CTO Services",
    description: "Hands-on technical leadership for startups and scale-ups — without the full-time commitment. Strategy, execution, and team management on your terms.",
  },
  {
    icon: Search,
    title: "Technical Due Diligence",
    description: "Comprehensive audits of codebases, architectures, and engineering processes for investors, acquirers, and leadership teams making critical decisions.",
  },
  {
    icon: UserPlus,
    title: "Team Building & Hiring",
    description: "Defining roles, structuring engineering orgs, running technical interviews, and building high-performing teams from the ground up.",
  },
  {
    icon: Sparkles,
    title: "AI Transformation Strategy",
    description: "Guiding organizations through their AI journey — identifying opportunities, selecting the right tools, and creating a phased adoption plan.",
  },
  {
    icon: FileCheck,
    title: "Architecture Reviews",
    description: "Deep dives into existing systems to identify technical debt, scalability bottlenecks, and security risks — with actionable remediation plans.",
  },
];

const useCases = [
  {
    title: "Preparing for a funding round",
    description: "Investors want to see a solid technical foundation. We help you document your architecture, clean up tech debt, and present your engineering story with confidence.",
  },
  {
    title: "Hiring your first engineering team",
    description: "From defining the right roles and levels to running technical interviews, we help you build the engineering team that will take your product to the next stage.",
  },
  {
    title: "Evaluating an acquisition target's technology",
    description: "Thorough technical due diligence — assessing code quality, infrastructure, scalability, and team capabilities to inform your investment decision.",
  },
];

const techStack = [
  "Strategy",
  "Leadership",
  "Team Building",
  "Due Diligence",
  "Architecture",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function AdvisoryPage() {
  useSeo({
    title: "Technology Advisory & Digital Strategy",
    description: "Technology advisory and digital strategy consulting by JOE Technologies. Expert guidance for digital transformation, technology selection, and AI adoption at every scale.",
    canonical: "/services/advisory",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Technology Advisory",
      "provider": { "@id": "https://joetechnologies.io/#organization" },
      "url": "https://joetechnologies.io/services/advisory",
      "description": "Digital strategy and technology advisory consulting.",
      "serviceType": "Technology Advisory",
      "areaServed": "Worldwide",
    },
  });
  const hero = useScrollInView();
  const includedSection = useScrollInView();
  const useCasesSection = useScrollInView();
  const techSection = useScrollInView();
  const ctaSection = useScrollInView();

  return (
    <div>
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: "var(--joe-bg-hero)" }}
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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
                Service
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4" data-testid="text-advisory-title">
              Digital{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${accent}, #a855f7)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Advisory
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-advisory-subtitle">
              Fractional CTO support, product strategy, system architecture, AI advisory, technical due diligence, team building, and digital transformation planning for ambitious organizations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl border"
            style={{
              background: `${accent}08`,
              borderColor: `${accent}25`,
            }}
          >
            <h2 className="font-heading font-bold text-joe-text text-xl mb-3" data-testid="text-advisory-overview-title">Overview</h2>
            <p className="text-joe-text/60 text-sm leading-relaxed">
              Not every company needs a full-time CTO — but every company making technical decisions
              needs the right guidance. We provide fractional CTO and AI advisory services tailored
              to startups, scale-ups, and enterprises navigating critical inflection points. Whether
              you're preparing for a funding round, hiring your first engineering team, evaluating an
              acquisition target's technology, or charting your AI transformation strategy, we bring
              the experience and objectivity to help you make confident, well-informed decisions.
              Our advisory engagements are flexible, outcome-driven, and designed to deliver
              immediate, tangible value.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={includedSection.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={includedSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Capabilities
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3" data-testid="text-advisory-included-title">
              What's Included
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={includedSection.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col gap-4 p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`advisory-included-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base">{item.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={useCasesSection.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={useCasesSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              When You Need This
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3" data-testid="text-advisory-usecases-title">
              Use Cases
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={useCasesSection.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="p-6 rounded-xl border"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`advisory-usecase-${i}`}
              >
                <h3 className="font-heading font-bold text-joe-text text-base mb-2">{uc.title}</h3>
                <p className="text-joe-text/55 text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={techSection.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={techSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Expertise
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3" data-testid="text-advisory-tech-title">
              Core Competencies
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{
                  background: `${accent}10`,
                  borderColor: `${accent}25`,
                  color: accent,
                }}
                data-testid={`advisory-tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={ctaSection.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaSection.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4" data-testid="text-advisory-cta-title">
              Ready to Get Started?
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let's discuss how our technical advisory services can help you
              make confident, well-informed decisions for your business.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#E867EA] to-[#a855f7] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#E867EA]/15"
                data-testid="button-advisory-cta"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
