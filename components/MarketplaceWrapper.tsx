"use client";

import Marketplace from "@marketplace/pages/Marketplace";
import { TooltipProvider } from "@marketplace/components/ui/tooltip";

export default function MarketplaceWrapper() {
  return (
    <TooltipProvider>
      <Marketplace />
    </TooltipProvider>
  );
}
