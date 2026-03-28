import React from 'react';
import TeamHero from '@/components/Team/TeamHero';
import TeamMember from '@/components/Team/TeamMember';

const TeamPage = () => {
    const executives = [
        {
            name: 'Kevin McElveen',
            role: 'CEO',
            imageUrl: 'https://ui-avatars.com/api/?name=Kevin+McElveen&background=0D8ABC&color=fff&size=400',
            linkedinUrl: 'https://www.linkedin.com/in/kevin-mcelveen/',
        },
        {
            name: 'Quantarrius Jackson',
            role: 'CTO',
            imageUrl: 'https://ui-avatars.com/api/?name=Quantarrius+Jackson&background=00C896&color=fff&size=400',
            linkedinUrl: 'https://www.linkedin.com/in/quantarrius-jackson-112316115/',
        }
    ];

    const teamMembers = [
        {
            name: 'Greg Davis',
            role: 'Senior Software Developer',
            imageUrl: 'https://ui-avatars.com/api/?name=Greg+Davis&background=6366f1&color=fff&size=400',
            linkedinUrl: 'https://www.linkedin.com/in/gregdavisdeveloper',
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00C896] selection:text-black">
            {/* Optional: Add a subtle glow effect to mimic inunity */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F19]/0 to-[#0B0F19]/0 z-0" />

            <div className="relative z-10">
                <TeamHero />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                    {/* Executives Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-24">
                        {executives.map((exec) => (
                            <TeamMember
                                key={exec.name}
                                {...exec}
                                isExecutive={true}
                            />
                        ))}
                    </div>

                    {/* Team Grid Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <TeamMember
                                key={member.name}
                                {...member}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
