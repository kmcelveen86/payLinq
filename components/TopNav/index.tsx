"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInAction, signOutAction } from "@/app/actions";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth";
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
