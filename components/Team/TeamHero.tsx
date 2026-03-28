import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TeamHero = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
            <nav className="mb-16">
                <Link href="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Return to Home">
                    <Image
                        src="/logos/paylinq-logo-light.png"
                        alt="Paylinq"
                        width={200}
                        height={60}
                        className="h-12 w-auto"
                        priority
                    />
                </Link>
            </nav>
            <div className="flex flex-col gap-8 max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C28F49] to-[#2D9642] brightness-125">Meet our team</span><span className="bg-gradient-to-r from-[#2D9642] to-[#C28F49] brightness-125 bg-clip-text text-transparent font-bold">—</span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed md:pb-16 font-bold">
                    ⁠Small team. Big vision. We're building the future of loyalty—one feature at a time.
                </p>
            </div>
        </div>
    );
};

export default TeamHero;
