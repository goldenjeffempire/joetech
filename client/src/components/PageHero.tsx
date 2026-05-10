import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
  "data-testid-label"?: string;
  "data-testid-title"?: string;
  "data-testid-subtitle"?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  label,
  title,
  highlightedTitle,
  subtitle,
  accentColor = "#48F2FB",
  size = "md",
  children,
  ...testIds
}: PageHeroProps) {
  const paddingClass = size === "lg"
    ? "pt-28 pb-20 lg:pt-36 lg:pb-24"
    : size === "sm"
    ? "pt-24 pb-12 lg:pt-28 lg:pb-14"
    : "pt-24 pb-16 lg:pt-32 lg:pb-20";

  const titleClass = size === "lg"
    ? "text-4xl sm:text-5xl lg:text-7xl"
    : size === "sm"
    ? "text-3xl sm:text-4xl lg:text-5xl"
    : "text-3xl sm:text-4xl lg:text-6xl";

  return (
    <section
      className={`relative ${paddingClass} overflow-hidden`}
      style={{ background: "var(--joe-bg-hero)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-[100px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 70%)`, opacity: 0.09 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-5"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: `${accentColor}10`,
              border: `1px solid ${accentColor}25`,
            }}
            data-testid={testIds["data-testid-label"]}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accentColor }}>
              {label}
            </span>
          </div>

          <h1
            className={`font-heading font-bold ${titleClass} text-joe-text leading-tight`}
            data-testid={testIds["data-testid-title"]}
          >
            {title}{" "}
            {highlightedTitle && (
              <span
                style={{
                  background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highlightedTitle}
              </span>
            )}
          </h1>

          {subtitle && (
            <p
              className="text-joe-text/50 text-lg max-w-2xl leading-relaxed"
              data-testid={testIds["data-testid-subtitle"]}
            >
              {subtitle}
            </p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
