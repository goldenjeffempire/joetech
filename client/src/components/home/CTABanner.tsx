import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustPoints = [
  { label: "Free strategy call", icon: CheckCircle2 },
  { label: "No long-term commitment", icon: Shield },
  { label: "Ship in weeks, not months", icon: Zap },
];

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-3xl pointer-events-none animate-orb-2"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.09 }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none animate-orb-1"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.06 }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E867EA 0%, transparent 70%)", opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(72,242,251,0.08)", border: "1px solid rgba(72,242,251,0.2)" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#48F2FB] animate-pulse" />
            <span className="text-[#48F2FB] text-xs font-mono uppercase tracking-widest">Open to New Projects — 2026</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-6xl text-joe-text leading-tight max-w-4xl">
            Ready to Build Something{" "}
            <span className="text-gradient-cyber">Intelligent?</span>
          </h2>

          <p className="text-joe-text/50 text-lg max-w-2xl leading-relaxed">
            Whether you're launching an app, upgrading a website, automating operations, improving UX,
            or adding AI to an existing system — let's build something that delivers real business results.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-white border-0 font-semibold tracking-wide gap-2 px-10 h-14 text-base transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA)", boxShadow: "0 12px 40px rgba(72,242,251,0.3)" }}
                data-testid="button-home-cta-contact"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-joe-text/15 text-joe-text/75 bg-joe-text/5 hover:bg-joe-text/10 font-semibold tracking-wide gap-2 px-10 h-14 text-base backdrop-blur-sm"
                data-testid="button-home-cta-services"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {trustPoints.map(({ label, icon: Icon }, i) => (
              <div key={i} className="flex items-center gap-2 text-joe-text/40 text-sm">
                <Icon className="w-4 h-4 text-[#48F2FB]/60" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-2 w-full max-w-2xl rounded-2xl border p-6 text-left"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
              boxShadow: "0 0 40px rgba(72,242,251,0.06)",
            }}
            data-testid="cta-testimonial-snippet"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #48F2FB90, #48F2FB40)",
                  border: "1px solid rgba(72,242,251,0.3)",
                  boxShadow: "0 0 20px rgba(72,242,251,0.2)",
                }}
              >
                SC
              </div>
              <div className="flex-1">
                <p className="text-joe-text/60 text-sm leading-relaxed italic">
                  "He didn't just deliver an AI system — he leveled up our entire team's understanding of what's possible. The platform is now the backbone of our development workflow."
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-[#ffd700] text-[#ffd700]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-joe-text/50 text-xs">
                    <span className="text-joe-text/70 font-semibold">Sarah Chen</span> — CTO, Nexus Financial
                  </span>
                  <span
                    className="ml-auto text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(72,242,251,0.1)", color: "#48F2FB", border: "1px solid rgba(72,242,251,0.2)" }}
                  >
                    73% faster reviews
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
