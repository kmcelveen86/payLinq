/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LifeDeserveSection() {
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
                  Live the Life You Deserve with Paylinq
                </span>
              </div>
            </Typography>
            <Typography
              variant="h6"
              component="div"
              className="text-white leading-relaxed xs:text-sm md:text-base lg:text-lg">
              Empower your financial future with seamless bill payments, credit
              building, and exclusive rewards tailored to your lifestyle.
            </Typography>
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="flex-end"
        className="absolute xs:bottom-[-80px] md:bottom-[-112px] lg:bottom-[-170px] right-0 w-[300px] h-[300px] sm:left-0 lg:left-[268px]">
        <motion.img
          src="/images/rectangle.png"
          alt="Picture of the credit cards"
          className="relative object-contain lg:w-[498px] lg:h-[408px] md:w-[300px] md:h-[210px] xs:w-[200px] xs:h-[140px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </Box>
    </div>
  );
}
