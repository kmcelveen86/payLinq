"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/app/actions";
import { signIn, signOut } from "next-auth/react";

export default function HamburgerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width:720px)");

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  return isMobile ? (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}>
        <Box sx={{ padding: 2 }}>
          <MenuIcon fontSize="large" />
        </Box>
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: 250 } }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}>
          <List>
            {["How it works", "Pricing", "Contact"].map((text) => (
              <ListItem key={text}>
                <Link
                  href={`/${text.replace(/\s+/g, "").toLowerCase()}`}
                  passHref>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          {session?.user?.email ? (
            <Box sx={{ padding: 2 }}>
              <Button
                onClick={async () => {
                  await signOut();
                }}
                color="info"
                variant="outlined"
                sx={{ marginRight: 2 }}>
                Log Out
              </Button>
            </Box>
          ) : (
            <Box sx={{ padding: 2 }}>
              <Button
                onClick={async () => {
                  await signIn();
                }}
                variant="outlined"
                color="info"
                sx={{ marginBottom: 2, marginRight: 2 }}>
                Sign In/ Sign Up
              </Button>
            </Box>
          )}
        </motion.div>
      </Drawer>
    </Box>
  ) : null;
}
