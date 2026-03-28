"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Gift, BadgeCheck, Layers, RefreshCw, Building2, Tag, Landmark, FileText, Mail } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function LegalCompliancePage() {
  const sections = [
    { icon: Scale, title: "1. Affiliate Relationships", content: "Paylinq participates in affiliate marketing and referral programs with various merchants, travel providers, and service platforms. When users access merchants through Paylinq links, widgets, or integrations, Paylinq may earn a commission or referral fee.\n\nThese commissions are paid by merchants and do not increase the price paid by the consumer." },
    { icon: Gift, title: "2. Independent Rewards Program", content: "Paylinq Cash and Universal Reward Tokens (URT) are promotional incentives issued solely by Paylinq unless explicitly stated otherwise. Merchant partners do not issue or control Paylinq rewards." },
    { icon: BadgeCheck, title: "3. Price Integrity", content: "Paylinq does not alter merchant pricing, add hidden charges, or manipulate discounts. Affiliate commissions are paid from merchant marketing budgets." },
    { icon: Layers, title: "4. Merchant Loyalty Compatibility", content: "Using Paylinq does not prevent customers from receiving merchant loyalty points, credit card rewards, or membership benefits." },
    { icon: RefreshCw, title: "5. Reward Tracking and Validation", content: "Rewards may initially appear as pending until merchant confirmation. Paylinq reserves the right to adjust or reverse rewards in cases of cancellations, refunds, fraud, or policy violations." },
    { icon: Building2, title: "6. Affiliate Network Compliance", content: "Paylinq strives to comply with the policies of participating affiliate networks and merchant programs. Paylinq does not encourage artificial transactions, misleading promotions, or prohibited advertising methods." },
    { icon: Tag, title: "7. Brand and Trademark Use", content: "All trademarks and brand names belong to their respective owners. Their appearance on Paylinq does not imply endorsement or partnership unless explicitly stated." },
    { icon: Landmark, title: "8. Platform Role", content: "Paylinq operates as a referral and rewards platform. Paylinq is generally not the merchant of record and does not control product fulfillment, travel reservations, or merchant services." },
    { icon: FileText, title: "9. Reward Estimates", content: "Displayed rewards may be estimates until final confirmation by the merchant or affiliate network." },
    { icon: Scale, title: "10. Regulatory Commitment", content: "Paylinq aims to comply with applicable advertising, consumer protection, and affiliate marketing regulations." },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #2D9642 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Scale size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal & Affiliate Compliance</h1>
              <p className="text-gray-400 text-lg">Last Updated: March 3, 2026</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">This disclosure outlines Paylinq&apos;s compliance with affiliate marketing regulations, our relationship with merchants and partners, and our commitment to transparency in all operations.</p>
          </motion.div>

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + idx * 0.05 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                    <section.icon size={24} className="text-[#C28F49]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mt-6">
            <h2 className="text-xl font-semibold text-white mb-3">11. Updates</h2>
            <p className="text-gray-400">This disclosure may be updated periodically.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Mail size={24} className="text-[#C28F49]" />
              </div>
              <h2 className="text-2xl font-semibold text-white">12. Contact</h2>
            </div>
            <div className="space-y-2 text-gray-400">
              <p className="font-medium text-white">Compliance Team</p>
              <p>Email: <a href="mailto:compliance@getpaylinq.com" className="text-[#C28F49] hover:underline">compliance@getpaylinq.com</a></p>
              <p>Website: <Link href="/" className="text-[#C28F49] hover:underline">https://www.getpaylinq.com</Link></p>
            </div>
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
