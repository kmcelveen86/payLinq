"use client";
import React, { useState, useEffect } from "react";
import ProfileSetup from "@/components/ProfileSetup";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  CreditCard,
  Edit2,
  CheckCircle,
  Shield,
  Trash2,
  PlusCircle,
  Upload,
} from "lucide-react";

// Add ChevronRight component
interface ChevronRightProps {
  size?: number;
  className?: string;
}

// Add Bell component for notifications
// TODO: move these out to live in a separate file
const Bell = (props: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <path d="M18.63 13A18.9 18.9 0 0 1 18 8" />
    <path d="M6.26 6.26A10.8 10.8 0 0 0 6 8c0 7-3 9-3 9h14" />
    <path d="M18 8a6 6 0 0 0-9.33-5" />
    <path d="m3 3 18 18" />
  </svg>
);

const ChevronRight = (props: ChevronRightProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function ProfileComp() {
  const { data: session } = useSession();
  const isNewUser = !session?.user?.name;

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // Mock existing user data
  const [userData, setUserData] = useState({
    firstName: "Greg",
    lastName: "Davis",
    email: "davisgreg1@gmail.com",
    phone: "(555) 123-4567",
    dob: "1990-05-15",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    profileImage: null as string | null, // URL to profile image would go here
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    paymentMethods: [
      {
        id: "card1",
        type: "debit",
        last4: "4832",
        expiryDate: "04/26",
        isDefault: true,
      },
    ],
  });

  // Fetch user data on component mount
  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      setLoading(true);

      try {
        // fake api call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested objects (e.g., notifications.email)
      const [parent, child] = name.split(".");
      setUserData((prevUserData) => ({
        ...prevUserData,
        [parent]: {
          ...(prevUserData[parent as keyof typeof prevUserData] as Record<
            string,
            any
          >),
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      // Handle top-level fields
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server
      // For this demo, we'll just create a local object URL
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        profileImage: imageUrl,
      });
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to save user data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // If still loading initial user data
  if (loading && !userData.firstName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#2D9642] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const tabVariants = {
    inactive: { borderColor: "transparent", color: "#9CA3AF" },
    active: {
      borderColor: "#2D9642",
      color: "#FFFFFF",
      transition: { duration: 0.3 },
    },
  };

  if (isNewUser) {
    return <ProfileSetup />;
  }

  // Existing user profile edit view
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <CreditCard className="h-8 w-8 text-[#2D9642] mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              Paylinq
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Manage Your Profile
          </h1>
        </motion.div>

        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 rounded-lg bg-[#2D9642]/20 border border-[#2D9642]/30 flex items-center"
            >
              <CheckCircle className="h-5 w-5 text-[#2D9642] mr-3" />
              <span className="text-green-400">
                Your profile has been updated successfully!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
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
                    {userData.profileImage ? (
                      <img
                        src={userData.profileImage}
                        alt={`${userData.firstName} ${userData.lastName}`}
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
                <h2 className="text-xl font-bold text-white">{`${userData.firstName} ${userData.lastName}`}</h2>
                <p className="text-gray-400 text-sm mb-4">{userData.email}</p>

                <span className="px-3 py-1 bg-[#2D9642]/20 text-[#2D9642] text-xs rounded-full mb-2">
                  Freemium Member
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
                  animate={
                    activeSection === "notifications" ? "active" : "inactive"
                  }
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
                <button className="w-full py-3 text-rose-500 font-medium flex items-center justify-center">
                  <Trash2 size={16} className="mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>

          {/* Profile Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <form onSubmit={handleSaveChanges}>
              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl border border-gray-700">
                <AnimatePresence mode="wait">
                  {/* Personal Information Section */}
                  {activeSection === "personal" && (
                    <motion.div
                      key="personal"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <User size={20} className="mr-2 text-[#2D9642]" />
                          Personal Information
                        </h2>
                        <span className="text-sm text-gray-400">
                          Last updated: 2 weeks ago
                        </span>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={userData.firstName}
                              onChange={handleInputChange}
                              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={userData.lastName}
                              onChange={handleInputChange}
                              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={16} className="text-gray-400" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={16} className="text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Date of Birth
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar size={16} className="text-gray-400" />
                            </div>
                            <input
                              type="date"
                              name="dob"
                              value={userData.dob}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Address Section */}
                  {activeSection === "address" && (
                    <motion.div
                      key="address"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <MapPin size={20} className="mr-2 text-[#2D9642]" />
                          Address Information
                        </h2>
                        <span className="text-sm text-gray-400">
                          Last updated: 2 weeks ago
                        </span>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={userData.city}
                              onChange={handleInputChange}
                              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={userData.state}
                              onChange={handleInputChange}
                              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={userData.zipCode}
                              onChange={handleInputChange}
                              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Notifications Section */}
                  {activeSection === "notifications" && (
                    <motion.div
                      key="notifications"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <Bell size={20} className="mr-2 text-[#2D9642]" />
                          Notification Preferences
                        </h2>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
                          <h3 className="text-lg font-medium mb-4">
                            Communication Channels
                          </h3>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Mail
                                  className="text-gray-400 mr-3"
                                  size={18}
                                />
                                <div>
                                  <p className="text-white">
                                    Email Notifications
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    Receive updates about your account via email
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  name="notifications.email"
                                  checked={userData.notifications.email}
                                  onChange={handleInputChange}
                                />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9642]"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Phone
                                  className="text-gray-400 mr-3"
                                  size={18}
                                />
                                <div>
                                  <p className="text-white">
                                    SMS Notifications
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    Receive important alerts via text message
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  name="notifications.sms"
                                  checked={userData.notifications.sms}
                                  onChange={handleInputChange}
                                />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9642]"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CreditCard
                                  className="text-gray-400 mr-3"
                                  size={18}
                                />
                                <div>
                                  <p className="text-white">
                                    App Notifications
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    Receive in-app notifications and alerts
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  name="notifications.app"
                                  checked={userData.notifications.app}
                                  onChange={handleInputChange}
                                />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9642]"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payment Methods Section */}
                  {activeSection === "payment" && (
                    <motion.div
                      key="payment"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <CreditCard
                            size={20}
                            className="mr-2 text-[#2D9642]"
                          />
                          Payment Methods
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {userData.paymentMethods.map((method, index) => (
                          <motion.div
                            key={method.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-700/30 rounded-lg p-5 border border-gray-600 flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <div className="p-3 bg-gray-800 rounded-lg mr-4">
                                <CreditCard
                                  className="text-[#C28F49]"
                                  size={20}
                                />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  Debit Card •••• {method.last4}
                                </p>
                                <p className="text-sm text-gray-400">
                                  Expires {method.expiryDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {method.isDefault && (
                                <span className="text-xs bg-[#2D9642]/20 text-[#2D9642] px-3 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                              <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                type="button"
                                className="p-2 text-rose-500 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </motion.div>
                        ))}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          className="w-full py-3 flex items-center justify-center space-x-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-[#2D9642] transition-colors"
                        >
                          <PlusCircle size={18} />
                          <span>Add New Payment Method</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Security Section */}
                  {/* Security Section */}
                  {activeSection === "security" && (
                    <motion.div
                      key="security"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <Shield size={20} className="mr-2 text-[#2D9642]" />
                          Security Settings
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {/* Change Password Section */}
                        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
                          <h3 className="text-lg font-medium mb-4">
                            Change Password
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                                placeholder="••••••••"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                                placeholder="••••••••"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                                placeholder="••••••••"
                              />
                            </div>

                            <div className="flex justify-end">
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                className="px-4 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white"
                              >
                                Update Password
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">
                              Two-Factor Authentication
                            </h3>
                            <div className="text-xs bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full">
                              Not Enabled
                            </div>
                          </div>

                          <p className="text-gray-400 mb-4">
                            {`Add an extra layer of security to your account by
                            enabling two-factor authentication. We'll send you a
                            verification code to your phone whenever you sign
                            in.`}
                          </p>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            className="w-full py-2.5 bg-[#2D9642]/20 text-[#2D9642] font-medium rounded-lg border border-[#2D9642]/30 hover:bg-[#2D9642]/30 transition-colors"
                          >
                            Enable Two-Factor Authentication
                          </motion.button>
                        </div>

                        {/* Login History */}
                        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
                          <h3 className="text-lg font-medium mb-4">
                            Recent Login Activity
                          </h3>

                          <div className="space-y-3">
                            {[
                              {
                                device: "iPhone 14 Pro",
                                location: "New York, NY",
                                time: "Today, 2:45 PM",
                                current: true,
                              },
                              {
                                device: "Macbook Pro",
                                location: "New York, NY",
                                time: "Yesterday, 9:30 AM",
                              },
                              {
                                device: "Chrome on Windows",
                                location: "Boston, MA",
                                time: "Oct 15, 2023, 6:15 PM",
                              },
                            ].map((login, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-3 rounded-lg border border-gray-600 flex justify-between items-center"
                              >
                                <div>
                                  <div className="flex items-center">
                                    <p className="text-white font-medium">
                                      {login.device}
                                    </p>
                                    {login.current && (
                                      <span className="ml-2 text-xs bg-[#2D9642]/20 text-[#2D9642] px-2 py-0.5 rounded-full">
                                        Current
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    {login.location} • {login.time}
                                  </p>
                                </div>
                                {!login.current && (
                                  <button
                                    type="button"
                                    className="text-rose-500 hover:text-rose-400 text-sm font-medium"
                                  >
                                    Log Out
                                  </button>
                                )}
                              </motion.div>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="mt-4 text-[#C28F49] text-sm font-medium hover:text-[#D9A55C] flex items-center"
                          >
                            View Full Login History
                            <ChevronRight size={16} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer with Save Button */}
                <div className="bg-gray-800 border-t border-gray-700 rounded-b-xl p-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white flex items-center"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
