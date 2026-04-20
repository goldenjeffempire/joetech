import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Smartphone, MonitorSmartphone, Workflow, Palette, Brain, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ThemeToggle";
import JoeLogo from "@/components/JoeLogo";

const serviceItems = [
  {
    label: "App Development",
    href: "/services/app-development",
    accent: "#48F2FB",
    icon: Smartphone,
    desc: "Web & mobile apps, SaaS, portals",
  },
  {
    label: "Website Design & Dev",
    href: "/services/website-design",
    accent: "#4EA3BA",
    icon: MonitorSmartphone,
    desc: "Brand sites, SEO, conversion",
  },
  {
    label: "Automation Systems",
    href: "/services/automation",
    accent: "#E867EA",
    icon: Workflow,
    desc: "Workflows, integrations, reporting",
  },
  {
    label: "UI/UX Design",
    href: "/services/uiux-design",
    accent: "#f59e0b",
    icon: Palette,
    desc: "Interfaces, design systems, UX",
  },
  {
    label: "AI & Machine Learning",
    href: "/services/custom-ai",
    accent: "#00ff88",
    icon: Brain,
    desc: "AI agents, LLMs, ML pipelines",
  },
  {
    label: "Digital Systems",
    href: "/services/full-stack",
    accent: "#E867EA",
    icon: Building2,
    desc: "Dashboards, APIs, enterprise arch",
  },
];

const simpleLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
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

  const isServicesActive = location.startsWith("/services");

  return (
    <>
      <Link
        href="/"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:text-sm"
        style={{ background: "#48F2FB", color: "#060A10" }}
      >
        Skip to main content
      </Link>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
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
            style={{ background: "linear-gradient(90deg, transparent, rgba(72,242,251,0.4), rgba(232,103,234,0.25), transparent)" }}
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
              {simpleLinks.slice(0, 2).map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 ${isActive ? "" : "text-joe-text/55 hover:text-joe-text"}`}
                    style={isActive ? { color: "#48F2FB" } : {}}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg, #48F2FB, #E867EA)" }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 ${isServicesActive ? "" : "text-joe-text/55 hover:text-joe-text"}`}
                  style={isServicesActive ? { color: "#48F2FB" } : {}}
                  aria-expanded={servicesOpen}
                  data-testid="button-nav-services-dropdown"
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  {isServicesActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #48F2FB, #E867EA)" }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl border overflow-hidden shadow-2xl"
                      style={{
                        background: "var(--joe-nav-bg)",
                        borderColor: "var(--joe-nav-border)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        width: "560px",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(72,242,251,0.08)",
                      }}
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-joe-text/30 text-xs font-mono uppercase tracking-[0.25em]">Core Service Pillars</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {serviceItems.map((item, ci) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 hover:bg-joe-text/5"
                                data-testid={`link-nav-service-${ci}`}
                              >
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                  style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}25` }}
                                >
                                  <Icon className="w-4 h-4" style={{ color: item.accent }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-joe-text/80 text-sm font-medium group-hover:text-joe-text transition-colors truncate">{item.label}</div>
                                  <div className="text-joe-text/35 text-xs font-mono mt-0.5 truncate">{item.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-2 pt-2 px-2 pb-1" style={{ borderTop: "1px solid var(--joe-divide)" }}>
                          <Link
                            href="/services"
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-joe-text/5 group"
                            data-testid="link-nav-all-services"
                          >
                            <span className="text-sm font-semibold text-gradient-cyber">View All Services</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#48F2FB" }} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {simpleLinks.slice(2).map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 ${isActive ? "" : "text-joe-text/55 hover:text-joe-text"}`}
                    style={isActive ? { color: "#48F2FB" } : {}}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg, #48F2FB, #E867EA)" }}
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
                className="border-0 font-semibold tracking-wide shadow-lg neon-glow-cyan"
                style={{
                  background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                  color: "#060A10",
                  boxShadow: "0 4px 20px rgba(72,242,251,0.25)",
                }}
                data-testid="button-nav-cta"
              >
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 text-joe-text/60 hover:text-joe-text transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2"
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
            <nav aria-label="Mobile navigation" className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ].map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium flex items-center gap-3 ${isActive ? "" : "text-joe-text/70 hover:text-joe-text hover:bg-joe-text/5"}`}
                    style={isActive ? { color: "#48F2FB", background: "rgba(72,242,251,0.07)" } : {}}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#48F2FB" }} />}
                    {link.label}
                  </Link>
                );
              })}

              <div>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium flex items-center gap-3 ${isServicesActive ? "" : "text-joe-text/70 hover:text-joe-text hover:bg-joe-text/5"}`}
                  style={isServicesActive ? { color: "#48F2FB", background: "rgba(72,242,251,0.07)" } : {}}
                  data-testid="link-mobile-services"
                >
                  {isServicesActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#48F2FB" }} />}
                  Services
                </Link>
                <div className="ml-4 pl-4 flex flex-col gap-0.5 mt-1 mb-1" style={{ borderLeft: "1px solid var(--joe-divide)" }}>
                  {serviceItems.map((item, ci) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-md text-joe-text/50 hover:text-joe-text text-xs transition-colors"
                        data-testid={`link-mobile-service-${ci}`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.accent }} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
              ].map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors text-sm font-medium flex items-center gap-3 ${isActive ? "" : "text-joe-text/70 hover:text-joe-text hover:bg-joe-text/5"}`}
                    style={isActive ? { color: "#48F2FB", background: "rgba(72,242,251,0.07)" } : {}}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#48F2FB" }} />}
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 pb-2">
                <Button
                  asChild
                  className="w-full border-0 font-semibold"
                  style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA)", color: "#060A10" }}
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
