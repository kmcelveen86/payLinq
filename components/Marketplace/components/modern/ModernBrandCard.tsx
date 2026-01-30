"use client";

import { Brand } from "@marketplace/types/marketplace";
import { UPPBadge } from "../marketplace/UPPBadge";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Heart, MapPin, Sparkles, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ModernBrandCardProps {
    brand: Brand;
    onClick: (brand: Brand) => void;
    onFavorite?: (brandId: string) => void;
}

export const ModernBrandCard = ({ brand, onClick, onFavorite }: ModernBrandCardProps) => {
    const getTagIcon = (tag: string) => {
        switch (tag) {
            case "local": return <MapPin className="h-3 w-3" />;
            case "trending": return <TrendingUp className="h-3 w-3" />;
            case "new": return <Sparkles className="h-3 w-3" />;
            case "editors-pick": return <Star className="h-3 w-3" />;
            default: return null;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
            onClick={() => onClick(brand)}
        >
            {/* Top Banner / Cover Effect */}
            <div className="h-24 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 relative">
                <div className="absolute top-3 right-3 z-10">
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all",
                            brand.isFavorited ? "text-red-500" : "text-muted-foreground"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onFavorite) onFavorite(brand.id);
                        }}
                    >
                        <Heart className={cn("h-4 w-4", brand.isFavorited && "fill-current")} />
                    </Button>
                </div>
            </div>

            <div className="px-5 pb-5">
                {/* Logo overlapping the banner */}
                <div className="-mt-12 mb-3 relative">
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-black shadow-lg p-1 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-4xl overflow-hidden transform transition-transform group-hover:scale-105">
                        {brand.logo.startsWith("http") || brand.logo.startsWith("/") ? (
                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            brand.logo
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-1 mb-3">
                    <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                        {brand.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{brand.category}</p>
                </div>

                {/* Reward Badge */}
                <div className="mb-4">
                    <UPPBadge
                        rate={brand.uppEarningRate}
                        type={brand.uppEarningType}
                        size="sm"
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {brand.tags.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[10px] px-2 h-5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
                        >
                            <span className="mr-1">{getTagIcon(tag)}</span>
                            {tag.replace("-", " ")}
                        </Badge>
                    ))}
                    {brand.isLocal && brand.distance && (
                        <Badge variant="secondary" className="text-[10px] px-2 h-5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                            {brand.distance}m
                        </Badge>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
