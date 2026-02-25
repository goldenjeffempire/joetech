import { motion } from "framer-motion";
import { Zap, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const footerLinks = {
  Services: [
    "AI Strategy",
    "Custom AI Dev",
    "MLOps",
    "AI Integration",
    "Full-Stack Dev",
    "Advisory",
  ],
  Company: [
    "About",
    "Why Us",
    "Case Studies",
    "Process",
    "Tech Stack",
    "FAQ",
    "Contact",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
  ],
};

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const id = href.toLowerCase().replace(/\s+/g, "-");
    const el = document.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-8 border-t border-white/8 overflow-hidden"
      style={{ background: "#04060d" }}
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-[#00c8ff] to-[#0066ff]">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-wider">
                JOE<span className="text-[#00c8ff]">.</span>Technologies
              </span>
            </div>

            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              AI-driven software engineering consultancy. We architect intelligent systems
              that think, scale, and deliver measurable business results.
            </p>

            <div>
              <p className="text-white/30 text-xs font-mono mb-1">Founded by</p>
              <p className="text-white/65 text-sm font-semibold">Jeffery Onome Emuodafevware</p>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 text-white/40 hover-elevate transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    data-testid={`link-social-${s.label.toLowerCase().split("/")[0].trim()}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-white/70 font-semibold text-sm uppercase tracking-wider font-mono">
                {category}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleNavClick(link)}
                      className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                      data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} JOE Technologies. All rights reserved. Built with precision, deployed with purpose.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-white/25 text-xs">All systems operational</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-white/30 hover-elevate transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
              aria-label="Scroll to top"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
