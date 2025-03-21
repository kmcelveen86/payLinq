const PaylinqDebit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      width="250"
      height="300"
    >
      {/* Background with gradient */}
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* <!-- Card base --> */}
      <rect
        x="50"
        y="75"
        width="300"
        height="190"
        rx="12"
        ry="12"
        fill="url(#cardGradient)"
      />

      {/* <!-- Card accent color strip --> */}
      <rect
        x="50"
        y="75"
        width="300"
        height="40"
        rx="12"
        ry="12"
        fill="url(#accentGradient)"
      />

      {/* <!-- Card chip --> */}
      <rect
        x="80"
        y="135"
        width="40"
        height="30"
        rx="4"
        ry="4"
        fill="#FFD700"
        opacity="0.9"
      />

      {/* <!-- Card contactless symbol --> */}
      <path
        d="M140 150 C142 140, 148 134, 156 134 M148 150 C150 144, 154 140, 160 140 M156 150 C158 147, 161 145, 165 145"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* <!-- Card number --> */}
      <text
        x="80"
        y="190"
        fontFamily="'Courier New', monospace"
        fontSize="16"
        fill="white"
      >
        •••• •••• •••• 4789
      </text>

      {/* <!-- Card valid date --> */}
      <text
        x="80"
        y="215"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fill="#94A3B8"
      >
        VALID THRU
      </text>
      <text
        x="80"
        y="230"
        fontFamily="'Courier New', monospace"
        fontSize="14"
        fill="white"
      >
        08/28
      </text>

      {/* <!-- Cardholder name --> */}
      <text
        x="80"
        y="250"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fill="white"
      >
        PAYLINQ REWARDS
      </text>

      {/* <!-- Card network logo --> */}
      <circle cx="300" cy="230" r="20" fill="#FFFFFF" opacity="0.9" />
      <circle cx="290" cy="230" r="20" fill="#FF0000" opacity="0.8" />

      {/* <!-- Card brand logo --> */}
      <text
        x="260"
        y="110"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="18"
        fill="white"
      >
        PAYLINQ
      </text>

      {/* <!-- Decorative elements --> */}
      <path
        d="M260 220 C300 200, 320 230, 330 260"
        stroke="#34D399"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M270 240 C320 220, 330 250, 340 280"
        stroke="#34D399"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 200 C70 180, 90 180, 110 240"
        stroke="#34D399"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
};
export default PaylinqDebit
