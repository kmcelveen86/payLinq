'use client'
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingComp() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default">
      <motion.div
        initial={{ scale: 0.5, rotate: 0 }}
        animate={{ scale: 1.5, rotate: 360 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}>
        <CircularProgress />
      </motion.div>
    </Box>
  );
}
