"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MembershipSection() {
  return (
    <>
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
              <span className="text-paylinqGreen">Membership Tiers and benefits </span>
            </div>
          </Typography>
        </motion.div>
      </Box>
    </>
  );
}
