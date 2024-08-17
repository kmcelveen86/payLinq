/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function WhyChoosePaylinq() {
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
          backgroundColor: "#fff",
          "@media (max-width: 1139px)": {
            flexDirection: "column",
            marginLeft: "0",
          },
          "@media (min-width: 1140px)": {
            marginLeft: "-133px",
          },
        }}>
        <Box
          display="flex"
          minHeight="100vh"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          sx={{
            "@media (max-width: 1139px)": {
              flexDirection: "column",
            },
          }}>
          <Box className="xs:flex-none md:flex-none lg:flex-1 pl-4 self-start xs:pt-16 md:pt-24 lg:pt-36">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}>
              <Typography
                variant="h1"
                component="div"
                gutterBottom
                className="lg:w-[529px] lg:h-[117px] leading-10 ">
                <div className="text-responsive">
                  <span className="text-black font-mono font-semibold xs:text-2xl md:text-3xl lg:text-5xl">
                    Why Choose Paylinq?
                  </span>
                </div>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className="text-black leading-relaxed xs:text-sm md:text-base lg:text-lg">
                See why Paylinq should be your choice for financial freedom.
                Open the doors to new financial ventures.
              </Typography>
            </motion.div>
          </Box>
          <Box
            flex={1}
            p={2}
            sx={{
              height: "500px",
              "@media (max-width: 1140px)": {
                height: "300px",
                width: "100%",
              },
            }}>
            <Box className="flex items-center mb-8 lg:mb-0 ">
              <motion.img
                src="/images/simplifyBill.png"
                alt="Simplify your bill payments"
                className="w-12 h-12 lg:w-16 lg:h-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              />
              <p className="text-black ml-4 text-lg w-52">
                Simplify your bill payments.
              </p>
            </Box>

            <Box className="flex items-center mb-8 lg:mb-0">
              <motion.img
                src="/images/buildCredit.png"
                alt="Build your credit effortlessly"
                className="w-12 h-12 lg:w-16 lg:h-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              />
              <p className="text-black ml-4 text-lg w-52">
                Build your credit effortlessly while managing your finances.
              </p>
            </Box>

            <Box className="flex items-center ">
              <motion.img
                src="/images/earnRewards.png"
                alt="Earn rewards and incentives"
                className="w-12 h-12 lg:w-16 lg:h-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              />
              <p className="text-black ml-4 text-lg w-52">
                Earn rewards and incentives.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
