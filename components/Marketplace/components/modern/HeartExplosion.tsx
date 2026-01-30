"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const HeartExplosion = () => {
    // Generate 12 small particles
    const particles = Array.from({ length: 12 }).map((_, i) => i);

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-visible">
            {particles.map((i) => (
                <Particle key={i} index={i} total={12} />
            ))}
        </div>
    );
};

const Particle = ({ index, total }: { index: number; total: number }) => {
    // Calculate random angle and distance for "pop" effect
    // We want them to generally go UP and OUT
    const randomAngle = Math.random() * 360;
    const randomDistance = 40 + Math.random() * 40; // 40px to 80px out

    // Convert polar to cartesian
    // But let's bias them upwards a bit (-90 degrees is up)
    // Actually random 360 is fine for an "explosion"

    const x = Math.cos((randomAngle * Math.PI) / 180) * randomDistance;
    const y = Math.sin((randomAngle * Math.PI) / 180) * randomDistance;

    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
                x,
                y,
                scale: [0, 1, 0], // Pop up then shrink
                opacity: [1, 1, 0], // Fade out at end
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: Math.random() * 0.1,
            }}
            className="absolute"
        >
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
        </motion.div>
    );
};
