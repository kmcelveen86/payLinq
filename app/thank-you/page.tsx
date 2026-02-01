"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import TopNavComp from "@/components/TopNav/TopNavComp";

export default function ThankYouPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Trigger confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#fbbf24", "#f59e0b", "#d97706"] // Amber/Gold colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#fbbf24", "#f59e0b", "#d97706"]
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Countdown and redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/user/dashboard");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col">
            <TopNavComp />

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-neutral-400 mb-8">
                        Thank you for your purchase. Your account has been upgraded.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 bg-neutral-800/50 py-3 rounded-lg">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting to dashboard in {countdown}s...</span>
                    </div>

                    <button
                        onClick={() => router.push("/user/dashboard")}
                        className="mt-6 text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
                    >
                        Go to Dashboard Now
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
