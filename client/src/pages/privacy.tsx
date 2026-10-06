import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Shield, Eye, Database, Lock, Globe, Trash2, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "When you send an enquiry through email or WhatsApp, you may choose to share:",
      "• Full name",
      "• Email address",
      "• Company name (optional)",
      "• Phone / WhatsApp number (optional)",
      "• Service of interest (optional)",
      "• Message content",
      "The project brief form prepares an email or WhatsApp message on your device. This static website does not submit or store form entries. We receive your information only when you choose to send that message through email or WhatsApp. We do not use tracking cookies, analytics tools, or third-party advertising pixels on this website.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "The information you provide is used exclusively to:",
      "• Respond to your project inquiry within 24 hours",
      "• Understand your project needs and prepare a tailored response",
      "• Communicate with you about potential engagement opportunities",
      "We do not sell, rent, trade, or otherwise share your personal information with any third parties for marketing purposes. Your data is never used for automated decision-making or profiling.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information, including:",
      "• No website database or server-side form submission storage",
      "• Secure HTTPS connections for all data transmission",
      "• Access to enquiries received through email or WhatsApp is restricted to authorized JOE Technologies personnel only",
      "While no method of electronic transmission or storage is 100% secure, we take commercially reasonable steps to protect your data.",
    ],
  },
  {
    icon: Globe,
    title: "Third-Party Services",
    content: [
      "Our website includes links to third-party services:",
      "• WhatsApp (Meta Platforms, Inc.) — for direct messaging. When you click a WhatsApp link, you are redirected to WhatsApp's platform, which is governed by Meta's privacy policy.",
      "• Social media links (GitHub, LinkedIn, Twitter/X) — clicking these links takes you to external platforms governed by their own privacy policies.",
      "We are not responsible for the privacy practices of these external services. We encourage you to review their privacy policies before sharing information.",
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention & Your Rights",
    content: [
      "We retain your contact information only for as long as necessary to fulfill the purpose for which it was collected — typically the duration of our communication about a potential project.",
      "You have the right to:",
      "• Request access to the personal data we hold about you",
      "• Request correction of inaccurate personal data",
      "• Request deletion of your personal data",
      "• Withdraw consent for data processing at any time",
      "To exercise any of these rights, contact us at jeffemuodafe124@gmail.com.",
    ],
  },
  {
    icon: Shield,
    title: "GDPR Compliance",
    content: [
      "For users in the European Economic Area (EEA), we process your data based on your explicit consent when you submit our contact form. You may withdraw this consent at any time by contacting us.",
      "We do not transfer your personal data outside of the systems necessary to respond to your inquiry. If international data transfers are required for a specific engagement, we will inform you and obtain your consent beforehand.",
    ],
  },
];

export default function PrivacyPolicy() {
  useSeo({
    title: "Privacy Policy",
    description: "JOE Technologies' Privacy Policy — how we collect, use, and protect your data. GDPR-compliant and committed to your privacy.",
    canonical: "/privacy",
    noindex: true,
  });

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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#48F2FB]" />
              <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4">
              Privacy{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Policy
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto" data-testid="text-privacy-subtitle">
              How JOE Technologies collects, uses, and protects your personal information.
            </p>
            <p className="text-joe-text/30 text-sm font-mono mt-4" data-testid="text-privacy-updated">
              Last updated: February 2026
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
            className="p-6 rounded-xl border mb-10"
            style={{
              background: "rgba(72,242,251,0.04)",
              borderColor: "rgba(72,242,251,0.15)",
            }}
          >
            <p className="text-joe-text/65 text-sm leading-relaxed">
              JOE Technologies ("we", "us", "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your personal
              information when you visit our website and use our contact form. By using our
              website, you agree to the practices described in this policy.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                  className="p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`privacy-section-${i}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-[#48F2FB]" />
                    </div>
                    <h2 className="font-heading font-bold text-joe-text text-lg">{section.title}</h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {section.content.map((line, li) => (
                      <p
                        key={li}
                        className={`text-sm leading-relaxed ${
                          line.startsWith("•") ? "text-joe-text/55 pl-4" : "text-joe-text/60"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 p-6 rounded-xl border flex items-start gap-4"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
            }}
          >
            <Mail className="w-5 h-5 text-[#48F2FB] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-joe-text text-base mb-1">
                Questions About This Policy?
              </h3>
              <p className="text-joe-text/55 text-sm leading-relaxed">
                If you have any questions or concerns about this Privacy Policy or our data
                practices, please contact us at{" "}
                <a
                  href="mailto:jeffemuodafe124@gmail.com"
                  className="text-[#48F2FB] hover:underline"
                  data-testid="link-privacy-email"
                >
                  jeffemuodafe124@gmail.com
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
