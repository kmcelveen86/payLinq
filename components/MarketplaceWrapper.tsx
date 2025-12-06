"use client";

import Marketplace from "@marketplace/pages/Marketplace";
import { TooltipProvider } from "@marketplace/components/ui/tooltip"; // Use marketplace's tooltip provider or root's if available? Marketplace uses its own UI components so best to use its provider.

// We need to ensure styles are loaded? 
// Marketplace might expect Tailwind classes which are provided by root globals.css (which includes tailwind directives).
// However, Marketplace might have its own global styles in `index.css`.
// If I import Marketplace, I depend on compiled CSS.
// Since Next.js and Vite app both use Tailwind, classes should work.
// But define variables (CSS variables) might be missing for Shadcn if they differ.
// Let's assume root globals.css covers it or I might need to import marketplace css? 
// import "@marketplace/index.css"; // Next.js might complain about global css import in component.
// Global CSS can only be imported in Layout?
// If I need marketplace CSS I might need to add it to layout or merge it.
// For now, let's assume root CSS is sufficient or compatible (Shadcn default vars).

export default function MarketplaceWrapper() {
  return (
    <TooltipProvider>
      <Marketplace />
    </TooltipProvider>
  );
}
