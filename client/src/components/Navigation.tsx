import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ThemeToggle";
import JoeLogo from "@/components/JoeLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "App Development", href: "/services/full-stack", accent: "#00c8ff" },
      { label: "Website Development", href: "/services/full-stack", accent: "#0066ff" },
      { label: "Digital Systems Engineering", href: "/services/full-stack", accent: "#7c3aed" },
      { label: "AI-Powered Solutions", href: "/services/custom-ai", accent: "#00ff88" },
      { label: "Systems Integration", href: "/services/ai-integration", accent: "#f59e0b" },
      { label: "Technical Advisory", href: "/services/advisory", accent: "#ec4899" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <>
      <Link
        href="/"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#00c8ff] focus:text-[#04060d] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </Link>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={scrolled ? {
          background: "var(--joe-nav-bg)",
          borderBottom: "1px solid var(--joe-nav-border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.15)",
        } : { background: "transparent" }}
      >
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.3), transparent)" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              href="/"
              className="flex items-center flex-shrink-0"
              aria-label="JOE Technologies — home"
              data-testid="link-logo"
            >
              <JoeLogo size="sm" />
            </Link>

            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = link.children
                  ? location.startsWith("/services")
                  : location === link.href;

                if (link.children) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className={`relative flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50 ${
                          isActive ? "text-[#00c8ff]" : "text-joe-text/55 hover:text-joe-text"
                        }`}
                        aria-expanded={servicesOpen}
                        data-testid="button-nav-services-dropdown"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#00c8ff]"
                            transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-1 w-64 rounded-xl border overflow-hidden shadow-2xl"
                            style={{
                              background: "var(--joe-nav-bg)",
                              borderColor: "var(--joe-nav-border)",
                              backdropFilter: "blur(20px)",
                            }}
                          >
                            {link.children.map((child, ci) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-joe-text/5"
                                style={{
                                  borderBottom: ci < link.children!.length - 1 ? "1px solid var(--joe-divide)" : undefined,
                                }}
                                data-testid={`link-nav-service-${ci}`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: child.accent }} />
                                <span className="text-joe-text/65 hover:text-joe-text transition-colors">{child.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50 ${
                      isActive ? "text-[#00c8ff]" : "text-joe-text/55 hover:text-joe-text"
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
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide shadow-lg shadow-[#00c8ff]/20"
                data-testid="button-nav-cta"
              >
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 text-joe-text/60 hover:text-joe-text transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/50"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 overflow-hidden"
            style={{
              background: "var(--joe-nav-bg)",
              borderBottom: "1px solid var(--joe-nav-border)",
              backdropFilter: "blur(20px)",
            }}
          >
            <nav
              aria-label="Mobile navigation"
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const isActive = link.children
                  ? location.startsWith("/services")
                  : location === link.href;

                if (link.children) {
                  return (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium flex items-center gap-3 ${
                          isActive
                            ? "text-[#00c8ff] bg-[#00c8ff]/8"
                            : "text-joe-text/70 hover:text-joe-text hover:bg-joe-text/5"
                        }`}
                        data-testid="link-mobile-services"
                      >
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00c8ff]" />}
                        {link.label}
                      </Link>
                      <div className="ml-4 pl-4 flex flex-col gap-0.5 mt-1 mb-1" style={{ borderLeft: "1px solid var(--joe-divide)" }}>
                        {link.children.map((child, ci) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2 rounded-md text-joe-text/50 hover:text-joe-text text-xs transition-colors"
                            data-testid={`link-mobile-service-${ci}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium flex items-center gap-3 ${
                      isActive
                        ? "text-[#00c8ff] bg-[#00c8ff]/8"
                        : "text-joe-text/70 hover:text-joe-text hover:bg-joe-text/5"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00c8ff]" />}
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 pb-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold shadow-lg shadow-[#00c8ff]/20"
                  data-testid="button-mobile-cta"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
