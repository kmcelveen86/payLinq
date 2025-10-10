// Comprehensive tier color system for consistent theming across the application

export const TIER_COLORS = {
  White: {
    // Light, clean platinum/silver theme
    primary: "#E8E8E8",
    secondary: "#F5F5F5",
    accent: "#C0C0C0",
    gradient: {
      from: "#F5F5F5",
      via: "#E8E8E8",
      to: "#D3D3D3",
    },
    button: {
      from: "#D3D3D3",
      to: "#B8B8B8",
      hover: {
        from: "#C0C0C0",
        to: "#A8A8A8",
      },
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6B6B6B",
      accent: "#8B8B8B",
    },
    background: "bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100",
    border: "border-gray-300",
    shadow: "shadow-gray-200",
    icon: "#9CA3AF",
  },
  Silver: {
    // Cool metallic silver with subtle blue undertones
    primary: "#C0C0C0",
    secondary: "#B8B8C8",
    accent: "#A8A8B8",
    gradient: {
      from: "#E8E8F0",
      via: "#D0D0E0",
      to: "#B8B8C8",
    },
    button: {
      from: "#A8A8B8",
      to: "#9090A8",
      hover: {
        from: "#9898B0",
        to: "#808098",
      },
    },
    text: {
      primary: "#4A4A60",
      secondary: "#5A5A70",
      accent: "#6A6A80",
    },
    background: "bg-gradient-to-br from-slate-100 via-zinc-100 to-gray-200",
    border: "border-slate-300",
    shadow: "shadow-slate-300",
    icon: "#94A3B8",
  },
  Gold: {
    // Warm, luxurious gold theme
    primary: "#D4AF37",
    secondary: "#FFD700",
    accent: "#C5A028",
    gradient: {
      from: "#FFF8DC",
      via: "#FFE55C",
      to: "#D4AF37",
    },
    button: {
      from: "#D4AF37",
      to: "#B8941F",
      hover: {
        from: "#C5A028",
        to: "#A88519",
      },
    },
    text: {
      primary: "#8B7500",
      secondary: "#A68900",
      accent: "#C5A028",
    },
    background: "bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-100",
    border: "border-amber-300",
    shadow: "shadow-amber-200",
    icon: "#F59E0B",
  },
  Black: {
    // Elegant black with gold accents
    primary: "#1A1A1A",
    secondary: "#2D2D2D",
    accent: "#C28F49",
    gradient: {
      from: "#2D2D2D",
      via: "#1F1F1F",
      to: "#0A0A0A",
    },
    button: {
      from: "#C28F49",
      to: "#A07838",
      hover: {
        from: "#D4A05C",
        to: "#B88840",
      },
    },
    text: {
      primary: "#C28F49",
      secondary: "#D4A05C",
      accent: "#E8B56A",
    },
    background: "bg-gradient-to-br from-gray-900 via-zinc-900 to-black",
    border: "border-amber-600/30",
    shadow: "shadow-amber-900/50",
    icon: "#C28F49",
  },
} as const;

export type TierName = keyof typeof TIER_COLORS;
