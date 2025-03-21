import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const VerifyRequest: React.FC = () => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #000000 0%, #0A0A0A 50%, #060606 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "2.5rem",
          textAlign: "center",
          width: "450px",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(45, 150, 66, 0.1)",
        }}
      >
        {/* Decorative elements - static, no client-side animations */}
        <Box
          sx={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45, 150, 66, 0.1) 0%, rgba(45, 150, 66, 0) 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(194, 143, 73, 0.1) 0%, rgba(194, 143, 73, 0) 70%)",
          }}
        />

        {/* Email icon */}
        <Box
          sx={{
            width: "80px",
            height: "80px",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(45, 150, 66, 0.1) 0%, rgba(194, 143, 73, 0.1) 100%)",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="#2D9642"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="#2D9642"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "700",
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          {`Check Your Email`}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
          {`We've sent you an email with a login link. Please check your inbox and
          follow the instructions to log in.`}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#666", fontSize: "0.95rem" }}
        >
          {`If you don't see the email, make sure to check your spam or junk
          folder.`}
        </Typography>

        {/* Static decorative line */}
        <Box
          sx={{
            height: "4px",
            width: "60px",
            margin: "2rem auto 0",
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
            borderRadius: "2px",
          }}
        />
      </Paper>
    </Container>
  );
};

export default VerifyRequest;
