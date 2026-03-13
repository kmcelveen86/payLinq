"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Clock, RotateCcw, TrendingUp, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function RewardsDisclosurePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #2D9642 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Gift size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Rewards Program Disclosure</h1>
              <p className="text-gray-400 text-lg">Last Updated: March 3, 2026</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Gift size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Independent Rewards Program</h2>
                <p className="text-gray-300 leading-relaxed">Paylinq Points and Universal Reward Tokens (URT) are promotional rewards issued by Paylinq. These rewards are independent from merchant loyalty programs and are not issued or guaranteed by merchants or travel providers.</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                  <Clock size={24} className="text-[#C28F49]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Pending Rewards</h3>
                  <p className="text-gray-400">Rewards may remain pending until a merchant confirms a transaction. This process typically takes 30-90 days depending on the merchant&apos;s return period.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                  <RotateCcw size={24} className="text-[#C28F49]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Adjustments & Reversals</h3>
                  <p className="text-gray-400">Rewards may be adjusted or reversed if a transaction is cancelled, refunded, or determined to violate Paylinq policies.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                  <TrendingUp size={24} className="text-[#C28F49]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Variable Reward Values</h3>
                  <p className="text-gray-400">Reward values may vary depending on merchant category, promotional campaigns, membership tier, or affiliate commission structure.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                  <AlertCircle size={24} className="text-[#C28F49]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Guarantee</h3>
                  <p className="text-gray-400">Paylinq does not guarantee specific reward rates or availability. All rewards are subject to change without notice.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Reward Conversion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-[#2D9642] mb-1">1,000</p>
                <p className="text-gray-400 text-sm">Paylinq Points</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-gray-500">=</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-[#C28F49] mb-1">1 URT</p>
                <p className="text-gray-400 text-sm">Universal Reward Token</p>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-center">1 URT = $10 value (White Tier)</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Mail size={24} className="text-[#C28F49]" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            </div>
            <p className="text-gray-400 mb-4">For questions about our rewards program:</p>
            <div className="space-y-2 text-gray-400">
              <p>Email: <a href="mailto:support@getpaylinq.com" className="text-[#C28F49] hover:underline">support@getpaylinq.com</a></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
              <span>← Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
      <PaylinqFooter />
    </>
  );
}
