"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface HeroItem {
    title: string;
    subtitle: string;
    image: StaticImageData | string;
    ctaText?: string;
    ctaLink?: string;
}

interface ModernHeroProps {
    items: HeroItem[];
}

export const ModernHero = ({ items }: ModernHeroProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [items.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prevSlide = () =>
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl m-4 mx-auto max-w-[calc(100%-2rem)] shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-gold/90 z-10 mix-blend-multiply" />
                    <Image
                        src={items[currentIndex].image}
                        alt={items[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 text-white">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="max-w-2xl space-y-6"
                        >
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                                {items[currentIndex].title}
                            </h1>
                            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
                                {items[currentIndex].subtitle}
                            </p>

                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                            >
                                {items[currentIndex].ctaText || "Explore Now"}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-8 z-30 flex gap-2">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`cursor-pointer transition-all duration-300 h-1.5 rounded-full ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
