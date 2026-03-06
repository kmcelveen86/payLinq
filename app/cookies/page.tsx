"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cookie, Shield, BarChart3, Link2, Megaphone, Clock, Settings, Mail } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "These cookies are required for core platform functionality such as account login, security, and session management.",
      required: true,
    },
    {
      icon: BarChart3,
      title: "Performance and Analytics Cookies",
      description: "These cookies collect information about how users interact with the Paylinq platform, such as pages visited, features used, and general traffic patterns. This information helps improve platform performance and usability.",
      required: false,
    },
    {
      icon: Link2,
      title: "Affiliate Tracking Cookies",
      description: "When users access merchants through Paylinq links or integrations, affiliate networks may place tracking cookies on the user's device. These cookies help confirm that a referral originated from Paylinq and allow commissions and rewards to be properly attributed.",
      required: false,
    },
    {
      icon: Megaphone,
      title: "Marketing and Measurement Cookies",
      description: "Paylinq or its partners may use cookies to measure marketing campaign performance, track referral sources, and improve promotional effectiveness.",
      required: false,
    },
  ];

  const thirdParties = ["Affiliate networks", "Travel providers", "Analytics services", "Payment processors"];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #2D9642 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Cookie size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-gray-400 text-lg">Last Updated: March 3, 2026</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies</h2>
            <p className="text-gray-300 leading-relaxed">Cookies are small text files stored on your device when you visit a website. Cookies help websites remember user preferences, improve performance, and enable certain platform features.</p>
            <p className="text-gray-300 leading-relaxed mt-4">Paylinq uses cookies and similar technologies to operate the platform, track affiliate referrals, and improve user experience.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Types of Cookies We Use</h2>
            <div className="space-y-4">
              {cookieTypes.map((type, idx) => (
                <div key={idx} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                      <type.icon size={24} className="text-[#C28F49]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                        {type.required && <span className="px-2 py-1 rounded-full bg-[#2D9642]/20 text-[#2D9642] text-xs font-medium">Required</span>}
                      </div>
                      <p className="text-gray-400 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-400 mb-4">Some cookies may be placed by third-party partners including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {thirdParties.map((party, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-[#C28F49]" />
                  {party}
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-4 text-sm">These third parties operate under their own privacy and cookie policies.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Clock size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Cookie Duration</h2>
                <p className="text-gray-400 leading-relaxed">Cookies may remain active for different time periods depending on their purpose. Some cookies expire when the browsing session ends, while others may remain active for a defined period to allow referral tracking and reward validation.</p>
                <p className="text-gray-400 leading-relaxed mt-3">Affiliate tracking cookies may remain active for periods defined by the affiliate network or merchant partner.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Settings size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
                <p className="text-gray-400 leading-relaxed">Users can control cookie preferences through their web browser settings. Most browsers allow users to block or delete cookies.</p>
                <div className="mt-4 p-4 bg-[#2D9642]/10 rounded-lg border border-[#2D9642]/30">
                  <p className="text-[#C28F49] text-sm"><strong>Please note:</strong> Disabling cookies may limit certain features of the Paylinq platform, including referral tracking and reward validation.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Updates to This Policy</h2>
            <p className="text-gray-400">Paylinq may update this Cookie Policy periodically to reflect changes in technology, legal requirements, or platform functionality.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Mail size={24} className="text-[#C28F49]" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
            </div>
            <div className="space-y-2 text-gray-400">
              <p className="font-medium text-white">Paylinq Privacy Team</p>
              <p>Email: <a href="mailto:privacy@getpaylinq.com" className="text-[#C28F49] hover:underline">privacy@getpaylinq.com</a></p>
              <p>Website: <Link href="/" className="text-[#C28F49] hover:underline">https://www.getpaylinq.com</Link></p>
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
