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
        // backgroundColor: 'black'
      }}>
      <Paper
        elevation={3}
        style={{ padding: "2rem", textAlign: "center", width: '400px' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1">
          {`We've sent you an email with a login link. Please check your inbox and follow the instructions to log in.
`}{" "}
        </Typography>
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          {`If you don't see the email, make sure to check your spam or junk folder.
`}{" "}
        </Typography>
      </Paper>
    </Container>
  );
};

export default VerifyRequest;
