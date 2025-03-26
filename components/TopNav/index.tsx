"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HideOnScroll, HideOnScrollProps } from "@/components/HideOnScroll";


export default function TopNav({ children }: HideOnScrollProps) {
  const isMobile = useMediaQuery("(max-width:720px)");

  return !isMobile ? (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar
            style={{
              backgroundColor: "black",
              display: "flex",
              justifyContent: "space-between",
              padding: '0px'
            }}>
            {children}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  ) : null;
}
