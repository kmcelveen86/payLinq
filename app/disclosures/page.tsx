"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Link2, Scale, Database, Gift, Plane, AlertTriangle } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function DisclosuresPage() {
  const disclosures = [
    {
      icon: Link2,
      title: "Affiliate Disclosure",
      description: "Paylinq participates in affiliate marketing programs and may earn commissions when users click links or complete purchases.",
      href: "/affiliate-disclosure",
    },
    {
      icon: Scale,
      title: "Legal & Compliance",
      description: "Our commitment to affiliate marketing regulations, price integrity, and transparent business practices.",
      href: "/legal-compliance",
    },
    {
      icon: Database,
      title: "Data Processing",
      description: "How we process and track data, including affiliate referral tracking and transaction confirmation.",
      href: "/data-processing",
    },
    {
      icon: Gift,
      title: "Rewards Program",
      description: "Details about Paylinq Cash and Universal Reward Tokens, including pending status and adjustments.",
      href: "/rewards-disclosure",
    },
    {
      icon: Plane,
      title: "Travel Services",
      description: "Information about travel bookings, third-party providers, and referral commissions.",
      href: "/travel-disclaimer",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #C28F49 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <AlertTriangle size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclosures</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Important information about our affiliate relationships, data practices, and legal compliance.</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <FileText size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Transparency First</h2>
                <p className="text-gray-300 leading-relaxed">At Paylinq, we believe in complete transparency. The following disclosures outline our affiliate relationships, data practices, legal compliance, and how our rewards program works. We encourage all users to review these documents to understand how we operate.</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {disclosures.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}>
                <Link href={item.href} className="block bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={28} className="text-[#C28F49]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#C28F49] transition-colors">{item.title}</h3>
                        <svg className="w-5 h-5 text-gray-600 group-hover:text-[#C28F49] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Summary</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2D9642] mt-2" />
                <span>We earn commissions from merchants when you make purchases through our links</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2D9642] mt-2" />
                <span>These commissions help fund the rewards you earn</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2D9642] mt-2" />
                <span>We use cookies and tracking for affiliate attribution</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2D9642] mt-2" />
                <span>We are not the merchant of record for transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2D9642] mt-2" />
                <span>Rewards may remain pending until merchant confirmation</span>
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} className="mt-12 text-center">
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
