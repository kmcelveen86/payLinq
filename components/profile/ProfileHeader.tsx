import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader = ({ title }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <div className="flex flex-col items-start mb-4 md:mb-0">
        <div className="flex items-center mb-2">
          <CreditCard className="h-8 w-8 text-[#2D9642] mr-2" />
          <Link href="/">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              PayLinq
            </span>
          </Link>
        </div>
        <Link
          href="/user/dashboard"
          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm group"
        >
          <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default ProfileHeader;
