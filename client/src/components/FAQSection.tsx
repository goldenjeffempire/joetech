import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const faqs = [
  {
    q: "How do we get started?",
    a: "Everything begins with a free 45-minute strategy call. We discuss your goals, current digital landscape, users, workflows, and the outcomes you want the platform to drive. From there, we'll propose a tailored engagement structure — whether that's a focused discovery sprint, website, app, automation build, AI integration, or ongoing advisory.",
  },
  {
    q: "What's a typical project timeline?",
    a: "It depends on scope. A focused website, automation, AI integration, or MVP typically takes 6–10 weeks. A full-scale production platform — with polished UI/UX, backend systems, integrations, analytics, and AI capabilities — usually runs 3–6 months. We always define clear milestones upfront so you know what to expect at every stage.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Absolutely. Some of our best work has been with founders who have a clear vision but limited technical background. We translate complexity into plain language, involve you in every major decision, and ensure you understand what's being built and why. You'll never feel lost in your own project.",
  },
  {
    q: "What engagement models do you offer?",
    a: "We offer three primary models: (1) Project-based — fixed scope, fixed timeline, fixed price; (2) Retainer — dedicated capacity each month for ongoing product, automation, AI, or advisory work; (3) Embedded — a JOE Technologies co-founder or engineer works as part of your internal team. We'll recommend the best fit based on your situation.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Our experience spans FinTech, Healthcare, Legal Tech, E-Commerce, logistics, education, SaaS, and service businesses — industries where strong UX, reliable systems, automation, and intelligent data flows create measurable advantage.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Every project includes a 30-day post-launch support period at no extra cost. After that, we offer ongoing maintenance retainers that cover performance optimization, uptime monitoring, workflow improvements, AI model monitoring, and feature development. Most clients stay with us well beyond the initial build.",
  },
  {
    q: "How do you handle data privacy and security?",
    a: "We take security extremely seriously. All code is written with security best practices, data handling follows least-privilege principles, and for regulated industries (healthcare, finance) we ensure compliance with relevant standards (HIPAA, SOC 2, GDPR). NDAs are signed before any sensitive information is shared.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Yes — this is actually one of our preferred modes. We collaborate effectively with internal teams, providing product, frontend, backend, automation, UX, and AI expertise while your team contributes domain knowledge. We're also happy to do knowledge transfer and upskilling so your team can maintain the systems we build.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border rounded-xl overflow-hidden"
      style={{
        background: open ? "rgba(72,242,251,0.04)" : "var(--joe-card)",
        borderColor: "var(--joe-card-border)",
      }}
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
      >
        <span className="font-heading font-semibold text-joe-text text-base leading-snug">
          {q}
        </span>
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200"
          style={{
            borderColor: open ? "rgba(72,242,251,0.4)" : "var(--joe-card-border)",
            background: open ? "rgba(72,242,251,0.12)" : "var(--joe-overlay)",
          }}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5 text-[#48F2FB]" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-joe-text/50" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5" style={{ borderTop: "1px solid var(--joe-card-border-subtle)" }}>
              <p className="text-joe-text/60 text-sm leading-relaxed pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-1)" }}
    >
      <div
        className="absolute top-0 right-1/4 w-80 h-80 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E867EA 0%, transparent 70%)", opacity: "calc(var(--joe-glow-opacity) * 0.5)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Questions We{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get Asked
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Everything you need to know before starting a conversation with us.
          </p>
        </motion.div>

        {isInView && (
          <div className="flex flex-col gap-3 mb-12">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center p-8 rounded-xl border border-[#48F2FB]/15"
          style={{ background: "rgba(72,242,251,0.04)" }}
        >
          <p className="text-joe-text/70 font-semibold text-lg mb-2">
            Still have questions?
          </p>
          <p className="text-joe-text/40 text-sm mb-5">
            We're happy to answer anything — no question is too early or too small.
          </p>
          <Link href="/contact">
            <Button
              className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold gap-2"
              data-testid="button-faq-cta"
            >
              Ask Us Directly
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
