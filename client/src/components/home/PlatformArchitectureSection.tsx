import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Target, Boxes, Bot, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const platformLayers = [
  {
    icon: Target,
    title: "Conversion Strategy",
    description: "Positioning, offer clarity, CTAs, analytics, and journeys built to convert traffic into qualified opportunities.",
    accent: "#48F2FB",
  },
  {
    icon: Boxes,
    title: "Modular Product Systems",
    description: "Reusable frontend patterns, scalable backend services, clean data models, and extensible feature modules.",
    accent: "#48F2FB",
  },
  {
    icon: Bot,
    title: "AI & Automation Layer",
    description: "AI assistants, workflow automation, intelligent search, document processing, and decision-support systems.",
    accent: "#E867EA",
  },
  {
    icon: Lock,
    title: "Enterprise Readiness",
    description: "Secure APIs, resilient architecture, rate limiting, observability, performance, and deployment hardening.",
    accent: "#00ff88",
  },
];

const proofPoints = [
  "Conversion-focused user journeys",
  "Responsive interfaces across devices",
  "API-first backend architecture",
  "AI-ready data and workflow design",
];

export default function PlatformArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 20%, rgba(72,242,251,0.12), transparent 28%), radial-gradient(circle at 85% 60%, rgba(232,103,234,0.12), transparent 30%)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Enterprise Platform Thinking</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text leading-tight">
              Built like a product.
              <br />
              <span className="text-gradient-cyber">Engineered like infrastructure.</span>
            </h2>
            <p className="text-joe-text/55 text-lg leading-relaxed">
              JOE Technologies combines strategy, design, full-stack engineering, automation, and AI into one delivery system. The result is a digital platform that looks premium, loads fast, supports real users, and can evolve as the organization grows.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {proofPoints.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-joe-text/60"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`platform-proof-${i}`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#48F2FB] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="text-white border-0 font-semibold gap-2"
                  style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA)", boxShadow: "0 8px 24px rgba(72,242,251,0.25)" }}
                  data-testid="button-platform-cta"
                >
                  Plan a Digital System
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/process">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
                  data-testid="button-platform-process"
                >
                  See the Delivery Process
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {platformLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="group relative min-h-[230px] rounded-xl border p-6 overflow-hidden hover-elevate"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`platform-layer-${i}`}
                >
                  <div
                    className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: layer.accent }}
                  />
                  <div className="relative z-10 flex flex-col gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${layer.accent}15`, border: `1px solid ${layer.accent}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: layer.accent }} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{layer.title}</h3>
                      <p className="text-joe-text/50 text-sm leading-relaxed">{layer.description}</p>
                    </div>
                    <div className="mt-auto h-1 rounded-full overflow-hidden" style={{ background: "var(--joe-overlay)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${layer.accent}, transparent)` }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${72 + i * 7}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 + i * 0.08 }}
                      />
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
