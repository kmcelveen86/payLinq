"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, HandCoins, Store, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function AffiliateDisclosurePage() {
  const highlights = [
    { icon: Link2, title: "Affiliate Partnerships", description: "We partner with trusted merchants and service providers to bring you valuable offers and rewards." },
    { icon: HandCoins, title: "No Cost to You", description: "Our affiliate commissions are paid by merchants, not by you. You pay the same price whether you use Paylinq or go directly to the merchant." },
    { icon: Store, title: "Direct Fulfillment", description: "All purchases and bookings are completed directly with the merchant or travel provider, not through Paylinq." },
    { icon: ArrowLeftRight, title: "Independent Platform", description: "Paylinq does not control pricing, availability, or fulfillment. Merchants set their own terms." },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #C28F49 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Link2 size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Affiliate Disclosure</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Transparency about how Paylinq earns commissions and how it benefits our rewards program</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">Paylinq participates in affiliate marketing programs. This means Paylinq may earn a commission when users click certain links or complete purchases or travel bookings through our platform.</p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">These commissions help fund Paylinq Points and other promotional rewards, allowing us to provide you with valuable cashback and incentives.</p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">Purchases and bookings are completed directly with the merchant or travel provider, and Paylinq does not control pricing, availability, or fulfillment.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {highlights.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                    <item.icon size={24} className="text-[#C28F49]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">How Affiliate Relationships Work</h2>

            <div className="space-y-6">
              {[
                { step: "1", title: "You Shop Through Paylinq", description: "Browse offers and click through to merchant websites using Paylinq links." },
                { step: "2", title: "Merchant Pays Commission", description: "When you make a purchase, the merchant pays Paylinq a referral commission." },
                { step: "3", title: "You Earn Rewards", description: "We share a portion of that commission with you as Paylinq Points." },
                { step: "4", title: "Everyone Wins", description: "You get cashback, the merchant gets a customer, and Paylinq keeps the platform running." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] flex items-center justify-center text-white font-bold text-sm">{item.step}</div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="mt-12 text-center">
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
