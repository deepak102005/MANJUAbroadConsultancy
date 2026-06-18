import React from "react";

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function LogoIcon({ className, ...props }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Luxury Gold Gradient */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="30%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA8C2C" />
        </linearGradient>
        {/* Subtle inner gold glow */}
        <linearGradient id="gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Globe Background Glow / Subtle Fill */}
      <circle cx="50" cy="50" r="41" fill="url(#gold-light)" opacity="0.15" />

      {/* Globe Grid - Latitude and Longitude Lines */}
      {/* Outer Globe Circle */}
      <circle
        cx="50"
        cy="50"
        r="41"
        stroke="url(#gold-grad)"
        strokeWidth="1.5"
        opacity="0.85"
      />
      
      {/* Longitude Arcs */}
      <path
        d="M50 9 V91"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <path
        d="M31 16.5 C42 27 42 73 31 83.5"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.45"
      />
      <path
        d="M69 16.5 C58 27 58 73 69 83.5"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.45"
      />

      {/* Latitude Curves */}
      <path
        d="M9 50 H91"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <path
        d="M13.5 32 Q50 41 86.5 32"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <path
        d="M13.5 68 Q50 59 86.5 68"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Dynamic Travel Orbit Swoosh (Symbolizing flight path, visa guidance & success) */}
      <path
        d="M7 66 C 18 32, 82 12, 93 34 C 99 46, 76 77, 44 82"
        stroke="url(#gold-grad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.8"
      />

      {/* Graduation Cap at the Top Axis (Globe Crest) */}
      {/* Mortarboard Diamond */}
      <polygon
        points="50,4 63,8 50,12 37,8"
        fill="url(#gold-grad)"
      />
      {/* Skull Cap Base */}
      <path
        d="M43.5 9 C43.5 12, 56.5 12, 56.5 9"
        fill="url(#gold-grad)"
      />
      {/* Tassel */}
      <path
        d="M50 8 L39 11 V16"
        stroke="url(#gold-grad)"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="16" r="0.9" fill="url(#gold-grad)" />

      {/* Statue of Liberty Silhouette */}
      {/* Pedestal & Base */}
      <path
        d="M36 84 H64 V80 H36 Z"
        fill="url(#gold-grad)"
      />
      <path
        d="M39 80 H61 V77 H39 Z"
        fill="url(#gold-grad)"
      />
      
      {/* Robes & Body */}
      <path
        d="M44 77 L56 77 L54.5 52 C53 48, 52 46, 51.5 45 H48.5 C48 46, 47 48, 45.5 52 Z"
        fill="url(#gold-grad)"
      />

      {/* Right Arm & Torch (Holding high global opportunity and success) */}
      <path
        d="M53 51 L62 31 L65.5 33 L56 53 Z"
        fill="url(#gold-grad)"
      />
      {/* Torch Handle & Platform */}
      <path
        d="M61 31 L63 24 H66 L64 31 Z"
        fill="url(#gold-grad)"
      />
      <path
        d="M59.5 24 H69.5 V22.5 H59.5 Z"
        fill="url(#gold-grad)"
      />
      {/* Torch Flame (Stylized gold spark of guidance) */}
      <path
        d="M64.5 21.5 C62 18, 66 11, 64 7 C67.5 10.5, 68.5 15, 66.5 21.5 Z"
        fill="url(#gold-grad)"
      />

      {/* Left Arm & Diploma (Symbolizing visa approval & academic graduation) */}
      <path
        d="M47 51 L41.5 55 L43.5 61.5 L48 55 Z"
        fill="url(#gold-grad)"
      />
      {/* Diploma Scroll */}
      <rect
        x="39"
        y="58"
        width="4.5"
        height="10.5"
        rx="1"
        transform="rotate(-22 39 58)"
        fill="url(#gold-grad)"
      />
      
      {/* Head, Neck & Hair */}
      <path
        d="M48 45.5 H52 V40.5 H48 Z"
        fill="url(#gold-grad)"
      />
      <circle
        cx="50"
        cy="40"
        r="3.2"
        fill="url(#gold-grad)"
      />

      {/* Crown Rays (7 Spikes representing the 7 continents/seas - global reach) */}
      <path
        d="M46 38.5 L41 35 L44.5 37.5 L43.5 33.5 L46.5 36.5 L46 31 L48.5 36 L50 30 L51.5 36 L54 31 L53.5 36.5 L56.5 33.5 L55.5 37.5 L59 35 L54 38.5 Z"
        fill="url(#gold-grad)"
      />
    </svg>
  );
}
