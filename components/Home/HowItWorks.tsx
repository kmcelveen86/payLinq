/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function HowItWorks() {
  return (
    <div className="relative">
      <Box
        display="flex"
        minHeight="100vh"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        sx={{
          marginLeft: "133px",
          backgroundColor: "#000",
          color: "#fff",
          "@media (max-width: 1139px)": {
            flexDirection: "column",
            marginLeft: "0",
          },
        }}>
        <Box flex={1} p={2}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="h1"
              component="div"
              gutterBottom
              className="lg:w-[529px] lg:h-[117px] leading-10 ">
              <div className="text-responsive">
                <span className="text-white font-mono font-semibold xs:text-2xl md:text-3xl lg:text-5xl">
                  How it works
                </span>
              </div>
            </Typography>
            <div className="flex flex-col space-y-8 flex-1">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  1
                </div>
                <div>
                  <p className="font-mono text-white leading-relaxed xs:text-sm md:text-base lg:text-lg">
                    Pay Bills
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  2
                </div>
                <div>
                  <p className="font-mono text-white leading-relaxed xs:text-sm md:text-base lg:text-lg">
                    Build Credit
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  3
                </div>
                <div>
                  <p className="font-mono text-white leading-relaxed xs:text-sm md:text-base lg:text-lg">
                    Redeem Points
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Box>
        <Box
          flex={1}
          p={2}
          sx={{
            backgroundColor: "#d1d5db",
            height: "500px",
            "@media (max-width: 1140px)": {
              height: "300px",
              width: "100%",
            },
          }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              style={{
                backgroundColor: "#9ca3af",
                width: "100px",
                height: "100px",
              }}></Box>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
}
