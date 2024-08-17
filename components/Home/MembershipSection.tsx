"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MembershipSection() {
  return (
    <div className="bg-white py-16 px-4 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          Membership Tiers and Benefits
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Freemium Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[272px] h-[448px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Freemium</h3>
            <ul className="text-sm space-y-2">
              <li>✔ Access to Lifestyle Junction (Partner Merchants)</li>
              <li>✔ 1x points.</li>
            </ul>
          </div>
          <p className="mt-6 font-bold">Free</p>
        </div>

        {/* Lifestyle Card */}
        <div className="bg-yellow-500 p-6 rounded-lg shadow-lg w-[272px] h-[448px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-black mb-4">Lifestyle</h3>
            <ul className="text-sm space-y-2 text-black">
              <li>✔ All Freemium features, plus:</li>
              <li>✔ Access to exclusive deals and promotions.</li>
              <li>✔ 2x points.</li>
              <li>✔ Discount on Lifestyle Junction purchases</li>
            </ul>
          </div>
          <p className="mt-6 font-bold text-black">$20</p>
        </div>

        {/* VIP Lifestyle Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[272px] h-[448px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">VIP Lifestyle</h3>
            <p className="text-sm">coming soon</p>
          </div>
        </div>

        {/* Luxury Lifestyle Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[272px] h-[448px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Luxury Lifestyle</h3>
            <p className="text-sm">coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}