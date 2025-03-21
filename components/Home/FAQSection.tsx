"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Lightbulb,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function FAQSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const faqs = [
    {
      question: "What is Paylinq?",
      answer:
        "Paylinq is a Fintech startup dedicated to empowering financially vulnerable individuals through innovative solutions. Our platform combines rewards, financial education, and tools designed to help you maximize your money while building better financial habits.",
      icon: <MessageCircle size={22} />,
    },
    {
      question: "How does it work?",
      answer:
        "Paylinq works by tracking purchases made with your Paylinq Debit Card. You'll earn points for everyday spending which can be redeemed for rewards. We also provide insights into your spending patterns and offer tools to help improve your financial health over time.",
      icon: <Lightbulb size={22} />,
    },
    {
      question: "What are the benefits of joining the waitlist?",
      answer:
        "By joining the Paylinq waitlist, you'll secure early access to our platform when we launch. Early adopters will receive special bonuses including extra reward points, exclusive merchant offers, and the opportunity to help shape our future features through direct feedback to our team.",
      icon: <Clock size={22} />,
    },
    {
      question: "When will Paylinq be fully available?",
      answer:
        "We're currently in our initial launch phase with core features available to our early access users. Our full platform with all planned features will be rolling out over the coming quarters, with major upgrades scheduled throughout 2025.",
      icon: <Sparkles size={22} />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="relative py-20 px-4 lg:px-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #060606 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#2D9642" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#C28F49" }}
        ></div>

        {/* Decorative lines */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <path
            d="M0,100 C200,150 400,50 600,120 C800,190 1000,80 1200,150"
            stroke="rgba(45, 150, 66, 0.1)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M100,200 C300,150 500,250 700,180 C900,110 1100,220 1300,150"
            stroke="rgba(194, 143, 73, 0.1)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Animated particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full w-2 h-2"
            style={{
              backgroundColor: i % 2 === 0 ? "#2D9642" : "#C28F49",
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            <div
              className="mb-6 inline-flex items-center px-4 py-2 rounded-full text-[#C28F49]"
              style={{
                backgroundColor: "rgba(194, 143, 73, 0.1)",
                borderColor: "rgba(194, 143, 73, 0.2)",
                borderWidth: "1px",
              }}
            >
              <HelpCircle size={18} className="mr-2" />
              <span className="text-sm font-medium">
                Frequently Asked Questions
              </span>
            </div>

            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              className="font-sans font-bold text-white text-3xl lg:text-4xl mb-6 leading-tight"
            >
              This is just the beginning—
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #2D9642, #C28F49)",
                }}
              >
                {`what's next for Paylinq?`}
              </span>
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              {`Thank you for joining us on this journey! Right now, you are part
              of an exclusive group of users who are shaping the future of
              financial rewards. We're starting simple to ensure we build a
              reliable, secure platform you can trust.`}
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-300 text-lg leading-relaxed"
            >
              {`As we grow, we'll roll out exciting features like virtual cards,
              credit reporting, expanded point earning opportunities, and
              merchant rewards. Stay tuned—together, we're creating something
              incredible.`}
            </Typography>

            {/* Animated decoration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden lg:block absolute -bottom-16 -left-16 opacity-10"
            >
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="url(#paylinqGrad1)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="url(#paylinqGrad1)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  stroke="url(#paylinqGrad1)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="paylinqGrad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#2D9642" />
                    <stop offset="100%" stopColor="#C28F49" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

          {/* Right Side - FAQ Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden"
              >
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 4px 12px rgba(45, 150, 66, 0.15)",
                  }}
                  className={`
                    bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden
                    transition-all duration-300 ease-in-out shadow-lg
                    ${openIndex === index ? "shadow-[#2D9642]/10" : ""}
                  `}
                >
                  {/* Question header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        mr-4 p-2 rounded-lg transition-colors
                        ${
                          openIndex === index
                            ? "bg-[#2D9642]/20 text-[#2D9642]"
                            : "bg-gray-700/50 text-gray-400"
                        }
                      `}
                      >
                        {faq.icon}
                      </div>
                      <Typography
                        variant="h6"
                        component="span"
                        className={`
                          font-semibold transition-colors text-lg
                          ${
                            openIndex === index
                              ? "text-[#C28F49]"
                              : "text-white"
                          }
                        `}
                      >
                        {faq.question}
                      </Typography>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        flex-shrink-0 transition-colors
                        ${
                          openIndex === index
                            ? "text-[#C28F49]"
                            : "text-gray-400"
                        }
                      `}
                    >
                      <ChevronDown size={22} />
                    </motion.div>
                  </button>

                  {/* Answer body */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div
                        className="pl-10 border-l"
                        style={{ borderColor: "rgba(45, 150, 66, 0.3)" }}
                      >
                        <Typography className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center lg:text-left flex justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white font-medium rounded-lg shadow-lg transition-all flex items-center"
                style={{
                  background:
                    "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
                }}
              >
                <span>Have More Questions?</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="ml-2"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
