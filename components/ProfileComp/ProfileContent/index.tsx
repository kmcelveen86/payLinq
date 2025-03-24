"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressForm from "./AddressForm";
import NotificationsForm from "./NotificationsForm";
import PaymentMethods from "./PaymentMethods";
import SecuritySettings from "./SecuritySettings";

interface ProfileContentProps {
  activeSection: string;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  saveSuccess: boolean;
  loading: boolean;
  paymentMethods: any[];
  handleEditPayment: (id: string) => void;
  handleDeletePayment: (id: string) => void;
  handleAddPayment: () => void;
  loginHistory: any[];
  handleLogoutDevice: (device: string) => void;
  lastUpdatedText: string;
}

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

const ProfileContent = ({
  activeSection,
  formData,
  onChange,
  onSubmit,
  saveSuccess,
  loading,
  paymentMethods,
  handleEditPayment,
  handleDeletePayment,
  handleAddPayment,
  loginHistory,
  handleLogoutDevice,
  lastUpdatedText,
}: ProfileContentProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="lg:col-span-3"
    >
      <form onSubmit={onSubmit}>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl border border-gray-700">
          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.div
                key="personal"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <PersonalInfoForm
                  formData={formData}
                  onChange={onChange}
                  lastUpdatedText={lastUpdatedText}
                />
              </motion.div>
            )}

            {activeSection === "address" && (
              <motion.div
                key="address"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <AddressForm
                  formData={formData}
                  onChange={onChange}
                  lastUpdatedText={lastUpdatedText}
                />
              </motion.div>
            )}

            {activeSection === "notifications" && (
              <motion.div
                key="notifications"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <NotificationsForm
                  notifications={formData.notifications}
                  onChange={onChange}
                />
              </motion.div>
            )}

            {activeSection === "payment" && (
              <motion.div
                key="payment"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <PaymentMethods
                  paymentMethods={paymentMethods}
                  onEdit={handleEditPayment}
                  onDelete={handleDeletePayment}
                  onAdd={handleAddPayment}
                />
              </motion.div>
            )}

            {activeSection === "security" && (
              <motion.div
                key="security"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <SecuritySettings
                  loginHistory={loginHistory}
                  onLogout={handleLogoutDevice}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Save Button */}
          <div className="bg-gray-800 border-t border-gray-700 rounded-b-xl p-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white flex items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileContent;
