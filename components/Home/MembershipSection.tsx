"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Milestone,
  Sparkles,
  MapPin,
  LucideRocket,
  LucideStar,
  Award,
  BarChart4,
} from "lucide-react";

export default function RoadmapSection() {
  const [hoveredCard, setHoveredCard] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const roadmapItems = [
    {
      phase: "Phase 1 (MVP)",
      title: "Track Bills, Earn Points",
      description:
        "Start earning points daily just by making purchases with your Paylinq Debit Card.",
      status: "Current Phase",
      icon: <BarChart4 size={24} className="text-yellow-600" />,
      color: "from-yellow-400 to-yellow-600",
      lightColor: "bg-yellow-100",
      darkColor: "bg-yellow-600",
      timeline: "Now",
    },
    {
      phase: "Phase 2",
      title: "Redeem Points, Build Credit",
      description:
        "Soon, you'll be able to redeem your points for flights, hotels, and exclusive perks at our partner merchants. Plus, you'll build credit simply by making purchases.",
      status: "Coming Soon",
      icon: <Award size={24} className="text-blue-600" />,
      color: "from-blue-400 to-blue-600",
      lightColor: "bg-blue-100",
      darkColor: "bg-blue-600",
      timeline: "Q2 2025",
    },
    {
      phase: "Phase 3",
      title: "Transform Your Finances",
      description:
        "We're creating a world where financial management is seamless and rewarding. Imagine earning up to 4x points on purchases, receiving luxury perks, and getting exclusive financial advice—Paylinq is your partner for it all.",
      status: "Future Vision",
      icon: <LucideRocket size={24} className="text-purple-600" />,
      color: "from-purple-400 to-purple-600",
      lightColor: "bg-purple-100",
      darkColor: "bg-purple-600",
      timeline: "Q4 2025",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4 lg:px-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-100 opacity-40 blur-3xl"></div>

        {/* Connecting lines for the roadmap */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <path
            d="M200,100 C300,150 400,180 600,200 C800,220 900,300 1000,400"
            stroke="rgba(234, 179, 8, 0.15)"
            strokeWidth="6"
            strokeDasharray="8 12"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <MapPin className="text-yellow-600 w-6 h-6 mr-2" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Our Roadmap
            </h2>
            <MapPin className="text-yellow-600 w-6 h-6 ml-2" />
          </div>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover our journey to revolutionize how you earn rewards and
            manage your finances
          </p>
        </motion.div>

        {/* Roadmap Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`
                rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform
                ${
                  hoveredCard === index
                    ? "scale-105 z-10 shadow-xl"
                    : "scale-100 z-0"
                } 
                h-full flex flex-col border border-gray-100
              `}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(0)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${item.color} p-6 relative`}>
                {/* Corner decorative elements */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-20"
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                ></div>

                <div className="flex items-center">
                  <div className="mr-4 bg-white/30 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.phase}
                    </h3>
                    <div className="flex items-center mt-1 text-white/90 text-sm">
                      <Milestone className="w-4 h-4 mr-1" />
                      <span>{item.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Animated sparkles effect for the current phase */}
                {index === 0 && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                )}
              </div>

              {/* Card Body */}
              <div className={`${item.lightColor} bg-opacity-30 p-6 flex-grow`}>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600 mb-6">{item.description}</p>

                {/* Card progress indicator */}
                <div className="mt-auto">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.darkColor}`}
                      style={{
                        width:
                          index === 0 ? "100%" : index === 1 ? "30%" : "10%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full ${item.darkColor} text-white`}
                >
                  {index === 0 && <LucideStar className="w-4 h-4 mr-1" />}
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Join us on this journey and be among the first to experience each
            phase
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg shadow-lg hover:shadow-yellow-500/20"
          >
            Join the Waitlist
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
