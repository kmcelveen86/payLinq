"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Milestone,
  Sparkles,
  MapPin,
  LucideRocket,
  LucideStar,
  Award,
  BarChart4,
  ArrowRight,
} from "lucide-react";

export default function RoadmapSection() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleGoToWaitlist = () => {
    router.push("/user/join-waitlist");
  };

  const roadmapItems = [
    {
      phase: "Phase 1 (Q1)",
      title: "Track Purchases, Earn Points",
      objective: "Launch PayLinq's core earning engine.",
      features: [
        "Link PayLinq Debit Card.",
        "Automatically track every purchase.",
        "Earn UPP on eligible transactions.",
        "View real-time points and spending analytics.",
        "Access Rewards dashboard with redemption preview.",
      ],
      status: "Current Phase",
      icon: <BarChart4 size={24} className="text-[#2D9642]" />,
      color: "from-[#2D9642] to-[#38B053]",
      lightColor: "bg-green-50",
      darkColor: "bg-[#2D9642]",
      timeline: "Q1",
    },
    {
      phase: "Phase 2 (Q2)",
      title: "Redeem, Upgrade, and Engage",
      objective:
        "Expand user value through redemption options and tier upgrades.",
      features: [
        "Enable full UPP redemption for shopping, travel, and gift.",
        "Introduce Silver and Gold membership tiers with higher earning rates.",
        "Launch merchant offers and bonus campaigns.",
        "Add referral rewards and in-app notifications.",
      ],
      status: "Coming Soon",
      icon: <Award size={24} className="text-[#2D9642]" />,
      color: "from-[#2D9642] to-[#38B053]",
      lightColor: "bg-green-50",
      darkColor: "bg-[#2D9642]",
      timeline: "Q2",
    },
    {
      phase: "Phase 3 (Q3)",
      title: "Ecosystem Expansion",
      objective: "Scale PayLinq into a full lifestyle rewards ecosystem.",
      features: [
        "Integrate premium partners (travel, entertainment, retail).",
        "Launch Black Tier with elite benefits and concierge access.",
        "Add PayLinq Marketplace for direct point spending.",
        "Introduce AI-powered spend insights and reward optimization.",
      ],
      status: "Future Vision",
      icon: <LucideRocket size={24} className="text-[#C28F49]" />,
      color: "from-[#C28F49] to-[#D9A55C]",
      lightColor: "bg-amber-50",
      darkColor: "bg-[#C28F49]",
      timeline: "Q3",
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
    <div className="relative bg-[#F2F2F0] py-20 px-4 lg:px-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-green-100 opacity-40 blur-3xl"></div>

        {/* Connecting lines for the roadmap */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <path
            d="M200,100 C300,150 400,180 600,200 C800,220 900,300 1000,400"
            stroke="rgba(45, 150, 66, 0.15)"
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
            <motion.div
              animate={{
                rotate: [0, -10, 0, 10, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <MapPin className="text-[#2D9642] w-6 h-6 mr-2" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#2D9642] to-[#C28F49]">
              Our Roadmap
            </h2>
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <MapPin className="text-[#C28F49] w-6 h-6 ml-2" />
            </motion.div>
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
              whileHover={{
                boxShadow:
                  index === 2
                    ? "0 20px 25px -5px rgba(194, 143, 73, 0.2), 0 10px 10px -5px rgba(194, 143, 73, 0.1)"
                    : "0 20px 25px -5px rgba(45, 150, 66, 0.2), 0 10px 10px -5px rgba(45, 150, 66, 0.1)",
              }}
            >
              {/* Card Header */}
              <div className={`bg-linear-to-r ${item.color} p-6 relative`}>
                {/* Corner decorative elements */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-20"
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    backgroundColor: "white",
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
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Card Body */}
              <div className={`${item.lightColor} p-6 grow flex flex-col`}>
                <h4
                  className="text-xl font-bold mb-3"
                  style={{ color: index === 2 ? "#C28F49" : "#2D9642" }}
                >
                  {item.title}
                </h4>

                {/* Objective */}
                <p className="text-gray-700 font-medium mb-4">
                  <span className="font-bold">Objective:</span> {item.objective}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <p className="font-bold text-gray-800 mb-2">Features:</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-gray-600"
                      >
                        <span
                          className="mr-2 mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: index === 2 ? "#C28F49" : "#2D9642",
                          }}
                        ></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card progress indicator */}
                <div className="mt-auto">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: index === 0 ? "20%" : "0%",
                      }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-full ${item.darkColor}`}
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className={`p-4 ${item.lightColor} border-t border-gray-200 flex justify-center`}>
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
            onClick={handleGoToWaitlist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-white font-medium rounded-lg shadow-lg flex items-center justify-center mx-auto group"
            style={{
              background: "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
              boxShadow:
                "0 10px 15px -3px rgba(45, 150, 66, 0.2), 0 4px 6px -2px rgba(45, 150, 66, 0.1)",
            }}
          >
            <span>Join the Waitlist</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="ml-2"
            >
              <ArrowRight size={18} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
