import React from "react";

export default function PaylinqShopEarnPoints() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      {/* <!-- Background --> */}
      <rect width="800" height="500" fill="#1F2937" />

      {/* <!-- Glowing effects --> */}
      <circle cx="650" cy="100" r="200" fill="#2D9642" opacity="0.1" />
      <circle cx="150" cy="400" r="200" fill="#C28F49" opacity="0.1" />

      {/* <!-- Shopping scene --> */}
      <g transform="translate(400, 250)">
        {/* <!-- Store front --> */}
        <rect
          x="-250"
          y="-150"
          width="500"
          height="300"
          rx="5"
          fill="#111827"
        />

        {/* <!-- Store window --> */}
        <rect
          x="-210"
          y="-120"
          width="180"
          height="240"
          rx="5"
          fill="#374151"
        />

        {/* <!-- Store items in window --> */}
        <rect x="-190" y="-100" width="60" height="80" rx="3" fill="#4B5563" />
        <rect x="-120" y="-100" width="70" height="60" rx="3" fill="#4B5563" />
        <rect x="-190" y="-10" width="70" height="60" rx="3" fill="#4B5563" />
        <rect x="-110" y="-30" width="60" height="80" rx="3" fill="#4B5563" />

        {/* <!-- Store door --> */}
        <rect x="0" y="-90" width="80" height="180" rx="3" fill="#2D4052" />
        <rect x="35" y="0" width="10" height="20" rx="2" fill="#C28F49" />

        {/* <!-- Store sign --> */}
        <rect x="-160" y="-180" width="320" height="50" rx="5" fill="#2D9642" />
        <text
          x="0"
          y="-145"
          fontFamily="Arial"
          fontSize="24"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
        >
          PREMIUM SHOP
        </text>

        {/* <!-- Person with shopping bags --> */}
        <g transform="translate(180, 50)">
          {/* <!-- Body --> */}
          <circle cx="0" cy="-80" r="30" fill="#4B5563" />
          <rect
            x="-20"
            y="-50"
            width="40"
            height="100"
            rx="10"
            fill="#4B5563"
          />

          {/* <!-- Shopping bags --> */}
          <g transform="rotate(-20)">
            <rect x="-60" y="20" width="40" height="50" rx="3" fill="#2D9642" />
            <rect x="-55" y="15" width="30" height="10" rx="3" fill="#2D9642" />
          </g>

          <g transform="rotate(15)">
            <rect x="20" y="20" width="40" height="50" rx="3" fill="#C28F49" />
            <rect x="25" y="15" width="30" height="10" rx="3" fill="#C28F49" />
          </g>
        </g>

        {/* <!-- Points display --> */}
        <g transform="translate(180, -70)">
          <circle cx="0" cy="0" r="50" fill="#111827" />
          <circle
            cx="0"
            cy="0"
            r="50"
            fill="url(#pointsGradient)"
            opacity="0.8"
          />

          <text
            x="0"
            y="-10"
            fontFamily="Arial"
            fontSize="20"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            +250
          </text>
          <text
            x="0"
            y="15"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
          >
            POINTS
          </text>

          {/* <!-- Stars effect --> */}
          <g>
            <path
              d="M-25,-30 L-23,-25 L-28,-25 L-24,-22 L-26,-18 L-21,-21 L-18,-17 L-18,-22 L-13,-24 L-18,-26 Z"
              fill="#FCD34D"
            />
            <path
              d="M30,-15 L32,-10 L27,-10 L31,-7 L29,-3 L34,-6 L37,-2 L37,-7 L42,-9 L37,-11 Z"
              fill="#FCD34D"
            />
            <path
              d="M-10,30 L-8,35 L-13,35 L-9,38 L-11,42 L-6,39 L-3,43 L-3,38 L2,36 L-3,34 Z"
              fill="#FCD34D"
            />
          </g>
        </g>
      </g>

      {/* <!-- Point categories --> */}
      <g transform="translate(130, 400)">
        <rect
          x="-80"
          y="-20"
          width="160"
          height="40"
          rx="20"
          fill="#111827"
          opacity="0.9"
        />
        <text
          x="0"
          y="5"
          fontFamily="Arial"
          fontSize="16"
          fill="#2D9642"
          textAnchor="middle"
          fontWeight="bold"
        >
          DINING: 3X POINTS
        </text>
      </g>

      <g transform="translate(400, 400)">
        <rect
          x="-80"
          y="-20"
          width="160"
          height="40"
          rx="20"
          fill="#111827"
          opacity="0.9"
        />
        <text
          x="0"
          y="5"
          fontFamily="Arial"
          fontSize="16"
          fill="#C28F49"
          textAnchor="middle"
          fontWeight="bold"
        >
          TRAVEL: 3X POINTS
        </text>
      </g>

      <g transform="translate(670, 400)">
        <rect
          x="-80"
          y="-20"
          width="160"
          height="40"
          rx="20"
          fill="#111827"
          opacity="0.9"
        />
        <text
          x="0"
          y="5"
          fontFamily="Arial"
          fontSize="16"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
        >
          EVERYDAY: 2X POINTS
        </text>
      </g>

      {/* <!-- Definitions --> */}
      <defs>
        <linearGradient id="pointsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D9642" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C28F49" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
