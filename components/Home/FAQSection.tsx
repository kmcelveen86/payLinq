"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQSection() {
  return (
    <div className="bg-black py-16 px-4 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-left mb-12 bg-black">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          className="font-mono font-semibold text-white text-3xl lg:text-4xl mb-4">
          This is just the beginning—what&#39;s next for Paylinq?
        </Typography>
        <Typography
          variant="caption"
          gutterBottom
          className="font-mono text-white text-lg">
          Thank you for joining us on this journey! Right now, you are part of an exclusive group of users who are shaping the future of financial rewards.
          We&#39;re starting simple to ensure we build a reliable, secure platform you can trust. As we grow, we&#39;ll roll out exciting features like virtual cards, credit
          reporting, earn more points, and merchant rewards. Stay tuned—together, we&#39;re creating something incredible.
        </Typography>
      </motion.div>

      <Box className="space-y-4 max-w-2xl mx-auto bg-black">
        <Accordion className="border-b-2 border-gray-200">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography variant="h6" component="div" className="font-bold">
              What is Paylinq?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-sm">
              Paylinq is a Fintech startup dedicated to empowering financially
              vulnerable individuals through innovative solutions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="border-b-2 border-gray-200">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography variant="h6" component="div" className="font-bold">
              How does it work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-sm">
              {`Detailed explanation on how Paylinq's platform works, helping users manage their finances effectively.`}{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="border-b-2 border-gray-200">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography variant="h6" component="div" className="font-bold">
              What are the benefits of joining the waitlist?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-sm">
              Benefits of joining the Paylinq waitlist include early access to
              features, promotions, and more.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
