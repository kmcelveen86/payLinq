"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Landmark,
  Shield,
  Star,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  ChevronRight,
  ArrowUp,
} from "lucide-react";


const PaylinqFooter = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Debit Card", href: "/products/debit-card" },
        { name: "Rewards Program", href: "/products/rewards" },
        { name: "Partner Benefits", href: "/products/benefits" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "FAQs", href: "/faqs" },
        { name: "Blog", href: "/blog" },
        { name: "Support Center", href: "/support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Disclosures", href: "/disclosures" },
      ],
    },
  ];

  if (!isMounted) return null;

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: "linear-gradient(90deg, #2D9642, #C28F49)" }}
      ></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: "translate(-30%, 30%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top section with logo and mission */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16 border-b border-gray-800 pb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center">
                <CreditCard size={32} className="text-white mr-3" />
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #2D9642, #C28F49)",
                  }}
                >
                  {`Paylinq`}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 mb-8 max-w-md"
            >
              {`Our mission is to turn your everyday transactions into a way to
              achieve your financial and lifestyle dreams. Join us on the
              journey to transform how you manage your finances.`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-start">
                <Mail
                  className="text-gray-500 mt-1 mr-3 shrink-0"
                  size={18}
                />
                <span className="text-gray-400">{`kmcelveen@getpaylinq.com`}</span>
              </div>
              <div className="flex items-start">
                <Phone
                  className="text-gray-500 mt-1 mr-3 shrink-0"
                  size={18}
                />
                <span className="text-gray-400">{`(901) 428-1741`}</span>
              </div>
              <div className="flex items-start">
                <MapPin
                  className="text-gray-500 mt-1 mr-3 shrink-0"
                  size={18}
                />
                <span className="text-gray-400">
                  {`70 W. 115th St.`}
                  <br />
                  {`Harlem, NY 10027`}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((column, idx) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <h3
                    className="text-white font-semibold mb-4 pb-1 border-b border-gray-800"
                    style={{
                      borderColor: idx % 2 === 0 ? "#2D9642" : "#C28F49",
                    }}
                  >
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIdx) => (
                      <motion.li
                        key={link.name}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white flex items-center group transition-colors duration-200"
                        >
                          <ChevronRight
                            size={14}
                            className="mr-1 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{
                              color: idx % 2 === 0 ? "#2D9642" : "#C28F49",
                            }}
                          />
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle section with features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-gray-900 bg-opacity-40 backdrop-blur-xs p-6 rounded-xl border border-gray-800"
          >
            <Landmark size={24} className="mb-4" style={{ color: "#2D9642" }} />
            <h3 className="text-white font-semibold mb-2">
              {`Bank-Level Security`}
            </h3>
            <p className="text-gray-400 text-sm">
              {`Your funds are secured with FDIC insurance up to $250,000 through
              our banking partners.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gray-900 bg-opacity-40 backdrop-blur-xs p-6 rounded-xl border border-gray-800"
          >
            <Shield size={24} className="mb-4" style={{ color: "#C28F49" }} />
            <h3 className="text-white font-semibold mb-2">Privacy Protected</h3>
            <p className="text-gray-400 text-sm">
              {`Your personal data is encrypted and protected with
              industry-leading protocols and practices.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gray-900 bg-opacity-40 backdrop-blur-xs p-6 rounded-xl border border-gray-800"
          >
            <CreditCard
              size={24}
              className="mb-4"
              style={{ color: "#2D9642" }}
            />
            <h3 className="text-white font-semibold mb-2">Reward Earning</h3>
            <p className="text-gray-400 text-sm">
              {`Earn points on every purchase that can be redeemed for travel,
              merchandise, and exclusive perks.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-gray-900 bg-opacity-40 backdrop-blur-xs p-6 rounded-xl border border-gray-800"
          >
            <Star size={24} className="mb-4" style={{ color: "#C28F49" }} />
            <h3 className="text-white font-semibold mb-2">Premium Support</h3>
            <p className="text-gray-400 text-sm">
              {`Access 24/7 dedicated customer support through phone, email, and
              live chat.`}
            </p>
          </motion.div>
        </div>

        {/* Bottom section with social and newsletter */}
        <div className="border-t border-gray-800 pt-10 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex space-x-4"
              >
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-white transition-colors duration-200"
                >
                  <Twitter
                    size={18}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-white transition-colors duration-200"
                >
                  <Instagram
                    size={18}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-white transition-colors duration-200"
                >
                  <Linkedin
                    size={18}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-white transition-colors duration-200"
                >
                  <Facebook
                    size={18}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  />
                </motion.a>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0 md:space-x-4"
              >
                <p className="text-gray-400 text-sm">
                  {`Subscribe to our newsletter`}
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-hidden focus:ring-1 focus:ring-green-500 w-full md:w-auto"
                  />
                  <button
                    className="rounded-r-md px-4 py-2 flex items-center justify-center text-white font-medium"
                    style={{
                      background: "linear-gradient(90deg, #2D9642, #C28F49)",
                    }}
                  >
                    {`Subscribe`}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-sm"
            >
              © {new Date().getFullYear()} Paylinq. All rights reserved.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-500 text-sm mt-2 md:mt-0"
            >
              {`Banking services provided by Our Banking Partner, Member FDIC.`}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg"
            style={{ background: "linear-gradient(135deg, #2D9642, #C28F49)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default PaylinqFooter;
