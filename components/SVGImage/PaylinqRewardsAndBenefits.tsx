export default function PaylinqRewardsAndBenefits() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      width="250"
      height="300"
    >
      {/* <!-- Background with gradient --> */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDFAFA" />
          <stop offset="100%" stopColor="#FCE7F3" />
        </linearGradient>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </linearGradient>
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C026D3" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* <!-- Background --> */}
      <rect width="400" height="300" fill="url(#bgGradient)" />

      {/* <!-- Decorative elements --> */}
      <circle cx="50" cy="50" r="80" fill="#FDF2F8" />
      <circle cx="350" cy="250" r="100" fill="#FBCFE8" opacity="0.5" />

      {/* <!-- Trophy --> */}
      <polygon points="200,40 220,70 230,40 210,35" fill="#FBBF24" />
      <polygon points="200,40 180,70 170,40 190,35" fill="#FBBF24" />
      <rect x="180" y="70" width="40" height="50" fill="#FBBF24" />
      <rect
        x="175"
        y="120"
        width="50"
        height="10"
        rx="2"
        ry="2"
        fill="#B45309"
      />
      <rect x="190" y="130" width="20" height="15" fill="#B45309" />
      <rect
        x="185"
        y="145"
        width="30"
        height="5"
        rx="2"
        ry="2"
        fill="#B45309"
      />

      {/* <!-- Badge with star --> */}
      <circle
        cx="90"
        cy="130"
        r="40"
        fill="url(#badgeGradient)"
        filter="url(#glow)"
      />
      <path
        d="M90 100 L96 119 L116 119 L100 131 L106 150 L90 139 L74 150 L80 131 L64 119 L84 119 Z"
        fill="white"
      />
      <text
        x="90"
        y="180"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="#831843"
        textAnchor="middle"
      >
        VIP REWARDS
      </text>

      {/* <!-- Chart bar --> */}
      <rect
        x="280"
        y="190"
        width="30"
        height="60"
        fill="url(#chartGradient)"
        rx="4"
        ry="4"
      />
      <rect
        x="320"
        y="170"
        width="30"
        height="80"
        fill="url(#chartGradient)"
        rx="4"
        ry="4"
      />
      <rect
        x="240"
        y="210"
        width="30"
        height="40"
        fill="url(#chartGradient)"
        rx="4"
        ry="4"
      />
      <line
        x1="230"
        y1="250"
        x2="360"
        y2="250"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <text
        x="290"
        y="270"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fill="#881337"
        textAnchor="middle"
      >
        POINTS GROWTH
      </text>

      {/* <!-- Gift box --> */}
      <rect x="150" y="200" width="50" height="40" fill="#EC4899" />
      <rect x="145" y="200" width="60" height="10" fill="#F472B6" />
      <rect x="165" y="180" width="20" height="20" fill="#EC4899" />
      <rect x="160" y="180" width="30" height="5" fill="#F472B6" />
      <line
        x1="175"
        y1="200"
        x2="175"
        y2="240"
        stroke="#FDF2F8"
        strokeWidth="2"
        strokeDasharray="5,2"
      />
      <line
        x1="150"
        y1="220"
        x2="200"
        y2="220"
        stroke="#FDF2F8"
        strokeWidth="2"
        strokeDasharray="5,2"
      />

      {/* <!-- Confetti --> */}
      <circle cx="120" cy="60" r="5" fill="#3B82F6" />
      <circle cx="280" cy="80" r="4" fill="#10B981" />
      <circle cx="250" cy="140" r="6" fill="#F59E0B" />
      <circle cx="170" cy="100" r="4" fill="#EC4899" />
      <circle cx="330" cy="110" r="5" fill="#8B5CF6" />
      <circle cx="70" cy="210" r="4" fill="#EF4444" />
      <circle cx="230" cy="60" r="3" fill="#06B6D4" />

      <rect
        x="100"
        y="90"
        r="5"
        width="10"
        height="10"
        fill="#3B82F6"
        transform="rotate(30, 105, 95)"
      />
      <rect
        x="300"
        y="60"
        r="4"
        width="8"
        height="8"
        fill="#10B981"
        transform="rotate(50, 304, 64)"
      />
      <rect
        x="260"
        y="150"
        r="6"
        width="12"
        height="12"
        fill="#F59E0B"
        transform="rotate(20, 266, 156)"
      />
      <rect
        x="80"
        y="180"
        r="4"
        width="8"
        height="8"
        fill="#EC4899"
        transform="rotate(70, 84, 184)"
      />

      {/* <!-- Text elements --> */}
      <text
        x="200"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="#831843"
        textAnchor="middle"
      >
        EXCLUSIVE BENEFITS
      </text>
    </svg>
  );
}
