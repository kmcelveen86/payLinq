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

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function TopNav({ children }: HideOnScrollProps) {
  const isMobile = useMediaQuery("(max-width:720px)");

  return !isMobile ? (
    <React.Fragment>
      <HideOnScroll>
        <AppBar>
          <Toolbar
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
            }}>
            {children}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  ) : null;
}
