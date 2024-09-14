"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import XIcon from "@mui/icons-material/X";
import Grid from "@mui/material/Grid";
import { Span } from "next/dist/trace";
import { Icon } from "@mui/material";

const CustomStyledLink = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
}));

const CustomGridItem = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  rowGap: "4rem",
}));

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      style={{backgroundColor: "white", color: "black", borderRadius: "15px", padding: "20px"}}
    >
      {children}
    </button>
  );
};

// const MiddleContainer = () => {
//   return (
//     <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column" }}>
//       <CustomStyledLink href="#">Terms of Conditions</CustomStyledLink>
//       <CustomStyledLink href="#">Privacy Policy</CustomStyledLink>
//       <CustomStyledLink href="#">Help Center</CustomStyledLink>
//     </Container>
//   );
// };
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: "450px",
        borderTop: "1px solid white",
        display: "flex",
        color: "white",
        padding: "60px",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <CustomGridItem item xs={12} md={4}>
            <CustomStyledLink href="https://getpaylinq.com/">
              <img src="/logos/paylinq_logo.jpg" alt="PayLinq Logo" />
            </CustomStyledLink>
            <Box>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <CustomStyledLink href="mailto:support@getpaylinq.com">
                support@getpaylinq.com
              </CustomStyledLink>
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom>
                &copy; Copyright Paylinq LLC 2024
              </Typography>
              <Typography variant="body1" gutterBottom>
                All rights reserved
              </Typography>
            </Box>
          </CustomGridItem>
          <CustomGridItem item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                columnGap: "60px",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Benefits
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Features
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                How it Works
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                FAQs
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                columnGap: "20px",
              }}
            >
              <XIcon fontSize="large" />
              <FacebookRoundedIcon fontSize="large" />
              <InstagramIcon fontSize="large" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                columnGap: "20px",
              }}
            >
              <Typography variant="body1" gutterBottom>
                Terms of Service
              </Typography>
              <Typography variant="body1" gutterBottom>
                Privacy Policy
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sitemap
              </Typography>
            </Box>
          </CustomGridItem>
          <CustomGridItem item xs={12} md={3}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px",
              }}>
              <Button >
                <ArrowUpwardIcon/>
              </Button>
            </Box>
          </CustomGridItem>
        </Grid>
      </Container>
    </Box>
  );
}
