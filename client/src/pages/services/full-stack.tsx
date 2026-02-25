import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import { Layers, Monitor, Server, Database, Rocket, ShieldCheck, ArrowRight, Briefcase, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#0066ff";

const includedItems = [
  {
    icon: Monitor,
    title: "Frontend Development",
    description: "Pixel-perfect, responsive interfaces built with React, Next.js, and TypeScript — optimized for performance, accessibility, and user delight.",
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description: "Robust, scalable APIs and server-side logic using Django, FastAPI, or Node.js — designed for reliability and clean architecture.",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Thoughtful schema design, migrations, and query optimization across PostgreSQL, MongoDB, and other data stores to power your application.",
  },
  {
    icon: Rocket,
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, Docker containerization, cloud deployment on AWS/GCP, and infrastructure-as-code for seamless, repeatable releases.",
  },
  {
    icon: ShieldCheck,
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing strategies — unit, integration, and end-to-end — ensuring code quality, reliability, and confidence in every deploy.",
  },
];

const useCases = [
  {
    icon: Briefcase,
    title: "Building a SaaS product from scratch",
    description: "From zero to launch — we architect, build, and deploy your entire SaaS product, handling frontend, backend, billing, auth, and infrastructure so you can focus on growth.",
  },
  {
    icon: RefreshCw,
    title: "Modernizing a legacy application",
    description: "Migrate from outdated stacks to modern frameworks, improve performance, and establish maintainable codebases without disrupting your users or business operations.",
  },
  {
    icon: LayoutDashboard,
    title: "Creating an internal tool or dashboard",
    description: "Purpose-built internal tools, admin panels, and data dashboards that streamline operations, surface insights, and save your team hours of manual work every week.",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Django", "FastAPI", "PostgreSQL", "Docker", "Tailwind CSS",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function FullStackDevelopment() {
  usePageTitle("Full-Stack Development");
  const hero = useScrollInView();
  const included = useScrollInView();
  const cases = useScrollInView();
  const tech = useScrollInView();
  const cta = useScrollInView();

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
                Service
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mb-4" data-testid="text-fullstack-title">
              Full-Stack{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, #00c8ff, ${accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Development
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-fullstack-subtitle">
              End-to-end product development — from polished frontends to scalable backends, databases, and production deployment.
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
            data-testid="text-fullstack-overview"
          >
            <p className="text-joe-text/65 text-sm leading-relaxed">
              We build complete, production-ready applications — not just prototypes. Whether you're launching a new SaaS product, modernizing a legacy system, or creating internal tooling, we handle the entire stack. React and Next.js frontends with pixel-perfect UI, Django and FastAPI backends with clean API design, thoughtful database architecture, containerized deployments, and CI/CD pipelines. Every project is built with maintainability, performance, and scalability in mind from day one.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={included.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={included.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Capabilities</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              What's Included
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={included.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col gap-4 p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`fullstack-included-${i}`}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={cases.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>When You Need Us</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Use Cases
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex flex-col gap-4 p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`fullstack-usecase-${i}`}
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
                  <h3 className="font-heading font-bold text-joe-text text-base">{uc.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{uc.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={tech.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Tools We Use</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Tech Stack
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{
                  background: `${accent}10`,
                  borderColor: `${accent}25`,
                  color: accent,
                }}
                data-testid={`fullstack-tech-${i}`}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={cta.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cta.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, #00c8ff, ${accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Get Started?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let's discuss your project and build something exceptional together — from concept to production.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
                data-testid="button-fullstack-cta"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
