"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, Car, Building2, AlertTriangle, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function TravelDisclaimerPage() {
  const services = [
    { icon: Plane, title: "Flights", description: "Domestic and international flights from major airlines" },
    { icon: Hotel, title: "Hotels", description: "Accommodations worldwide, from budget to luxury" },
    { icon: Car, title: "Car Rentals", description: "Rental vehicles at destinations worldwide" },
    { icon: Building2, title: "Vacation Packages", description: "Bundled deals for complete travel experiences" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #C28F49 0%, transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
                <Plane size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Services Disclaimer</h1>
              <p className="text-gray-400 text-lg">Last Updated: March 3, 2026</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Building2 size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Providers</h2>
                <p className="text-gray-300 leading-relaxed">Travel products and services displayed on Paylinq are provided by independent travel partners including airlines, hotels, cruise lines, and travel agencies. Paylinq is not a travel agency and is not the merchant of record for most bookings.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                    <service.icon size={20} className="text-[#C28F49]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <AlertTriangle size={24} className="text-[#C28F49]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Important Information</h2>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C28F49] mt-1">•</span>
                    <span>All travel reservations, payments, and fulfillment are handled directly by the travel provider or booking partner.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C28F49] mt-1">•</span>
                    <span>Paylinq may receive referral commissions from travel partners for qualifying bookings made through Paylinq links, widgets, or integrations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C28F49] mt-1">•</span>
                    <span>Travel availability, pricing, cancellation policies, and customer support are determined solely by the travel provider.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C28F49] mt-1">•</span>
                    <span>Paylinq is not responsible for changes, cancellations, or issues with travel bookings.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Earning Rewards on Travel</h2>
            <p className="text-gray-400 mb-4">When you book travel through Paylinq, you can earn Paylinq Points on qualifying bookings:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { category: "Flights", points: "200 PP" },
                { category: "Hotels", points: "400 PP" },
                { category: "Car Rentals", points: "300 PP" },
                { category: "Vacation Packages", points: "600 PP" },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <p className="text-[#C28F49] font-bold">{item.points}</p>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-4 text-sm">Monthly travel earning cap: 4,000 PP. Rewards are credited after booking confirmation.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center">
                <Mail size={24} className="text-[#C28F49]" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Questions About Travel?</h2>
            </div>
            <p className="text-gray-400 mb-4">For travel-related inquiries, please contact the travel provider directly. For questions about Paylinq rewards on travel bookings:</p>
            <div className="space-y-2 text-gray-400">
              <p>Email: <a href="mailto:support@getpaylinq.com" className="text-[#C28F49] hover:underline">support@getpaylinq.com</a></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="mt-12 text-center">
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
