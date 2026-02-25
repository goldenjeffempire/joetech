interface JoeLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function JoeLogo({ size = "md", showText = true, className = "" }: JoeLogoProps) {
  const dimensions = {
    sm: { icon: 28, text: "text-base", gap: "gap-2" },
    md: { icon: 34, text: "text-lg", gap: "gap-2.5" },
    lg: { icon: 42, text: "text-xl", gap: "gap-3" },
  };

  const d = dimensions[size];

  return (
    <div className={`flex items-center ${d.gap} ${className}`}>
      <svg
        width={d.icon}
        height={d.icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="joe-hex-fill" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="100%" stopColor="#0d1e3a" />
          </linearGradient>
          <linearGradient id="joe-hex-stroke" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="50%" stopColor="#d4b85a" />
            <stop offset="100%" stopColor="#a08030" />
          </linearGradient>
          <linearGradient id="joe-circuit" x1="10" y1="50" x2="55" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00c8ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
          <filter id="joe-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M60 8 L104 33 L104 83 L60 108 L16 83 L16 33 Z"
          fill="url(#joe-hex-fill)"
          stroke="url(#joe-hex-stroke)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        <path
          d="M60 22 L92 40.5 L92 77.5 L60 96 L28 77.5 L28 40.5 Z"
          fill="none"
          stroke="url(#joe-hex-stroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.35"
        />

        <g filter="url(#joe-glow)">
          <line x1="8" y1="58" x2="32" y2="58" stroke="url(#joe-circuit)" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="50" x2="26" y2="50" stroke="url(#joe-circuit)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="66" x2="30" y2="66" stroke="url(#joe-circuit)" strokeWidth="1.5" strokeLinecap="round" />

          <line x1="32" y1="58" x2="42" y2="52" stroke="url(#joe-circuit)" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="50" x2="38" y2="46" stroke="url(#joe-circuit)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="66" x2="40" y2="62" stroke="url(#joe-circuit)" strokeWidth="1.5" strokeLinecap="round" />

          <circle cx="42" cy="52" r="3.5" fill="#00c8ff" />
          <circle cx="42" cy="52" r="1.8" fill="#ffffff" />

          <circle cx="38" cy="46" r="2.5" fill="#00c8ff" opacity="0.8" />
          <circle cx="38" cy="46" r="1.2" fill="#ffffff" />

          <circle cx="40" cy="62" r="2.5" fill="#00c8ff" opacity="0.8" />
          <circle cx="40" cy="62" r="1.2" fill="#ffffff" />
        </g>

        <text
          x="72"
          y="56"
          textAnchor="middle"
          fontFamily="Arial Black, Impact, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
        >
          <tspan fill="#c9a84c">J</tspan>
          <tspan fill="#d4b85a">O</tspan>
          <tspan fill="#a08030">E</tspan>
        </text>

        <text
          x="72"
          y="72"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="400"
          fontSize="8.5"
          fill="#8899aa"
          letterSpacing="2"
        >
          TECH
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-bold ${d.text} tracking-wide`}>
            <span className="text-joe-text">JOE</span>
            <span className="text-[#00c8ff]"> Technologies</span>
          </span>
        </div>
      )}
    </div>
  );
}
