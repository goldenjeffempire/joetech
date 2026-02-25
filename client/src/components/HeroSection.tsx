import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Code2, Brain, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const codeLines = [
  { text: "import torch", color: "text-[#c792ea]" },
  { text: "from transformers import AutoModel", color: "text-[#c792ea]" },
  { text: "", color: "" },
  { text: "class JOEIntelligence:", color: "text-[#82aaff]" },
  { text: '  """AI-first engineering at scale"""', color: "text-[#546e7a]" },
  { text: "", color: "" },
  { text: "  def architect(self, problem):", color: "text-[#82aaff]" },
  { text: "    model = self.understand(problem)", color: "text-white/80" },
  { text: "    solution = self.innovate(model)", color: "text-white/80" },
  { text: "    return self.deliver(solution)", color: "text-[#c3e88d]" },
  { text: "", color: "" },
  { text: "# Building the future, one model at a time", color: "text-[#546e7a]" },
];

const stats = [
  { value: "50+", label: "AI Systems Built" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10x", label: "Avg. Performance Gains" },
  { value: "5+", label: "Years of Expertise" },
];

export default function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < codeLines.length) {
        setVisibleLines(i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #04060d 0%, #070c18 50%, #06091a 100%)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(0,200,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#00c8ff]/10 border border-[#00c8ff]/20 rounded-full px-4 py-2 w-fit"
            >
              <div className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
              <span className="text-[#00c8ff] text-sm font-medium tracking-wider uppercase">
                AI-Driven Engineering
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <h1 className="font-heading font-bold leading-tight text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Engineering
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #00c8ff 0%, #0066ff 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Intelligent
                </span>
                <br />
                Systems
              </h1>
              <p className="text-white/50 text-sm font-mono tracking-widest uppercase">
                that think. that scale. that deliver.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/65 text-lg leading-relaxed max-w-xl"
            >
              JOE Technologies designs and deploys production-grade AI systems for ambitious companies.
              Founded by{" "}
              <span className="text-[#00c8ff] font-semibold">Jeffery Onome Emuodafevware</span>
              {" "}— we turn complex engineering challenges into elegant, intelligent solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => handleNavClick("#contact")}
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide shadow-lg shadow-[#00c8ff]/20 gap-2"
                data-testid="button-hero-cta-primary"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleNavClick("#portfolio")}
                size="lg"
                variant="outline"
                className="border-white/20 text-white/80 bg-white/5 font-semibold tracking-wide gap-2"
                data-testid="button-hero-cta-secondary"
              >
                <Code2 className="w-4 h-4" />
                View Our Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1" data-testid={`stat-${i}`}>
                  <span className="font-heading font-bold text-2xl text-[#00c8ff]">{stat.value}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wide">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Terminal glow */}
              <div className="absolute -inset-1 rounded-xl opacity-30 blur-xl"
                style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)" }} />

              <div className="relative rounded-xl border border-[#00c8ff]/20 overflow-hidden"
                style={{ background: "rgba(7, 12, 28, 0.95)" }}>
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs text-white/30 font-mono">joe_ai.py</span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-relaxed min-h-64">
                  {codeLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className={`${line.color} transition-opacity duration-300`}>
                      {line.text || "\u00A0"}
                    </div>
                  ))}
                  {visibleLines < codeLines.length && (
                    <span className="inline-block w-2 h-4 bg-[#00c8ff] animate-pulse" />
                  )}
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4"
                  style={{ background: "rgba(0,200,255,0.05)" }}>
                  <div className="flex items-center gap-2">
                    <Brain className="w-3 h-3 text-[#00c8ff]" />
                    <span className="text-xs text-white/40 font-mono">AI Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-[#c3e88d]" />
                    <span className="text-xs text-white/40 font-mono">Production Grade</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#c3e88d] animate-pulse" />
                    <span className="text-xs text-white/30 font-mono">Running</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-[#0066ff] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-[#0066ff]/30"
              >
                Python 3.12
              </motion.div>
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-[#7c3aed] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-[#7c3aed]/30"
              >
                PyTorch 2.2
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => handleNavClick("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors flex flex-col items-center gap-2"
        data-testid="button-scroll-indicator"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
