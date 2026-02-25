import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["hero", "about", "services", "process", "portfolio", "why-us", "tech-stack", "testimonials", "faq", "contact"];

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, setMobileOpen?: (v: boolean) => void) {
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  e.preventDefault();
  if (setMobileOpen) setMobileOpen(false);
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#00c8ff] focus:text-[#04060d] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070b14]/90 dark:bg-[#070b14]/90 backdrop-blur-xl border-b border-[#00c8ff]/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <a
              href="#hero"
              onClick={(e) => smoothScroll(e)}
              className="flex items-center gap-2 flex-shrink-0"
              aria-label="JOE Technologies — home"
              data-testid="link-logo"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-[#00c8ff] to-[#0066ff] shadow-lg shadow-[#00c8ff]/25">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <span className="font-heading font-bold text-lg text-white dark:text-white tracking-wider">
                JOE<span className="text-[#00c8ff]">.</span>
              </span>
            </a>

            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeId === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => smoothScroll(e)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50 ${
                      isActive
                        ? "text-[#00c8ff]"
                        : "text-white/55 hover:text-white dark:text-white/55 dark:hover:text-white"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#00c8ff]"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide"
                data-testid="button-nav-cta"
              >
                <a href="#contact" onClick={(e) => smoothScroll(e)}>
                  Start a Project
                </a>
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 text-white/60 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#070b14]/97 backdrop-blur-xl border-b border-[#00c8ff]/10"
          >
            <nav
              aria-label="Mobile navigation"
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeId === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => smoothScroll(e, setMobileOpen)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50 flex items-center gap-3 ${
                      isActive
                        ? "text-[#00c8ff] bg-[#00c8ff]/8"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] flex-shrink-0" />
                    )}
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 pb-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold"
                  data-testid="button-mobile-cta"
                >
                  <a href="#contact" onClick={(e) => smoothScroll(e, setMobileOpen)}>
                    Start a Project
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
