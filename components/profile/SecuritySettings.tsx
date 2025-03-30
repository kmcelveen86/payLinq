"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";
import ChevronRight from "./ChevronRight";
import { useUpdatePassword } from "@/app/hooks/usePasswordUpdate";

interface LoginEntry {
  device: string;
  location: string;
  time: string;
  current?: boolean;
}

interface Props {
  loginHistory: LoginEntry[];
  onLogoutDevice: (device: string) => void;
}

const SecuritySettings = ({ loginHistory, onLogoutDevice }: Props) => {
  const { register, handleSubmit, errors, isPending, isError, watch } =
    useUpdatePassword();

  // Add state to track password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get values from form to compare
  const watchNewPassword = watch("newPassword");
  const watchConfirmPassword = watch("confirmPassword");
  const watchCurrentPassword = watch("currentPassword");

  const allEmpty = !watchNewPassword && !watchConfirmPassword && !watchCurrentPassword;

  const newPwError = errors.newPassword?.message;
  const confirmPwError = errors.confirmPassword?.message;
  const currentPwError = errors.currentPassword?.message;
  const hasError = !!(newPwError || confirmPwError || currentPwError);

  // Add check for password mismatch
  const passwordsMatch = watchNewPassword === watchConfirmPassword;
  const mismatchError = !!(
    watchNewPassword &&
    watchConfirmPassword &&
    !passwordsMatch
  );

  return (
    <motion.div
      key="security"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
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
          <h3 className="text-lg font-medium mb-4">Change Password</h3>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  {...register("currentPassword")}
                  type={showCurrentPassword ? "text" : "password"}
                  className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {currentPwError && (
                <p className="mt-1 text-sm text-red-500">{currentPwError}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {newPwError && (
                <p className="mt-1 text-sm text-red-500">{newPwError}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {confirmPwError && (
                <p className="mt-1 text-sm text-red-500">{confirmPwError}</p>
              )}
              {mismatchError && !confirmPwError && (
                <p className="mt-1 text-sm text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Feedback and submit button */}
            {watchNewPassword && watchConfirmPassword && passwordsMatch && (
              <p className="text-sm text-green-500">Passwords match!</p>
            )}

            <div className="flex justify-end">
              <motion.button
                disabled={hasError || mismatchError || allEmpty}
                type="button"
                onClick={() => handleSubmit()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white ${
                  hasError || mismatchError || allEmpty
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isPending ? "Updating..." : "Update Password"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="text-xs bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full">
              Not Enabled
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            {`Add an extra layer of security to your account by enabling
            two-factor authentication. We'll send you a verification code to
            your phone whenever you sign in.`}
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
          <h3 className="text-lg font-medium mb-4">Recent Login Activity</h3>
          <div className="space-y-3">
            {loginHistory.map((login, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-gray-600 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center">
                    <p className="text-white font-medium">{login.device}</p>
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
                    onClick={() => onLogoutDevice(login.device)}
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
  );
};

export default SecuritySettings;
