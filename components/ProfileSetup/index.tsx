"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  ChevronRight,
  Shield,
  CreditCard,
} from "lucide-react";

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(currentStep + 1);
    }, 500);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Here you would handle the form submission to your backend
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(4); // Move to success step
    }, 1000);
  };

  const isStepOneValid =
    formData.firstName && formData.lastName && formData.email;
  const isStepTwoValid = formData.phone && formData.dob;
  const isStepThreeValid =
    formData.address &&
    formData.city &&
    formData.state &&
    formData.zipCode &&
    formData.agreedToTerms;

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
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

      <div className="w-full max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <CreditCard className="h-12 w-12 text-[#2D9642] mr-2" />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              Paylinq
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-gray-400">
            Let's set up your account to get the most out of Paylinq
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 relative"
        >
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#2D9642] to-[#C28F49]"
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-[#2D9642]" : "bg-gray-600"
                }`}
              >
                <User size={16} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-gray-400">Basic Info</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-[#2D9642]" : "bg-gray-600"
                }`}
              >
                <Phone size={16} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-gray-400">Contact</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-[#2D9642]" : "bg-gray-600"
                }`}
              >
                <MapPin size={16} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-gray-400">Address</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 4 ? "bg-[#C28F49]" : "bg-gray-600"
                }`}
              >
                <CreditCard size={16} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-gray-400">Complete</span>
            </div>
          </div>
        </motion.div>

        {/* Form card */}
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="space-y-6"
              >
                <motion.div variants={fadeInVariants} className="space-y-6">
                  <motion.div
                    variants={childVariants}
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      Basic Information
                    </h3>
                    <span className="bg-[#2D9642]/20 text-[#2D9642] text-xs px-3 py-1 rounded-full">
                      Step 1 of 3
                    </span>
                  </motion.div>

                  <motion.div
                    variants={childVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={childVariants}>
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      We'll never share your email with anyone else.
                    </p>
                  </motion.div>

                  <div className="flex justify-between items-center pt-4">
                    <div></div> {/* Empty div for spacing */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStepOneValid || loading}
                      className={`flex items-center px-6 py-2 bg-gradient-to-r ${
                        isStepOneValid
                          ? "from-[#2D9642] to-[#C28F49]"
                          : "from-gray-600 to-gray-500"
                      } rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-70`}
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
                          Continue <ChevronRight size={16} className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="space-y-6"
              >
                <motion.div variants={fadeInVariants} className="space-y-6">
                  <motion.div
                    variants={childVariants}
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      Contact Information
                    </h3>
                    <span className="bg-[#2D9642]/20 text-[#2D9642] text-xs px-3 py-1 rounded-full">
                      Step 2 of 3
                    </span>
                  </motion.div>

                  <motion.div variants={childVariants}>
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={childVariants}>
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
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      You must be at least 18 years old to use Paylinq.
                    </p>
                  </motion.div>

                  <motion.div variants={childVariants} className="mt-4">
                    <div className="flex items-center p-4 rounded-lg bg-[#2D9642]/10 border border-[#2D9642]/20">
                      <Shield
                        size={20}
                        className="text-[#2D9642] mr-3 flex-shrink-0"
                      />
                      <p className="text-sm text-gray-300">
                        Your personal information is secure and will only be
                        used for verification purposes.
                      </p>
                    </div>
                  </motion.div>

                  <div className="flex justify-between items-center pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 border border-gray-600 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStepTwoValid || loading}
                      className={`flex items-center px-6 py-2 bg-gradient-to-r ${
                        isStepTwoValid
                          ? "from-[#2D9642] to-[#C28F49]"
                          : "from-gray-600 to-gray-500"
                      } rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-70`}
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
                          Continue <ChevronRight size={16} className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Address Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="space-y-6"
              >
                <motion.div variants={fadeInVariants} className="space-y-6">
                  <motion.div
                    variants={childVariants}
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      Address Information
                    </h3>
                    <span className="bg-[#2D9642]/20 text-[#2D9642] text-xs px-3 py-1 rounded-full">
                      Step 3 of 3
                    </span>
                  </motion.div>

                  <motion.div variants={childVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Street Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="123 Main St"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={childVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="NY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
                        placeholder="10001"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={childVariants} className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="agreedToTerms"
                          type="checkbox"
                          checked={formData.agreedToTerms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#2D9642] focus:ring-[#2D9642] border-gray-600 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-300">
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-[#2D9642] hover:underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-[#2D9642] hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex justify-between items-center pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 border border-gray-600 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={!isStepThreeValid || loading}
                      className={`flex items-center px-6 py-2 bg-gradient-to-r ${
                        isStepThreeValid
                          ? "from-[#2D9642] to-[#C28F49]"
                          : "from-gray-600 to-gray-500"
                      } rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-70`}
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
                        "Complete Setup"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto mb-6 relative">
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-[#2D9642] to-[#C28F49] flex items-center justify-center">
                      <CheckIcon className="h-12 w-12 text-white" />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-[#2D9642] to-[#C28F49] blur-md -z-10"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    Profile Completed!
                  </h3>
                  <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    Thank you for setting up your profile. Your Paylinq account
                    is now ready to use!
                  </p>
                  <Link href="/user/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white"
                    >
                      Go to Dashboard
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// CheckIcon component
const CheckIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
