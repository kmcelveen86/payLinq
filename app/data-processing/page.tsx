"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Link2, ClipboardCheck, Shield, Minimize2, Users, Mail } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function DataProcessingPage() {
  const sections = [
    { icon: Database, title: "1. Platform Role", content: "Paylinq operates as a rewards infrastructure and referral technology platform. Paylinq connects users with merchants, travel providers, and service partners through affiliate relationships and referral integrations. In most cases, Paylinq is not the merchant of record and does not process the underlying transaction between the user and the merchant." },
    { icon: Link2, title: "2. Affiliate Referral Tracking", content: "When users click on links, widgets, or integrations provided through Paylinq, referral tracking technology may be used to attribute the transaction to Paylinq. Tracking mechanisms may include:", bullets: ["Cookies", "Unique referral identifiers", "Session tracking", "Affiliate network tracking parameters"], footer: "These systems allow affiliate networks and merchants to confirm qualifying transactions and calculate referral commissions." },
    { icon: ClipboardCheck, title: "3. Transaction Confirmation Data", content: "Affiliate networks and merchant partners may share limited transaction confirmation data with Paylinq to verify reward eligibility. This data may include:", bullets: ["Transaction confirmation status", "Purchase category", "Purchase amount or range", "Order identifier", "Reward eligibility information"], footer: "Paylinq generally does not receive full payment card numbers or sensitive financial details." },
    { icon: Shield, title: "4. Reward Validation", content: "Transaction data received from affiliate networks or merchant partners is used to validate eligibility for Paylinq Points and Universal Reward Tokens (URT). Rewards may remain in a pending state until merchants confirm that the transaction is completed and not refunded, cancelled, or reversed." },
    { icon: Shield, title: "5. Fraud Prevention and Compliance", content: "Paylinq may monitor traffic sources, user activity, and referral behavior to prevent fraud, abuse, or violations of affiliate network policies. Transactions suspected of fraud, artificial activity, or policy violations may be reviewed, adjusted, or disqualified from receiving rewards." },
    { icon: Minimize2, title: "6. Data Minimization", content: "Paylinq limits the collection and retention of personal information to what is necessary for platform functionality, referral validation, rewards processing, fraud prevention, and legal compliance." },
    { icon: Users, title: "7. Third-Party Partners", content: "Affiliate networks, merchants, travel providers, analytics services, and payment processors may process data related to user activity when interacting with Paylinq links or services. These partners operate under their own privacy policies and data processing practices." },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #C28F49 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Database size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Processing & Tracking Disclosure</h1>
              <p className="text-gray-400 text-lg">Last Updated: March 3, 2026</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                    <section.icon size={24} className="text-[#C28F49]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">{section.content}</p>
                    {section.bullets && (
                      <ul className="space-y-2 mb-4">
                        {section.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="flex items-center gap-3 text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-[#2D9642]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.footer && <p className="text-gray-400 leading-relaxed italic border-l-2 border-[#C28F49] pl-4">{section.footer}</p>}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                  <Mail size={24} className="text-[#C28F49]" />
                </div>
                <h2 className="text-2xl font-semibold text-white">8. Contact</h2>
              </div>
              <p className="text-gray-400 mb-4">For questions regarding data processing or tracking practices:</p>
              <div className="space-y-2 text-gray-400">
                <p className="font-medium text-white">Paylinq Compliance Team</p>
                <p>Email: <a href="mailto:compliance@getpaylinq.com" className="text-[#C28F49] hover:underline">compliance@getpaylinq.com</a></p>
                <p>Website: <Link href="/" className="text-[#C28F49] hover:underline">https://www.getpaylinq.com</Link></p>
              </div>
            </motion.div>
          </div>

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
