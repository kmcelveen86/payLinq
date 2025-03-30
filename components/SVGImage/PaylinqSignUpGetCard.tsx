import React from "react";

export default function PaylinqSignUpGetCard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      {/* <!-- Background --> */}
      <rect width="800" height="500" fill="#1F2937" />

      {/* <!-- Glowing effect --> */}
      <circle cx="650" cy="100" r="200" fill="#2D9642" opacity="0.1" />
      <circle cx="150" cy="400" r="200" fill="#C28F49" opacity="0.1" />

      {/* <!-- Card and phone scene --> */}
      <g transform="translate(400, 250) rotate(-5)">
        {/* <!-- Credit Card --> */}
        <rect
          x="-180"
          y="-110"
          width="320"
          height="200"
          rx="15"
          fill="#111827"
        />
        <rect
          x="-180"
          y="-110"
          width="320"
          height="200"
          rx="15"
          fill="url(#cardGradient)"
          opacity="0.7"
        />

        {/* <!-- Card Chip --> */}
        <rect x="-140" y="-65" width="50" height="40" rx="5" fill="#C28F49" />
        <rect x="-135" y="-60" width="40" height="10" fill="#1F2937" />
        <rect x="-135" y="-45" width="40" height="10" fill="#1F2937" />

        {/* <!-- Card Logo --> */}
        <text
          x="-140"
          y="-85"
          fontFamily="Arial"
          fontSize="22"
          fontWeight="bold"
          fill="white"
        >
          PAYLINQ
        </text>

        {/* <!-- Card Number --> */}
        <text
          x="-140"
          y="0"
          fontFamily="Arial"
          fontSize="20"
          letterSpacing="2"
          fill="white"
        >
          5678 •••• •••• 1234
        </text>

        {/* <!-- Card Name and dates --> */}
        <text x="-140" y="40" fontFamily="Arial" fontSize="14" fill="#e5e7eb">
          CARDHOLDER NAME
        </text>
        <text x="-140" y="60" fontFamily="Arial" fontSize="16" fill="white">
          JANE SMITH
        </text>

        <text x="40" y="40" fontFamily="Arial" fontSize="14" fill="#e5e7eb">
          VALID THRU
        </text>
        <text x="40" y="60" fontFamily="Arial" fontSize="16" fill="white">
          05/28
        </text>
      </g>

      {/* <!-- Phone --> */}
      <g transform="translate(150, 250) rotate(5)">
        {/* <!-- Phone body --> */}
        <rect
          x="-70"
          y="-130"
          width="140"
          height="260"
          rx="20"
          fill="#111827"
        />
        <rect x="-60" y="-120" width="120" height="240" rx="5" fill="#374151" />

        {/* <!-- Phone screen content - signup form --> */}
        <rect x="-50" y="-110" width="100" height="220" rx="3" fill="#1F2937" />

        {/* <!-- Form elements --> */}
        <text
          x="0"
          y="-85"
          fontFamily="Arial"
          fontSize="12"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
        >
          SIGN UP
        </text>

        <rect x="-40" y="-70" width="80" height="20" rx="3" fill="#374151" />
        <text x="-35" y="-55" fontFamily="Arial" fontSize="8" fill="#9CA3AF">
          Name
        </text>

        <rect x="-40" y="-40" width="80" height="20" rx="3" fill="#374151" />
        <text x="-35" y="-25" fontFamily="Arial" fontSize="8" fill="#9CA3AF">
          Email
        </text>

        <rect x="-40" y="-10" width="80" height="20" rx="3" fill="#374151" />
        <text x="-35" y="5" fontFamily="Arial" fontSize="8" fill="#9CA3AF">
          Password
        </text>

        <rect x="-40" y="30" width="80" height="25" rx="5" fill="#2D9642" />
        <text
          x="0"
          y="47"
          fontFamily="Arial"
          fontSize="10"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
        >
          GET STARTED
        </text>

        {/* <!-- Status icons --> */}
        <circle cx="0" y="80" r="3" fill="#2D9642" />
        <text x="1" y="84" fontFamily="Arial" fontSize="8" fill="white">
          Verification
        </text>

        <circle cx="0" y="100" r="3" fill="#C28F49" />
        <text x="-10" y="104" fontFamily="Arial" fontSize="8" fill="white">
          Card Shipping
        </text>
      </g>

      {/* <!-- Decorative elements --> */}
      <circle cx="650" cy="400" r="8" fill="#2D9642" opacity="0.8" />
      <circle cx="680" cy="430" r="5" fill="#2D9642" opacity="0.6" />
      <circle cx="620" cy="420" r="10" fill="#2D9642" opacity="0.4" />

      <circle cx="150" cy="100" r="8" fill="#C28F49" opacity="0.8" />
      <circle cx="120" cy="130" r="5" fill="#C28F49" opacity="0.6" />
      <circle cx="180" cy="80" r="10" fill="#C28F49" opacity="0.4" />

      {/* <!-- Definitions --> */}
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D9642" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C28F49" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
