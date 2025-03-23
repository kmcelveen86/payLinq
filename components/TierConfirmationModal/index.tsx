// src/components/TierConfirmationModal.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, AlertTriangle, CheckCircle, Award } from "lucide-react";

interface TierConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tierName: string;
  price: number;
  isAnnual: boolean;
  isPending: boolean;
  isFreemium?: boolean; // Add this prop to identify Freemium tier
}

const TierConfirmationModal: React.FC<TierConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tierName,
  price,
  isAnnual,
  isPending,
  isFreemium = false, // Default to false for backward compatibility
}) => {
  // Calculate the billing amount based on annual vs monthly
  const billingAmount = isAnnual ? price * 12 * 0.85 : price;
  const billingCycle = isAnnual ? "annually" : "monthly";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isPending}
              >
                <X size={20} />
              </button>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center mr-4">
                  {isFreemium ? (
                    <Award className="h-6 w-6 text-[#C28F49]" />
                  ) : (
                    <Shield className="h-6 w-6 text-[#2D9642]" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {isFreemium
                    ? "Confirm Free Membership"
                    : "Confirm Membership Upgrade"}
                </h2>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  {isFreemium ? (
                    <>
                      {`You're about to start your `}
                      <span className="font-semibold text-gray-800">
                        Freemium
                      </span>{" "}
                      membership.
                    </>
                  ) : (
                    <>
                      {` You're about to upgrade your membership to the `}
                      <span className="font-semibold text-gray-800">
                        {tierName}
                      </span>{" "}
                      tier with {billingCycle} billing.
                    </>
                  )}
                </p>

                {/* Only show payment details for paid tiers */}
                {price > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Membership tier:</span>
                      <span className="font-medium text-gray-800">
                        {tierName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Billing cycle:</span>
                      <span className="font-medium text-gray-800">
                        {isAnnual ? "Annual" : "Monthly"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                      <span className="text-gray-600">Total amount:</span>
                      <span className="font-bold text-gray-800">
                        ${billingAmount.toFixed(2)}{" "}
                        {isAnnual ? "/year" : "/month"}
                      </span>
                    </div>
                  </div>
                )}

                {/* For Freemium, show benefits instead of payment details */}
                {isFreemium && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center mb-2">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-700">
                        1x points on everyday purchases
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-700">
                        2x points on dining & travel
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-700">
                        Access to Paylinq Rewards Debit Card
                      </span>
                    </div>
                  </div>
                )}

                {price > 0 && (
                  <div className="flex items-start mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertTriangle
                      size={18}
                      className="text-amber-500 mt-0.5 mr-2 shrink-0"
                    />
                    <p className="text-sm text-amber-700">
                      {`Hey ya'll this is just the demo app. No actual charges are processed 😎.`}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  disabled={isPending}
                  className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Processing...
                    </span>
                  ) : isFreemium ? (
                    "Get Free Membership"
                  ) : (
                    "Confirm Upgrade"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TierConfirmationModal;
