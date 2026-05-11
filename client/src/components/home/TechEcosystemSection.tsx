import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiPython, SiPytorch, SiTensorflow, SiDjango, SiFastapi,
  SiPostgresql, SiReact, SiTypescript, SiDocker,
  SiKubernetes, SiAmazonec2, SiOpenai, SiGithub, SiRedis,
} from "react-icons/si";

const techCategories = [
  {
    label: "AI / ML",
    accent: "#48F2FB",
    techs: [
      { Icon: SiPython, name: "Python" },
      { Icon: SiPytorch, name: "PyTorch" },
      { Icon: SiTensorflow, name: "TensorFlow" },
      { Icon: SiOpenai, name: "OpenAI" },
    ],
  },
  {
    label: "Backend",
    accent: "#48F2FB",
    techs: [
      { Icon: SiDjango, name: "Django" },
      { Icon: SiFastapi, name: "FastAPI" },
      { Icon: SiPostgresql, name: "PostgreSQL" },
      { Icon: SiRedis, name: "Redis" },
    ],
  },
  {
    label: "Frontend",
    accent: "#E867EA",
    techs: [
      { Icon: SiReact, name: "React" },
      { Icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    label: "Infrastructure",
    accent: "#00ff88",
    techs: [
      { Icon: SiAmazonec2, name: "AWS" },
      { Icon: SiDocker, name: "Docker" },
      { Icon: SiKubernetes, name: "Kubernetes" },
      { Icon: SiGithub, name: "GitHub" },
    ],
  },
];

export default function TechEcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #E867EA 0%, transparent 70%)", opacity: 0.06 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#E867EA] font-mono text-sm uppercase tracking-widest">Our Stack</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Technology{" "}
            <span style={{
              background: "linear-gradient(135deg, #E867EA, #48F2FB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              We Master
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            A carefully curated stack built for performance, reliability, and scale.
          </p>
        </motion.div>

        <div className="space-y-6">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-xl border"
              style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              data-testid={`tech-category-${ci}`}
            >
              <div className="flex-shrink-0 w-28">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: `${cat.accent}12`, color: cat.accent, border: `1px solid ${cat.accent}25` }}
                >
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                {cat.techs.map(({ Icon, name }, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.2 + ci * 0.1 + ti * 0.06 }}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all duration-200 hover-elevate cursor-default"
                    style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
                    data-testid={`tech-item-${name.toLowerCase()}`}
                  >
                    <Icon
                      className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: cat.accent }}
                    />
                    <span className="text-joe-text/65 text-sm font-mono group-hover:text-joe-text/90 transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link href="/tech-stack">
            <Button
              size="lg"
              variant="outline"
              className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
              data-testid="button-home-techstack-cta"
            >
              View Full Tech Stack
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
