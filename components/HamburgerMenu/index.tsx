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
import { signIn, signOut } from "next-auth/react";
import { HideOnScroll } from "@/components/HideOnScroll";

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
    <Box className="bg-black h-16">
      <HideOnScroll>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}>
          <Box sx={{paddingLeft: '12px' }}>
            <MenuIcon fontSize="large" color="secondary" />
          </Box>
        </IconButton>
      </HideOnScroll>
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
          {session?.user?.email && (
            <>
              <Divider />
              <List>
                <ListItem>
                  <Link href="/user/dashboard" passHref>
                    <ListItemText primary="My profile" />
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <Box sx={{ padding: 2 }}>
                <Button
                  onClick={async () => {
                    await signOut();
                  }}
                  color="info"
                  variant="outlined"
                  sx={{ marginRight: 2 }}>
                  Sign Out
                </Button>
              </Box>
            </>
          )}
          {!session?.user?.email && (
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
