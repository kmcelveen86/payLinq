"use client";
import React from "react";
import TopNav from "@/components/TopNav/";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <>
      <TopNav />
      <Box
        display="flex"
        minHeight="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <Typography variant="h1" component="div" gutterBottom>
            <div className="text-responsive">
              <span className="text-paylinqGreen">Paylinq </span>
              <span>Coming Soon</span>
            </div>
          </Typography>
        </motion.div>
      </Box>
    </>
  );
}
