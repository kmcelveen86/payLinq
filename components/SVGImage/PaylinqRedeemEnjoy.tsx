import React from "react";

export default function PaylinqRedeemEnjoy() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      {/* <!-- Background --> */}
      <rect width="800" height="500" fill="#1F2937" />

      {/* <!-- Glowing effects --> */}
      <circle cx="650" cy="100" r="200" fill="#2D9642" opacity="0.1" />
      <circle cx="150" cy="400" r="200" fill="#C28F49" opacity="0.1" />

      {/* <!-- Rewards Marketplace --> */}
      <g transform="translate(400, 250)">
        {/* <!-- Main dashboard panel --> */}
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
          REWARDS MARKETPLACE
        </text>
        <text
          x="140"
          y="-105"
          fontFamily="Arial"
          fontSize="16"
          fill="#C28F49"
          fontWeight="bold"
        >
          12,500 POINTS
        </text>

        {/* <!-- Reward categories --> */}
        <g transform="translate(-230, -70)">
          <rect x="-40" y="-20" width="80" height="80" rx="5" fill="#2D4052" />
          <rect
            x="-40"
            y="-20"
            width="80"
            height="80"
            rx="5"
            fill="#2D9642"
            opacity="0.1"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            CASH
          </text>
          <text
            x="0"
            y="25"
            fontFamily="Arial"
            fontSize="16"
            fill="#2D9642"
            textAnchor="middle"
            fontWeight="bold"
          >
            $50
          </text>
          <text
            x="0"
            y="45"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            5,000 PTS
          </text>
        </g>

        <g transform="translate(-130, -70)">
          <rect x="-40" y="-20" width="80" height="80" rx="5" fill="#2D4052" />
          <rect
            x="-40"
            y="-20"
            width="80"
            height="80"
            rx="5"
            fill="#C28F49"
            opacity="0.1"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            GIFT CARD
          </text>
          <text
            x="0"
            y="25"
            fontFamily="Arial"
            fontSize="16"
            fill="#C28F49"
            textAnchor="middle"
            fontWeight="bold"
          >
            DINING
          </text>
          <text
            x="0"
            y="45"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            6,000 PTS
          </text>
        </g>

        <g transform="translate(-30, -70)">
          <rect x="-40" y="-20" width="80" height="80" rx="5" fill="#2D4052" />
          <rect
            x="-40"
            y="-20"
            width="80"
            height="80"
            rx="5"
            fill="#2D9642"
            opacity="0.1"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            GIFT CARD
          </text>
          <text
            x="0"
            y="25"
            fontFamily="Arial"
            fontSize="16"
            fill="#2D9642"
            textAnchor="middle"
            fontWeight="bold"
          >
            RETAIL
          </text>
          <text
            x="0"
            y="45"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            7,500 PTS
          </text>
        </g>

        <g transform="translate(70, -70)">
          <rect x="-40" y="-20" width="80" height="80" rx="5" fill="#2D4052" />
          <rect
            x="-40"
            y="-20"
            width="80"
            height="80"
            rx="5"
            fill="#C28F49"
            opacity="0.1"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            TRAVEL
          </text>
          <text
            x="0"
            y="25"
            fontFamily="Arial"
            fontSize="16"
            fill="#C28F49"
            textAnchor="middle"
            fontWeight="bold"
          >
            HOTEL
          </text>
          <text
            x="0"
            y="45"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            10,000 PTS
          </text>
        </g>

        <g transform="translate(170, -70)">
          <rect x="-40" y="-20" width="80" height="80" rx="5" fill="#2D4052" />
          <rect
            x="-40"
            y="-20"
            width="80"
            height="80"
            rx="5"
            fill="#2D9642"
            opacity="0.1"
          />
          <text
            x="0"
            y="5"
            fontFamily="Arial"
            fontSize="12"
            fill="white"
            textAnchor="middle"
          >
            TRAVEL
          </text>
          <text
            x="0"
            y="25"
            fontFamily="Arial"
            fontSize="16"
            fill="#2D9642"
            textAnchor="middle"
            fontWeight="bold"
          >
            FLIGHT
          </text>
          <text
            x="0"
            y="45"
            fontFamily="Arial"
            fontSize="10"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            12,000 PTS
          </text>
        </g>

        {/* <!-- Featured reward --> */}
        <g transform="translate(0, 80)">
          <rect
            x="-250"
            y="-50"
            width="500"
            height="100"
            rx="5"
            fill="#2D4052"
          />
          <rect
            x="-250"
            y="-50"
            width="500"
            height="100"
            rx="5"
            fill="url(#rewardGradient)"
            opacity="0.2"
          />

          {/* <!-- VIP Experience badge --> */}
          <rect
            x="-240"
            y="-40"
            width="100"
            height="80"
            rx="5"
            fill="#111827"
          />
          <text
            x="-190"
            y="-10"
            fontFamily="Arial"
            fontSize="11"
            fill="#C28F49"
            textAnchor="middle"
            fontWeight="bold"
          >
            EXCLUSIVE
          </text>
          <text
            x="-190"
            y="10"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            VIP
          </text>
          <text
            x="-190"
            y="30"
            fontFamily="Arial"
            fontSize="11"
            fill="white"
            textAnchor="middle"
          >
            EVENT
          </text>

          {/* <!-- Reward details --> */}
          <text
            x="-110"
            y="-25"
            fontFamily="Arial"
            fontSize="16"
            fill="white"
            fontWeight="bold"
          >
            EXCLUSIVE CONCERT ACCESS
          </text>
          <text
            x="-110"
            y="0"
            fontFamily="Arial"
            fontSize="12"
            fill="#D1D5DB"
          >
            VIP tickets to premium events with backstage passes
          </text>
          <text
            x="-110"
            y="25"
            fontFamily="Arial"
            fontSize="12"
            fill="#9CA3AF"
          >
            Limited availability - members only
          </text>

          {/* <!-- Points and redeem button --> */}
          <text
            x="190"
            y="-20"
            fontFamily="Arial"
            fontSize="12"
            fill="#C28F49"
            fontWeight="bold"
            textAnchor="middle"
          >
            15,000 POINTS
          </text>
          <rect x="130" y="10" width="100" height="30" rx="15" fill="#C28F49" />
          <text
            x="180"
            y="30"
            fontFamily="Arial"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            REDEEM
          </text>
        </g>
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
        <linearGradient id="rewardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D9642" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C28F49" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
