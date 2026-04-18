import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Jeffery and JOE Technologies transformed our engineering culture. He didn't just deliver an AI system — he leveled up our entire team's understanding of what's possible. The code review platform he built is now the backbone of our development workflow.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Nexus Financial",
    stars: 5,
    initials: "SC",
    accentColor: "#00d4ff",
    result: "73% faster code reviews",
  },
  {
    quote: "The AI system JOE Technologies built for us is now core to how we operate. Patient readmission predictions have saved millions in costs and, more importantly, improved care quality measurably. Jeffery has a rare gift for translating clinical complexity into engineering precision.",
    author: "Dr. Marcus Obi",
    role: "Chief Medical Officer",
    company: "HealthSense Network",
    stars: 5,
    initials: "MO",
    accentColor: "#00ff88",
    result: "$4.6M annual savings",
  },
  {
    quote: "Exceptionally talented. Jeffery thinks in complete systems — from data to deployment to business impact. He embedded with our team, understood our domain deeply, and built something that felt exactly right. The precision and accountability he brings is rare.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "LegalEdge International",
    stars: 5,
    initials: "PS",
    accentColor: "#7b2ee0",
    result: "91% accuracy rate",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-2)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00d4ff] font-mono text-sm uppercase tracking-widest">Client Voices</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Trusted by Leaders.{" "}
            <span className="text-gradient-blue">Proven by Results.</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Don't take our word for it — hear from the decision-makers who've shipped apps, automations, digital platforms, and AI systems with us.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="flex flex-col gap-5 p-7 rounded-xl border hover-elevate cursor-default relative overflow-hidden"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
              data-testid={`testimonial-card-${i}`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${t.accentColor}60, transparent)` }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                </div>
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${t.accentColor}12`,
                    color: t.accentColor,
                    border: `1px solid ${t.accentColor}30`,
                  }}
                >
                  {t.result}
                </span>
              </div>

              <Quote className="w-7 h-7" style={{ color: t.accentColor, opacity: 0.25 }} />

              <p className="text-joe-text/60 text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div
                className="flex items-center gap-4 pt-4"
                style={{ borderTop: "1px solid var(--joe-card-border)" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.accentColor}90, ${t.accentColor}40)`,
                    border: `1px solid ${t.accentColor}35`,
                    boxShadow: `0 0 20px ${t.accentColor}20`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-joe-text font-semibold text-sm">{t.author}</p>
                  <p className="text-joe-text/35 text-xs mt-0.5">{t.role}</p>
                  <p className="text-xs font-mono font-bold mt-0.5" style={{ color: t.accentColor }}>
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-8"
        >
          {[
            "Confidential NDAs Signed",
            "Results-Based Engagements",
            "Long-Term Partnerships",
            "100% Reference Available",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-joe-text/30 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/50" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
