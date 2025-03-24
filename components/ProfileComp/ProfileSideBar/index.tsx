import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, CreditCard, Shield, Trash2, Camera } from "lucide-react";
import Bell from "./Bell";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onDeleteClick: () => void;
  userImage: string | null;
  userName: string | undefined;
  userEmail: string;
  isUploading: boolean;
  profileImage: string | null;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  membershipTier?: string;
}

const tabVariants = {
  inactive: { borderColor: "transparent", color: "#9CA3AF" },
  active: {
    borderColor: "#2D9642",
    color: "#FFFFFF",
    transition: { duration: 0.3 },
  },
};

const ProfileSidebar = ({
  activeSection,
  setActiveSection,
  onDeleteClick,
  userImage,
  userName,
  userEmail,
  isUploading,
  profileImage,
  handleProfileImageChange,
  membershipTier,
}: SidebarProps) => {
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
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#2D9642] relative">
              {isUploading && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-10">
                  <svg
                    className="animate-spin h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {profileImage || userImage ? (
                <img
                  src={profileImage || userImage || ""}
                  alt={userName ?? "User Profile Image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
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
                disabled={isUploading}
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-white">{userName}</h2>
          <p className="text-gray-400 text-sm mb-4">{userEmail}</p>
          <span className="px-3 py-1 bg-[#2D9642]/20 text-[#2D9642] text-xs rounded-full mb-2">
            {membershipTier || `Not a member`}
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 space-y-2">
          {[
            {
              id: "personal",
              label: "Personal Info",
              icon: <User size={18} className="mr-3" />,
            },
            {
              id: "address",
              label: "Address",
              icon: <MapPin size={18} className="mr-3" />,
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell size={18} className="mr-3" />,
            },
            {
              id: "payment",
              label: "Payment Methods",
              icon: <CreditCard size={18} className="mr-3" />,
            },
            {
              id: "security",
              label: "Security",
              icon: <Shield size={18} className="mr-3" />,
            },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              variants={tabVariants}
              animate={activeSection === tab.id ? "active" : "inactive"}
              whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.1)" }}
              onClick={() => setActiveSection(tab.id)}
              className="w-full py-3 px-4 text-left rounded-lg flex items-center border-l-4 transition-all"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            className="w-full py-3 text-rose-500 font-medium flex items-center justify-center"
            onClick={onDeleteClick}
          >
            <Trash2 size={16} className="mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
