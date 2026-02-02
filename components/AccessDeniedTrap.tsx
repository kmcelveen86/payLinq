"use client";

import React, { useEffect, useState } from "react";

export default function AccessDeniedTrap() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Simulate some "checking" or infinite loading behavior to keep them engaged/confused
        // or just show a stark warning.
        // Let's do a fake "Security Verification" sequence that ends in a "locked" state.
        const timers = [
            setTimeout(() => setStage(1), 800),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 3500),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-950 text-red-500 font-mono flex flex-col items-center justify-center p-4 selection:bg-red-900 selection:text-white cursor-not-allowed">
            <div className="max-w-xl w-full space-y-8 text-center">
                {stage === 0 && (
                    <div className="animate-pulse">
                        <h1 className="text-2xl">VERIFYING CREDENTIALS...</h1>
                    </div>
                )}

                {stage === 1 && (
                    <div className="space-y-4">
                        <h1 className="text-2xl text-yellow-500">SECURITY ALERT</h1>
                        <p className="border border-yellow-800 bg-yellow-900/20 p-4 rounded text-sm">
                            Unusual activity detected. System locked for audit.
                        </p>
                    </div>
                )}

                {stage >= 2 && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold tracking-widest text-red-600 uppercase">
                            Access Denied
                        </h1>

                        <div className="border border-red-900 bg-red-950/50 p-6 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                            <p className="text-lg mb-4">
                                Unauthorized access attempt to Restricted Admin Portal.
                            </p>
                            <div className="text-xs text-red-400 space-y-1 text-left font-mono bg-black/50 p-4 rounded">
                                <p>LOG_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                <p>STATUS: FLAGGED</p>
                                <p>ACTION: SESSION_TERMINATION_PENDING</p>
                                <p>TRACE: {typeof window !== "undefined" ? window.location.href : "..."}</p>
                            </div>
                            <p className="mt-4 text-sm text-red-500/80 italic">
                                This incident has been logged. Please wait for an administrator.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Disable interaction overlay */}
            <div className="absolute inset-0 z-50 bg-transparent cursor-wait" onClick={(e) => e.preventDefault()} />
        </div>
    );
}
