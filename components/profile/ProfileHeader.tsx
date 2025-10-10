import React from "react";
import Link from "next/link";
import { CreditCard } from "lucide-react";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader = ({ title }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <CreditCard className="h-8 w-8 text-[#2D9642] mr-2" />
        <Link href="/">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
            PayLinq
          </span>
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default ProfileHeader;
