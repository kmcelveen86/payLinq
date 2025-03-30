import React from "react";

export default function PaylinqLevelUpGetMore() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      {/* <!-- Background --> */}
      <rect width="800" height="500" fill="#1F2937" />

      {/* <!-- Glowing effects --> */}
      <circle cx="650" cy="100" r="200" fill="#2D9642" opacity="0.1" />
      <circle cx="150" cy="400" r="200" fill="#C28F49" opacity="0.1" />

      {/* <!-- Level Progression UI --> */}
      <g transform="translate(400, 250)">
        {/* <!-- Main panel --> */}
        <rect
          x="-300"
          y="-150"
          width="600"
          height="300"
          rx="10"
          fill="#111827"
        />
        <rect
          x="-290"
          y="-140"
          width="580"
          height="280"
          rx="5"
          fill="#1F2937"
        />

        {/* <!-- Header --> */}
        <rect x="-290" y="-140" width="580" height="50" rx="5" fill="#111827" />
        <text
          x="-270"
          y="-105"
          fontFamily="Arial"
          fontSize="18"
          fill="white"
          fontWeight="bold"
        >
          MEMBERSHIP LEVEL UP
        </text>
        <text
          x="150"
          y="-105"
          fontFamily="Arial"
          fontSize="16"
          fill="#C28F49"
          fontWeight="bold"
        >
          YOUR BENEFITS
        </text>

        {/* <!-- Tier progression --> */}
        <g transform="translate(0, -45)">
          {/* <!-- Progress bar --> */}
          <rect
            x="-250"
            y="-15"
            width="500"
            height="30"
            rx="15"
            fill="#2D4052"
          />

          {/* <!-- Current level progress --> */}
          <rect
            x="-250"
            y="-15"
            width="250"
            height="30"
            rx="15"
            fill="url(#tierGradient)"
          />

          {/* <!-- Tier markers --> */}
          <circle cx="-250" cy="0" r="15" fill="#2D9642" />
          <text
            x="-250"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            1
          </text>

          <circle cx="-125" cy="0" r="15" fill="#2D9642" />
          <text
            x="-125"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            2
          </text>

          <circle
            cx="0"
            cy="0"
            r="20"
            fill="#C28F49"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            3
          </text>

          <circle cx="125" cy="0" r="15" fill="#374151" />
          <text
            x="125"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            4
          </text>

          <circle cx="250" cy="0" r="15" fill="#374151" />
          <text
            x="250"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            5
          </text>

          {/* <!-- Level labels --> */}
          <text
            x="-250"
            y="-25"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            FREEMIUM
          </text>
          <text
            x="-125"
            y="-25"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            LIFESTYLE
          </text>
          <text
            x="0"
            y="-25"
            fontFamily="Arial"
            fontSize="10"
            fill="#FCD34D"
            textAnchor="middle"
            fontWeight="bold"
          >
            VIP LIFESTYLE
          </text>
          <text
            x="125"
            y="-25"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            ELITE
          </text>
          <text
            x="250"
            y="-25"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            PLATINUM
          </text>
        </g>

        {/* <!-- Tier benefits comparison --> */}
        <g transform="translate(0, 50)">
          {/* <!-- Current tier --> */}
          <rect
            x="-250"
            y="-50"
            width="230"
            height="100"
            rx="5"
            fill="#2D4052"
          />
          <rect
            x="-250"
            y="-50"
            width="230"
            height="35"
            rx="5"
            fill="#2D9642"
            opacity="0.2"
          />
          <text
            x="-135"
            y="-25"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            LIFESTYLE
          </text>

          <text x="-240" y="-5" fontFamily="Arial" fontSize="12" fill="white">
            • 2X Points on Everyday Purchases
          </text>
          <text x="-240" y="15" fontFamily="Arial" fontSize="12" fill="white">
            • 3X Points on Dining & Travel
          </text>
          <text x="-240" y="35" fontFamily="Arial" fontSize="12" fill="white">
            • Standard Travel Benefits
          </text>

          {/* <!-- Next tier --> */}
          <rect x="0" y="-50" width="230" height="100" rx="5" fill="#2D4052" />
          <rect
            x="0"
            y="-50"
            width="230"
            height="35"
            rx="5"
            fill="#C28F49"
            opacity="0.2"
          />
          <text
            x="115"
            y="-25"
            fontFamily="Arial"
            fontSize="14"
            fill="#C28F49"
            textAnchor="middle"
            fontWeight="bold"
          >
            VIP LIFESTYLE
          </text>

          <text x="10" y="-5" fontFamily="Arial" fontSize="12" fill="#C28F49">
            • 3X Points on Everyday Purchases
          </text>
          <text x="10" y="15" fontFamily="Arial" fontSize="12" fill="#C28F49">
            • 4X Points on Dining & Travel
          </text>
          <text x="10" y="35" fontFamily="Arial" fontSize="12" fill="#C28F49">
            • Premium Travel & Lounge Access
          </text>

          {/* <!-- Upgrade button --> */}
          <rect
            x="55"
            y="55"
            width="120"
            height="35"
            rx="17.5"
            fill="#C28F49"
          />
          <text
            x="115"
            y="78"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            UPGRADE NOW
          </text>
        </g>
      </g>

      {/* <!-- Crown symbol for VIP --> */}
      <g transform="translate(400, 140)">
        <path
          d="M-15,0 L-25,15 L-5,5 L0,20 L5,5 L25,15 L15,0 L15,-5 L-15,-5 Z"
          fill="#FCD34D"
        />
        <rect x="-15" y="-5" width="30" height="10" fill="#FCD34D" />
      </g>

      {/* <!-- Decorative elements --> */}
      <g>
        <circle cx="100" cy="100" r="5" fill="#2D9642" opacity="0.6" />
        <circle cx="120" cy="80" r="3" fill="#2D9642" opacity="0.4" />
        <circle cx="80" cy="90" r="7" fill="#2D9642" opacity="0.5" />

        <circle cx="700" cy="400" r="5" fill="#C28F49" opacity="0.6" />
        <circle cx="680" cy="380" r="3" fill="#C28F49" opacity="0.4" />
        <circle cx="720" cy="390" r="7" fill="#C28F49" opacity="0.5" />
      </g>

      {/* <!-- Definitions --> */}
      <defs>
        <linearGradient id="tierGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D9642" />
          <stop offset="100%" stopColor="#C28F49" />
        </linearGradient>
      </defs>
    </svg>
  );
}
