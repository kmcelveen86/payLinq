"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type Props = {
  children: ReactNode;
};

function PaylinqSessionProvider({ children }: Props) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#3f50b5",
        light: "#757ce8",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fff",
        light: "#fff",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <SessionProvider>
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default PaylinqSessionProvider;
