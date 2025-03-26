import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Bell,
  CreditCard,
  Shield,
  Trash2,
  Camera,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useUserProfile } from "../../../app/hooks/useProfile";
// import DeleteAccountModal from "@/components/DeleteAccountModal";

// Define tab animation variants
const tabVariants = {
  inactive: { borderColor: "transparent", color: "#9CA3AF" },
  active: {
    borderColor: "#2D9642",
    color: "#FFFFFF",
    transition: { duration: 0.3 },
  },
};

interface ProfileSideBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export default function ProfileSideBar({
  activeSection,
  setActiveSection,
  handleProfileImageChange,
  formData,
}: ProfileSideBarProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Use the React Query hook to fetch user profile data
  const { data: userProfile, isLoading } = useUserProfile();
  const membershipTier = userProfile?.membershipTier || "Freemium";

  // Compute full name for display
  const fullName =
    `${formData.firstName || ""} ${formData.lastName || ""}`.trim() ||
    `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim() ||
    "User";

  // Get membership tier with fallback

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-700 sticky top-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#2D9642]">
              {formData.profileImage || userProfile?.image ? (
                <img
                  src={formData.profileImage || userProfile?.image}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-1 bg-[#C28F49] rounded-full shadow-lg cursor-pointer transform transition-transform group-hover:scale-110">
              <Camera size={18} className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-white">{fullName}</h2>
          <p className="text-gray-400 text-sm mb-4">
            {formData.email || userProfile?.email}
          </p>
          <span className="px-3 py-1 bg-[#2D9642]/20 text-[#2D9642] text-xs rounded-full mb-2">
            {membershipTier} Member
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 space-y-2">
          <motion.button
            variants={tabVariants}
            animate={activeSection === "personal" ? "active" : "inactive"}
            whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
            onClick={() => setActiveSection("personal")}
            className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
          >
            <User size={18} className="mr-3" />
            <span>Personal Info</span>
          </motion.button>
          <motion.button
            variants={tabVariants}
            animate={activeSection === "address" ? "active" : "inactive"}
            whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
            onClick={() => setActiveSection("address")}
            className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
          >
            <MapPin size={18} className="mr-3" />
            <span>Address</span>
          </motion.button>
          <motion.button
            variants={tabVariants}
            animate={activeSection === "notifications" ? "active" : "inactive"}
            whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
            onClick={() => setActiveSection("notifications")}
            className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
          >
            <Bell size={18} className="mr-3" />
            <span>Notifications</span>
          </motion.button>
          <motion.button
            variants={tabVariants}
            animate={activeSection === "payment" ? "active" : "inactive"}
            whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
            onClick={() => setActiveSection("payment")}
            className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
          >
            <CreditCard size={18} className="mr-3" />
            <span>Payment Methods</span>
          </motion.button>
          <motion.button
            variants={tabVariants}
            animate={activeSection === "security" ? "active" : "inactive"}
            whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
            onClick={() => setActiveSection("security")}
            className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
          >
            <Shield size={18} className="mr-3" />
            <span>Security</span>
          </motion.button>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            className="w-full py-3 text-rose-500 font-medium flex items-center justify-center"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 size={16} className="mr-2" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {/* <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      /> */}
    </motion.div>
  );
}
