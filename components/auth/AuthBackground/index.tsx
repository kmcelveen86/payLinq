"use client";
import React from "react";
import { motion } from "framer-motion";

const AuthBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Animated particles */}
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: index % 3 === 0 ? "2px" : index % 3 === 1 ? "3px" : "4px",
            height: index % 3 === 0 ? "2px" : index % 3 === 1 ? "3px" : "4px",
            background: index % 2 === 0 ? "#2D9642" : "#C28F49",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

export default AuthBackground;
