import { motion } from "framer-motion";
import {
  Award,
  Edit,
  Home,
  Calendar,
  Gift,
  TrendingUp,
  Settings,
  CreditCard,
  LogOut,
  User,
  Store, // Added Store icon
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import userData from "./data";
import Link from "next/link";
import { useUserProfile } from "@/app/hooks/useProfile";
import { SignOutButton, useOrganizationList } from "@clerk/nextjs"; // Added useOrganizationList
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: typeof userData;
  itemVariants: any;
};

export default function SideBar(props: Props) {
  const router = useRouter();
  const { activeTab, setActiveTab, userData, itemVariants } = props;
  const queryClient = useQueryClient();

  // Check for organization memberships
  const { userMemberships, isLoaded: isOrgLoaded, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const handleLogout = () => {
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  const handleOnClick = () => {
    router.push("/user/profile-edit");
    setActiveTab("settings");
  };

  const handleMerchantClick = async () => {
    if (!isOrgLoaded || !userMemberships.data?.[0]?.organization?.id || !setActive) return;

    // Set the active organization to the first one available
    const orgId = userMemberships.data[0].organization.id;
    try {
      await setActive({ organization: orgId });
    } catch (err) {
      console.error("Failed to set active organization", err);
    }

    // Construct merchant URL: http://localhost:3000 -> http://merchant.localhost:3000
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const merchantUrl = baseUrl.replace("://", "://merchant.") + "/dashboard";
    window.location.href = merchantUrl;
  };

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile();
  const { membershipTier, firstName, lastName, image } = profileData || {};

  const hasMerchants = isOrgLoaded && userMemberships.count > 0;

  return (
    <motion.div variants={itemVariants} className="lg:col-span-1">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5">
        <div className="flex flex-col items-center mb-6">
          {image ? (
            <img
              src={image}
              alt={firstName}
              className="h-24 w-24 rounded-full border-4 border-[#2D9642] mb-4"
            // onError={(e) => {
            //   // If image fails to load, show default avatar
            //   e.currentTarget.src = "/default-avatar.png";
            // }}
            />
          ) : (
            // <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <User size={40} className="text-gray-400" />
            // </div>
          )}
          <h2 className="text-xl font-bold text-white">{`${firstName} ${lastName}`}</h2>

          {/* Membership badge */}
          <div className="mt-2 mb-3 px-3 py-1 rounded-full bg-gray-700 flex items-center">
            <Award size={14} className="text-[#C28F49] mr-1.5" />
            <span className="text-sm text-[#C28F49] font-medium">
              {membershipTier || `Not a member`}
            </span>
          </div>

          <Link href="/user/profile-edit">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-1 flex items-center text-sm font-medium text-gray-300 hover:text-white py-1 px-3 rounded-full bg-gray-700 bg-opacity-50 hover:bg-opacity-70 transition-all"
            >
              <Edit size={14} className="mr-1" /> Edit Profile
            </motion.button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Points Balance</span>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              {userData.totalPoints.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-400 text-xs">
              This month: {userData.pointsThisMonth}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors ${activeTab === "overview"
              ? "bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 border-l-4 border-[#2D9642]"
              : ""
              }`}
          >
            <Home size={18} className="mr-3 text-gray-400" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors ${activeTab === "transactions"
              ? "bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 border-l-4 border-[#2D9642]"
              : ""
              }`}
          >
            <Calendar size={18} className="mr-3 text-gray-400" />
            <span>Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors ${activeTab === "rewards"
              ? "bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 border-l-4 border-[#2D9642]"
              : ""
              }`}
          >
            <Gift size={18} className="mr-3 text-gray-400" />
            <span>Rewards</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors ${activeTab === "analytics"
              ? "bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 border-l-4 border-[#2D9642]"
              : ""
              }`}
          >
            <TrendingUp size={18} className="mr-3 text-gray-400" />
            <span>Analytics</span>
          </button>

          {hasMerchants && (
            <button
              onClick={handleMerchantClick}
              className="w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors text-emerald-400 hover:text-emerald-300"
            >
              <Store size={18} className="mr-3" />
              <span>Merchant Portal</span>
            </button>
          )}

          <button
            onClick={handleOnClick}
            className={`w-full py-3 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors ${activeTab === "settings"
              ? "bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 border-l-4 border-[#2D9642]"
              : ""
              }`}
          >
            <Settings size={18} className="mr-3 text-gray-400" />
            <span>Settings</span>
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 p-4 rounded-lg bg-gray-700 bg-opacity-50"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#2D9642]/20 mr-4">
              <CreditCard size={24} className="text-[#2D9642]" />
            </div>
            <div>
              <h3 className="font-medium">PayLinq Card</h3>
              <p className="text-gray-400 text-sm">
                **** **** **** {userData.cardLastFour}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            <span>Card is active and ready to use</span>
          </div>
        </motion.div>
        <SignOutButton>
          <span className="mt-8 w-full flex items-center justify-center text-gray-400 hover:text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <LogOut size={18} className="mr-2" onClick={handleLogout} />
            <span>Sign Out</span>
          </span>
        </SignOutButton>
      </div>
    </motion.div>
  );
}
