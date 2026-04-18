import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import JoeLogo from "@/components/JoeLogo";

const linkRoutes: Record<string, string> = {
  "About": "/about",
  "Why Us": "/why-us",
  "Case Studies": "/portfolio",
  "Process": "/process",
  "Tech Stack": "/tech-stack",
  "FAQ": "/faq",
  "Contact": "/contact",
  "App Development": "/services/app-development",
  "Website Design": "/services/website-design",
  "Automation Systems": "/services/automation",
  "UI/UX Design": "/services/uiux-design",
  "AI & Machine Learning": "/services/custom-ai",
  "Digital Systems": "/services/full-stack",
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Cookie Policy": "/cookies",
};

const footerLinks = {
  Services: ["App Development", "Website Design", "Automation Systems", "UI/UX Design", "AI & Machine Learning", "Digital Systems"],
  Company: ["About", "Why Us", "Case Studies", "Process", "Tech Stack", "FAQ", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{
        background: "var(--joe-bg-solid)",
        borderTop: "1px solid var(--joe-card-border)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)", opacity: 0.04 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "calc(var(--joe-glow-opacity) * 0.5)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-block" data-testid="link-footer-logo">
              <JoeLogo size="md" />
            </Link>

            <p className="text-joe-text/40 text-sm leading-relaxed max-w-xs">
              Enterprise technology partner building apps, websites, automation systems,
              UI/UX experiences, digital platforms, and AI solutions that scale.
            </p>

            <div
              className="flex flex-col gap-2 p-4 rounded-xl border"
              style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
            >
              <p className="text-joe-text/28 text-xs font-mono uppercase tracking-wider mb-1">Founded by</p>
              <p className="text-joe-text/70 text-sm font-semibold">Jeffery Onome Emuodafevware</p>
              <a
                href="https://onome-portfolio-ten.vercel.app/?/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#00c8ff] text-xs font-medium hover:text-[#0066ff] transition-colors"
                data-testid="link-footer-founder-portfolio"
              >
                <ExternalLink className="w-3 h-3" />
                Personal Portfolio
              </a>
            </div>

            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border text-joe-text/35 hover:text-[#00c8ff] hover-elevate transition-colors"
                    style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
                    data-testid={`link-social-${s.label.toLowerCase().split("/")[0].trim()}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}

              <a
                href="mailto:hello@joetechnologies.io"
                className="w-9 h-9 rounded-lg flex items-center justify-center border text-joe-text/35 hover:text-[#00c8ff] hover-elevate transition-colors"
                style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
                aria-label="Email"
                data-testid="link-social-email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/2349017048791"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border text-joe-text/35 hover:text-[#00ff88] hover-elevate transition-colors"
                style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
                aria-label="WhatsApp"
                data-testid="link-social-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-joe-text/60 font-semibold text-xs uppercase tracking-widest font-mono">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    {linkRoutes[link] ? (
                      <Link
                        href={linkRoutes[link]}
                        className="text-joe-text/38 text-sm hover:text-joe-text/70 transition-colors"
                        data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link}
                      </Link>
                    ) : (
                      <span
                        className="text-joe-text/38 text-sm cursor-default"
                        data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--joe-card-border)" }}
        >
          <p className="text-joe-text/25 text-xs">
            &copy; {new Date().getFullYear()} JOE Technologies. All rights reserved. Built with precision, deployed with purpose.
          </p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping opacity-40" />
              </div>
              <span className="text-joe-text/22 text-xs font-mono">All systems operational</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center border text-joe-text/25 hover:text-[#00c8ff] hover-elevate transition-colors"
              style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
              aria-label="Scroll to top"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
