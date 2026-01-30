"use client";

import { Brand } from "@marketplace/types/marketplace";
import { useState, useEffect } from "react";
import { toggleFavorite } from "@/app/actions/toggleFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { UPPBadge } from "../marketplace/UPPBadge";
import { Separator } from "../ui/separator";
import {
    Heart,
    Share2,
    MapPin,
    Navigation,
    Clock,
    Sparkles,
    Info,
    ExternalLink,
    Store,
    Tag
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { HeartExplosion } from "./HeartExplosion";
import { getPaylinqUser } from "@/app/actions/user";
import { trackEvent } from "@/app/actions/track";

interface ModernBrandDetailModalProps {
    brand: Brand | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export const ModernBrandDetailModal = ({ brand, open, onOpenChange }: ModernBrandDetailModalProps) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [dbUserId, setDbUserId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { user } = useUser();

    useEffect(() => {
        const fetchDbUser = async () => {
            if (user?.id) {
                const dbUser = await getPaylinqUser();
                if (dbUser) {
                    setDbUserId(dbUser.id);
                }
            }
        };
        fetchDbUser();
    }, [user?.id]);

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    useEffect(() => {
        if (brand) {
            setIsFavorited(!!brand.isFavorited);
        }
    }, [brand]);

    const handleToggleFavorite = async () => {
        if (!brand) return;

        const previousState = isFavorited;
        if (!previousState) {
            setShowConfetti(true);
        }
        setIsFavorited(!previousState);

        try {
            const result = await toggleFavorite(brand.id);
            if (!result.success) {
                setIsFavorited(previousState);
                toast.error("Failed to update favorite");
            } else {
                toast.success(result.favorited ? "Added to favorites" : "Removed from favorites");
                queryClient.invalidateQueries({ queryKey: ["merchants"] });
            }
        } catch (error) {
            setIsFavorited(previousState);
            toast.error("Something went wrong");
        }
    };

    if (!brand) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-none sm:rounded-3xl max-h-[90vh] flex flex-col">
                <DialogHeader className="hidden">
                    <DialogTitle>{brand.name}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Hero Header */}
                    <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                        {/* Brand Logo - Floating */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-end"
                        >
                            <div className="w-32 h-32 rounded-3xl bg-white dark:bg-black shadow-2xl p-2 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-6xl overflow-hidden">
                                {brand.logo.startsWith("http") || brand.logo.startsWith("/") ? (
                                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    brand.logo
                                )}
                            </div>
                        </motion.div>

                        {/* Header Actions */}
                        <div className="absolute top-6 right-6 flex gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                className={cn(
                                    "rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all hover:scale-110 active:scale-95 relative",
                                    isFavorited ? "text-red-500 hover:text-red-600" : "text-zinc-400 hover:text-red-400 dark:text-zinc-400"
                                )}
                                onClick={handleToggleFavorite}
                            >
                                <Heart className={cn("h-5 w-5", isFavorited && "fill-current")} />
                                <AnimatePresence>
                                    {showConfetti && <HeartExplosion />}
                                </AnimatePresence>
                            </Button>
                            <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
                                <Share2 className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <div className="pt-20 px-8 md:px-12 pb-12 space-y-8">
                        {/* Title & Info */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{brand.name}</h2>
                                    <Badge variant="secondary" className="rounded-full px-3">{brand.category}</Badge>
                                </div>
                                {brand.tagline && (
                                    <p className="text-lg text-zinc-500 dark:text-zinc-400">{brand.tagline}</p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1 justify-center">
                                    {brand.isLocal && brand.address && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            {brand.address}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <UPPBadge
                                    rate={brand.uppEarningRate}
                                    type={brand.uppEarningType}
                                    size="lg"
                                />
                                <span className="text-xs text-muted-foreground">Rewards powered by Paylinq</span>
                            </div>
                        </div>

                        <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Col: Description & Local Info */}
                            <div className="md:col-span-2 space-y-8">
                                {/* Description */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-zinc-900 dark:text-white">
                                        <Info className="h-5 w-5 text-primary" />
                                        About
                                    </h3>
                                    <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                            {brand.description || "No description available."}
                                        </p>
                                    </div>
                                </div>

                                {/* Store Info (Local Only) */}
                                {brand.isLocal && (
                                    <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
                                        <h3 className="font-semibold flex items-center gap-2 text-zinc-900 dark:text-white">
                                            <Store className="h-5 w-5" />
                                            Store Information
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {brand.distance !== undefined && (
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Navigation className="h-4 w-4 text-muted-foreground" />
                                                    <span>{brand.distance} miles away</span>
                                                </div>
                                            )}
                                            {brand.hours && (
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span>{brand.hours}</span>
                                                </div>
                                            )}
                                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                                Get Directions
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Featured Items */}
                                {brand.featuredItems && brand.featuredItems.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <Tag className="h-5 w-5 text-primary" />
                                            Featured Categories
                                        </h3>
                                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                            {brand.featuredItems.map((item) => (
                                                <div key={item.id} className="min-w-[140px] space-y-3 group cursor-pointer">
                                                    <div className="w-[140px] h-[140px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-primary/5 transition-colors">
                                                        {/* Placeholder for item image */}
                                                        {`🏷️`}
                                                    </div>
                                                    <p className="text-sm font-medium text-center group-hover:text-primary transition-colors">{item.category}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Col: Offers & CTA */}
                            <div className="space-y-6">
                                {/* Offers Card */}
                                {brand.offers && brand.offers.length > 0 ? (
                                    <div className="bg-gradient-to-br from-primary/5 to-gold/10 dark:from-primary/10 dark:to-gold/10 border border-primary/10 dark:border-primary/20 rounded-2xl p-6 space-y-4">
                                        <h3 className="font-semibold text-primary dark:text-primary-foreground flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-gold" />
                                            Active Offers
                                        </h3>
                                        <div className="space-y-3">
                                            {brand.offers.map((offer) => (
                                                <div key={offer.id} className="bg-white/60 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-primary/10 dark:border-primary/20">
                                                    <h4 className="font-bold text-foreground">{offer.title}</h4>
                                                    <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                                                    <Badge className="bg-gold hover:bg-gold/90 border-none text-white shadow-sm">
                                                        +{offer.bonusUpp} Bonus UPP
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 text-center">
                                        <p className="text-muted-foreground text-sm">No special offers currently available.</p>
                                    </div>
                                )}

                                {/* Sticky CTA for Desktop */}
                                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg hidden md:block sticky top-6">
                                    <div className="text-center mb-6">
                                        <p className="text-muted-foreground text-sm mb-1">Earn rewards instantly</p>
                                        <p className="text-2xl font-bold text-primary">
                                            {brand.uppEarningType === "percentage" ? `${brand.uppEarningRate}% Back` : `${brand.uppEarningRate} UPP / $10`}
                                        </p>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl"
                                        onClick={async () => {
                                            // Determine which link to use based on environment
                                            let targetUrl = brand.affiliateLink || brand.website;

                                            // Override with test link if in development and available
                                            if (process.env.NODE_ENV === "development" && brand.testAffiliateLink) {
                                                targetUrl = brand.testAffiliateLink;
                                            }

                                            // Track the click (fire and forget)
                                            trackEvent(brand.id, "click", { targetUrl });

                                            if (targetUrl) {
                                                const separator = targetUrl.includes("?") ? "&" : "?";
                                                const idToUse = dbUserId || user?.id; // Prefer DB ID
                                                const finalUrl = idToUse
                                                    ? `${targetUrl}${separator}userId=${idToUse}`
                                                    : targetUrl;
                                                window.open(finalUrl, "_blank");
                                            }
                                        }}
                                        disabled={!brand.affiliateLink && !brand.website && !(process.env.NODE_ENV === "development" && brand.testAffiliateLink)}
                                    >
                                        {`Shop & Earn`}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky CTA */}
                <div className="p-4 bg-background border-t border-zinc-200 dark:border-zinc-800 md:hidden z-20">
                    <Button
                        size="lg"
                        className="w-full h-12 text-lg font-semibold rounded-xl"
                        onClick={() => {
                            // Determine which link to use based on environment
                            let targetUrl = brand.affiliateLink || brand.website;

                            // Override with test link if in development and available
                            if (process.env.NODE_ENV === "development" && brand.testAffiliateLink) {
                                targetUrl = brand.testAffiliateLink;
                            }

                            if (targetUrl) {
                                const separator = targetUrl.includes("?") ? "&" : "?";
                                const idToUse = dbUserId || user?.id; // Prefer DB ID
                                const finalUrl = idToUse
                                    ? `${targetUrl}${separator}userId=${idToUse}`
                                    : targetUrl;
                                window.open(finalUrl, "_blank");
                            }
                        }}
                        disabled={!brand.affiliateLink && !brand.website && !(process.env.NODE_ENV === "development" && brand.testAffiliateLink)}
                    >
                        {`Shop & Earn`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    );
};

// Icon needed for button
import { ArrowRight } from "lucide-react";
