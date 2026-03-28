import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

interface TeamMemberProps {
    name: string;
    role: string;
    imageUrl: string;
    linkedinUrl?: string;
    isExecutive?: boolean;
}

const TeamMember = ({ name, role, imageUrl, linkedinUrl, isExecutive = false }: TeamMemberProps) => {
    const Content = () => (
        <div className="flex flex-col items-center text-center">
            <div className={`relative mb-6 ${isExecutive ? 'w-48 h-48' : 'w-32 h-32'} rounded-full overflow-hidden bg-gray-800`}>
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{name}</h3>
                {linkedinUrl && (
                    <Link
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077b5] transition-colors"
                    >
                        <Linkedin size={16} fill="currentColor" />
                    </Link>
                )}
            </div>

            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{role}</p>
        </div>
    );

    if (isExecutive) {
        return (
            <div className="w-full flex justify-center p-4">
                <Content />
            </div>
        );
    }

    return (
        <div className="w-full bg-[#1A1F2E] rounded-[24px] p-8 hover:bg-[#23293a] transition-colors duration-300">
            <Content />
        </div>
    );
};

export default TeamMember;
