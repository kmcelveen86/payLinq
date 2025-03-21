"use client";
import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { HideOnScroll } from "@/components/HideOnScroll";
import {
  CreditCard,
  Home,
  HelpCircle,
  Tag,
  Mail,
  User,
  LogOut,
  LogIn,
  ChevronRight,
} from "lucide-react";

export default function HamburgerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width:720px)");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const menuItems = [
    {
      text: "Home",
      href: "/",
      icon: <Home size={20} className="text-gray-600 mr-3" />,
    },
    {
      text: "How it works",
      href: "/howitworks",
      icon: <HelpCircle size={20} className="text-gray-600 mr-3" />,
    },
    {
      text: "Pricing",
      href: "/pricing",
      icon: <Tag size={20} className="text-gray-600 mr-3" />,
    },
    {
      text: "Contact",
      href: "/contact",
      icon: <Mail size={20} className="text-gray-600 mr-3" />,
    },
  ];

  if (!isMounted) return null;

  return isMobile ? (
    <Box className="bg-black h-16 flex items-center">
      <HideOnScroll>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            color: "#ffffff",
            marginLeft: "12px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </HideOnScroll>

      <AnimatePresence>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 280,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f8f8f8)",
              overflow: "hidden",
            },
          }}
        >
          <div className="relative h-full overflow-hidden">
            {/* Green gradient top accent */}
            <div
              className="absolute top-0 left-0 w-full h-2"
              style={{ background: "linear-gradient(90deg, #2D9642, #C28F49)" }}
            />

            {/* Header with logo and close button */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <div className="flex items-center">
                <CreditCard
                  size={24}
                  style={{ color: "#2D9642" }}
                  className="mr-2"
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #2D9642, #C28F49)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Paylinq
                </Typography>
              </div>
              <IconButton
                onClick={toggleDrawer(false)}
                sx={{
                  color: "#666",
                  "&:hover": {
                    backgroundColor: "rgba(45, 150, 66, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
              className="h-full relative"
            >
              {/* Background decorative elements */}
              <div
                className="absolute top-20 right-10 w-48 h-48 rounded-full opacity-10 z-0"
                style={{
                  background:
                    "radial-gradient(circle, #2D9642 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute bottom-20 left-5 w-32 h-32 rounded-full opacity-10 z-0"
                style={{
                  background:
                    "radial-gradient(circle, #C28F49 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Menu Items */}
              <List className="relative z-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.text}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ListItem
                      button
                      component={Link}
                      href={item.href}
                      onClick={toggleDrawer(false)}
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 0,
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(45, 150, 66, 0.05)",
                        },
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          height: "2px",
                          width: "0%",
                          background:
                            "linear-gradient(90deg, #2D9642, #C28F49)",
                          transition: "width 0.3s ease",
                        },
                        "&:hover:after": {
                          width: "100%",
                        },
                      }}
                    >
                      <motion.div
                        className="flex items-center w-full"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.icon}
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.text}
                        </Typography>
                        <ChevronRight
                          size={16}
                          className="ml-auto text-gray-400"
                        />
                      </motion.div>
                    </ListItem>
                  </motion.div>
                ))}
              </List>

              {session?.user?.email && (
                <motion.div
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <Divider sx={{ my: 2, opacity: 0.6 }} />
                  <List className="relative z-10">
                    <ListItem
                      button
                      component={Link}
                      href="/user/dashboard"
                      onClick={toggleDrawer(false)}
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(45, 150, 66, 0.05)",
                        },
                      }}
                    >
                      <motion.div
                        className="flex items-center w-full"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <User size={20} className="text-gray-600 mr-3" />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          My Profile
                        </Typography>
                        <ChevronRight
                          size={16}
                          className="ml-auto text-gray-400"
                        />
                      </motion.div>
                    </ListItem>
                  </List>
                </motion.div>
              )}

              <motion.div
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                className="absolute bottom-8 left-0 right-0 px-5"
              >
                <Divider sx={{ mb: 3, opacity: 0.6 }} />

                {session?.user?.email ? (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      onClick={async () => {
                        await signOut();
                        setDrawerOpen(false);
                      }}
                      variant="outlined"
                      startIcon={<LogOut size={18} />}
                      fullWidth
                      sx={{
                        py: 1.2,
                        border: "1px solid rgba(194, 143, 73, 0.5)",
                        color: "#C28F49",
                        "&:hover": {
                          border: "1px solid rgba(194, 143, 73, 0.8)",
                          backgroundColor: "rgba(194, 143, 73, 0.05)",
                        },
                      }}
                    >
                      Sign Out
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      onClick={async () => {
                        await signIn();
                        setDrawerOpen(false);
                      }}
                      variant="contained"
                      startIcon={<LogIn size={18} />}
                      fullWidth
                      sx={{
                        py: 1.2,
                        background: "linear-gradient(90deg, #2D9642, #C28F49)",
                        color: "white",
                        boxShadow: "0 4px 10px rgba(45, 150, 66, 0.2)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #25803a, #b37f41)",
                          boxShadow: "0 6px 15px rgba(45, 150, 66, 0.3)",
                        },
                      }}
                    >
                      Sign In / Sign Up
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </Drawer>
      </AnimatePresence>
    </Box>
  ) : null;
}
