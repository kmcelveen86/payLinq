"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, Shield, AlertCircle } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: Scale,
      title: "1. Acceptance of Terms",
      content: `These Terms of Service ("Terms") govern your access to and use of the Paylinq platform, website, applications, and related services (collectively, the "Platform"). By accessing or using Paylinq, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with these Terms, you should not use the Platform.`,
    },
    {
      icon: Shield,
      title: "2. Description of Services",
      content: `Paylinq is a rewards and referral platform that allows users to discover merchants, travel services, and partner offers while earning Paylinq Points ("PP") through qualifying activities. Points may be converted into Universal Reward Tokens ("URT") subject to Paylinq policies and eligibility requirements.`,
    },
    {
      icon: FileText,
      title: "3. User Accounts",
      content: `To access certain features, users may be required to create an account. Users agree to provide accurate and complete information during registration, maintain the security of their account credentials, and notify Paylinq of any unauthorized access or security breach. Users are responsible for all activity occurring under their accounts.`,
    },
    {
      title: "4. Eligibility",
      content: `Paylinq services are intended for individuals 18 years of age or older. By using the Platform, you represent that you meet this eligibility requirement.`,
    },
    {
      title: "5. Rewards Program",
      content: `Paylinq Points and Universal Reward Tokens are promotional incentives issued by Paylinq. Rewards may remain pending until merchant confirmation, be adjusted for cancellations, refunds, or transaction changes, and be withheld or reversed in cases of fraud, abuse, or policy violations. Paylinq reserves the right to modify reward structures, redemption requirements, and eligibility criteria at any time.`,
    },
    {
      title: "6. Merchant and Travel Partner Transactions",
      content: `Transactions made through Paylinq links or integrations are completed directly with merchants or travel providers. Paylinq does not control merchant pricing, availability, or policies, is not responsible for product fulfillment or travel services, and does not guarantee the quality or performance of third-party services.`,
    },
    {
      title: "7. Affiliate Relationships",
      content: `Paylinq may receive commissions from merchants or affiliate networks when users complete qualifying purchases or bookings through Paylinq links, widgets, or integrations. These commissions help fund Paylinq Points and promotional incentives.`,
    },
    {
      title: "8. Paid Membership Tiers",
      content: `Paylinq may offer paid membership tiers that provide enhanced platform features or reward benefits. Payments for paid tiers are processed through third-party payment processors. Paylinq does not store full credit card numbers. Membership fees may be billed on a recurring basis depending on the subscription plan selected.`,
    },
    {
      icon: AlertCircle,
      title: "9. Prohibited Activities",
      content: `Users agree not to engage in fraudulent or artificial transactions, attempt to manipulate rewards or referral tracking systems, use automated scripts, bots, or other unauthorized tools, misrepresent identity or account information, or violate affiliate network or merchant policies.`,
    },
    {
      title: "10. Account Suspension or Termination",
      content: `Paylinq may suspend or terminate accounts at its discretion if users violate these Terms, engage in fraud, or misuse the platform. Upon termination, users may lose access to their account and any pending or unredeemed rewards.`,
    },
    {
      title: "11. Intellectual Property",
      content: `All platform content, trademarks, logos, software, and design elements are the property of Paylinq or its licensors unless otherwise stated. Users may not copy, reproduce, distribute, or modify Paylinq intellectual property without authorization.`,
    },
    {
      title: "12. Limitation of Liability",
      content: `To the maximum extent permitted by law, Paylinq shall not be liable for indirect, incidental, or consequential damages resulting from the use of the platform or transactions conducted with third-party merchants. Paylinq provides its services on an "as is" and "as available" basis without warranties of any kind.`,
    },
    {
      title: "13. Changes to Services",
      content: `Paylinq may modify, suspend, or discontinue platform features, reward programs, or services at any time without prior notice.`,
    },
    {
      title: "14. Governing Law",
      content: `These Terms shall be governed by and interpreted under the laws of the State of Georgia, United States, without regard to conflict-of-law principles.`,
    },
    {
      title: "15. Changes to These Terms",
      content: `Paylinq may update these Terms periodically. Continued use of the platform after updates indicates acceptance of the revised Terms.`,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #2D9642 0%, transparent 70%)",
            }}
          />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Scale size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-400 text-lg">
                Last Updated: March 3, 2026
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  {section.icon && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                      <section.icon
                        size={20}
                        className="text-[#C28F49]"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                16. Contact Information
              </h2>
              <div className="space-y-2 text-gray-400">
                <p className="font-medium text-white">Paylinq Legal Team</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:legal@getpaylinq.com"
                    className="text-[#C28F49] hover:underline"
                  >
                    legal@getpaylinq.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <Link
                    href="/"
                    className="text-[#C28F49] hover:underline"
                  >
                    https://www.getpaylinq.com
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span>← Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
      <PaylinqFooter />
    </>
  );
}
