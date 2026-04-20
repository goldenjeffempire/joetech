interface JoeLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function JoeLogo({ size = "md", showText = true, className = "" }: JoeLogoProps) {
  const dimensions = {
    sm: { icon: 30, text: "text-sm", sub: "text-[10px]", gap: "gap-2" },
    md: { icon: 36, text: "text-base", sub: "text-[11px]", gap: "gap-2.5" },
    lg: { icon: 44, text: "text-lg", sub: "text-xs", gap: "gap-3" },
  };

  const d = dimensions[size];

  return (
    <div className={`flex items-center ${d.gap} ${className}`}>
      <svg
        width={d.icon}
        height={d.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logo-cyan-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#48F2FB" />
            <stop offset="100%" stopColor="#4EA3BA" />
          </linearGradient>
          <linearGradient id="logo-magenta-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E867EA" />
            <stop offset="100%" stopColor="#b847ba" />
          </linearGradient>
          <linearGradient id="logo-border-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#48F2FB" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#E867EA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#48F2FB" stopOpacity="0.2" />
          </linearGradient>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="2" y="2" width="96" height="96" rx="14" fill="#060A10" stroke="url(#logo-border-grad)" strokeWidth="1.5" />

        <rect x="8" y="8" width="84" height="84" rx="10" fill="none" stroke="#48F2FB" strokeWidth="0.4" strokeOpacity="0.12" />

        <g filter="url(#logo-glow)">
          <text
            x="14"
            y="52"
            fontFamily="'Courier New', Courier, monospace"
            fontWeight="700"
            fontSize="28"
            fill="url(#logo-cyan-grad)"
          >&lt;</text>
          <text
            x="73"
            y="52"
            fontFamily="'Courier New', Courier, monospace"
            fontWeight="700"
            fontSize="22"
            fill="url(#logo-magenta-grad)"
          >/&gt;</text>
        </g>

        <text
          x="50"
          y="54"
          textAnchor="middle"
          fontFamily="'Courier New', Courier, monospace"
          fontWeight="900"
          fontSize="18"
          fill="#ffffff"
          letterSpacing="0.5"
        >JOE</text>

        <line x1="16" y1="62" x2="84" y2="62" stroke="#48F2FB" strokeWidth="0.6" strokeOpacity="0.25" />

        <text
          x="50"
          y="76"
          textAnchor="middle"
          fontFamily="'Courier New', Courier, monospace"
          fontWeight="400"
          fontSize="7"
          fill="#48F2FB"
          fillOpacity="0.55"
          letterSpacing="2"
        >TECH</text>
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-mono font-bold ${d.text} tracking-tight`}>
            <span style={{ color: "#48F2FB" }}>&lt;</span>
            <span className="text-white">JOE</span>
            <span style={{ color: "#E867EA" }}>/&gt;</span>
          </span>
          <span className={`font-mono ${d.sub} tracking-widest uppercase`} style={{ color: "#48F2FB", opacity: 0.65 }}>
            Technologies
          </span>
        </div>
      )}
    </div>
  );
}
