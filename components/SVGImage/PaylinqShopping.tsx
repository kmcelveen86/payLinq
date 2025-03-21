const PaylinqShopping = ()  => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="240" height="300">
  {/* <!-- Background with gradient --> */}
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F8FAFC" />
      <stop offset="100%" stopColor="#EFF6FF" />
    </linearGradient>
    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#1E40AF" />
      <stop offset="100%" stopColor="#3B82F6" />
    </linearGradient>
  </defs>

  {/* <!-- Background --> */}
  <rect width="400" height="300" fill="url(#bgGradient)" />
  
  {/* <!-- Store counter --> */}
  <rect x="0" y="140" width="400" height="160" fill="#E2E8F0" />
  
  {/* <!-- Counter top --> */}
  <rect x="0" y="140" width="400" height="20" fill="#94A3B8" />
  
  {/* <!-- Payment terminal --> */}
  <rect x="230" y="80" width="100" height="140" rx="5" ry="5" fill="#334155" />
  <rect x="240" y="90" width="80" height="40" rx="2" ry="2" fill="#CBD5E1" />
  <rect x="240" y="140" width="80" height="40" fill="#475569" />
  
  {/* <!-- Terminal keypad --> */}
  <rect x="250" y="150" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  <rect x="273" y="150" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  <rect x="295" y="150" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  
  <rect x="250" y="165" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  <rect x="273" y="165" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  <rect x="295" y="165" width="15" height="10" rx="1" ry="1" fill="#94A3B8" />
  
  {/* <!-- Hand holding card --> */}
  <path d="M50 230 C40 200, 70 170, 100 180 C120 170, 150 180, 160 220 C180 250, 150 270, 120 260 C80 270, 60 250, 50 230" fill="#FCD34D" />
  <path d="M100 180 C120 170, 150 180, 160 220" fill="none" stroke="#E7C13C" strokeWidth="1" />
  
  {/* <!-- Card in hand --> */}
  <rect x="90" y="190" width="100" height="60" rx="5" ry="5" fill="url(#cardGradient)" transform="rotate(-10, 140, 220)" />
  <rect x="95" y="205" width="80" height="5" rx="2" ry="2" fill="white" opacity="0.7" transform="rotate(-10, 140, 220)" />
  <rect x="95" y="215" width="60" height="5" rx="2" ry="2" fill="white" opacity="0.7" transform="rotate(-10, 140, 220)" />
  <rect x="95" y="225" width="70" height="5" rx="2" ry="2" fill="white" opacity="0.7" transform="rotate(-10, 140, 220)" />
  
  {/* <!-- Card chip --> */}
  <rect x="105" y="195" width="15" height="10" rx="1" ry="1" fill="#FFD700" opacity="0.9" transform="rotate(-10, 140, 220)" />
  
  {/* <!-- Payment wave animation --> */}
  <path d="M195 180 C210 170, 220 180, 230 190" stroke="#6366F1" strokeWidth="3" fill="none" opacity="0.7" />
  <path d="M195 170 C215 160, 230 170, 245 185" stroke="#6366F1" strokeWidth="2" fill="none" opacity="0.5" />
  <path d="M195 160 C220 150, 240 160, 260 180" stroke="#6366F1" strokeWidth="1" fill="none" opacity="0.3" />
  
  {/* <!-- Shopping items on counter --> */}
  <circle cx="330" cy="110" r="20" fill="#FB923C" /> {/* Orange */}
  <ellipse cx="350" cy="130" rx="15" ry="10" fill="#84CC16" /> {/* Apple */}
  <rect x="310" y="120" width="30" height="15" rx="2" ry="2" fill="#BFDBFE" /> {/* Box item */}
  
  {/* <!-- Store name --> */}
  <text x="20" y="40" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#334155">FARMERS MARKET</text>
  
  {/* <!-- Transaction text --> */}
  <text x="280" y="110" fontFamily="monospace" fontSize="10" fill="#1E293B" textAnchor="middle">APPROVED</text>
  <text x="280" y="125" fontFamily="monospace" fontSize="8" fill="#1E293B" textAnchor="middle">$42.75</text>
</svg>
  )
}

export default PaylinqShopping;
