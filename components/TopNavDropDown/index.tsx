"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  Settings,
  CreditCard,
  History,
  HelpCircle,
  Store,
} from "lucide-react";
import TopNav from ".";
import { SignOutButton, useAuth, useSession, useUser, useOrganizationList } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

export default function TopNavDropDown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);
  const theme = useTheme();
  const clerkUser = useUser();
  const clerkAuth = useAuth();
  // console.log("🚀 ~ TopNavComp ~ authclerk:", clerkAuth);
  // console.log("🚀 ~ TopNavComp ~ userclerk:", clerkUser);
  const userEmail = clerkUser?.user?.primaryEmailAddress;
  const userImage = clerkUser?.user?.imageUrl;
  const userFirstName = clerkUser?.user?.firstName;

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    queryClient.resetQueries({ queryKey: ["userProfile"] });
  };

  const menuItems: {
    text: string;
    icon: React.ReactNode;
    path: string;
    onClick?: (e: React.MouseEvent) => void;
  }[] = [
      { text: "Dashboard", icon: <User size={18} />, path: "/user/dashboard" },
      {
        text: "Account Settings",
        icon: <Settings size={18} />,
        path: "/user/profile-edit",
      },
      {
        text: "Payment Methods",
        icon: <CreditCard size={18} />,
        path: "/user/payments",
      },
      {
        text: "Transaction History",
        icon: <History size={18} />,
        path: "/user/transactions",
      },
      { text: "Help & Support", icon: <HelpCircle size={18} />, path: "/help" },
    ];

  // Check if user has any organization memberships
  const hasOrgAccess = clerkUser?.user?.organizationMemberships && clerkUser.user.organizationMemberships.length > 0;

  if (hasOrgAccess) {
    // Construct dynamic merchant URL ensuring it works on both localhost and prod
    let merchantUrl = "/merchant/dashboard"; // Default fallback

    if (typeof window !== "undefined") {
      const host = window.location.host;
      const protocol = window.location.protocol;

      // If already on merchant subdomain, just go to dashboard
      if (host.startsWith("merchant.")) {
        merchantUrl = "/dashboard";
      } else {
        // Otherwise prepend merchant subdomain
        // Handle localhost special case (subdomain comes before port)
        // e.g. localhost:3000 -> merchant.localhost:3000
        // prod: paylinq.com -> merchant.paylinq.com
        const baseHost = host.replace("www.", "");
        merchantUrl = `${protocol}//merchant.${baseHost}/dashboard`;
      }
    }

    const { isLoaded, setActive, userMemberships } = useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

    const handleMerchantClick = async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent immediate navigation

      // Find the first organization membership
      const firstOrg = clerkUser.user?.organizationMemberships?.[0];

      if (firstOrg && setActive) {
        try {
          // Set active organization
          await setActive({ organization: firstOrg.organization.id });
        } catch (err) {
          console.error("Failed to set active organization:", err);
        }
      }

      handleClose();
      // Manually navigate after session update
      window.location.href = merchantUrl;
    }

    menuItems.unshift({
      text: "Merchant Portal",
      icon: <Store size={18} />,
      path: merchantUrl,
      onClick: handleMerchantClick,
    });
  }

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
    exit: { opacity: 0, y: -5, transition: { duration: 0.1 } },
  };

  if (!isMounted) return null;

  return (
    <div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <IconButton
          color="inherit"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#2D9642",
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "#2D9642",
              border: "2px solid #2D9642",
              "&:hover": {
                bgcolor: "rgba(45, 150, 66, 0.08)",
              },
            }}
          >
            <User size={20} />
          </Avatar>
        </IconButton>
      </motion.div>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 50,
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            minWidth: "250px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            mt: 1.5,
            overflow: "hidden",
            border: "1px solid rgba(45, 150, 66, 0.1)",
            "&:before": {
              content: '""',
              display: "block",
              height: "4px",
              width: "100%",
              background: "linear-gradient(90deg, #2D9642, #C28F49)",
            },
          },
        }}
        MenuListProps={{
          sx: {
            padding: "8px 0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "16px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Avatar
            src={userImage || ""}
            sx={{
              bgcolor: "rgba(45, 150, 66, 0.1)",
              color: "#2D9642",
            }}
          >
            {!userImage && <User size={20} />}
          </Avatar>
          <Box ml={1.5}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                background: "linear-gradient(90deg, #2D9642, #C28F49)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {userFirstName}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {userEmail}
            </Typography> */}
          </Box>
        </Box>

        <AnimatePresence>
          {open && (
            <Box sx={{ paddingY: 1 }}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <MenuItem
                    component={Link}
                    href={item.path}
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick(e);
                      } else {
                        handleClose();
                      }
                    }}
                    sx={{
                      padding: "10px 16px",
                      margin: "0 8px",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(45, 150, 66, 0.08)",
                      },
                    }}
                  >
                    <motion.div
                      className="flex items-center w-full"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="mr-3" style={{ color: "#2D9642" }}>
                        {item.icon}
                      </span>
                      <Typography
                        variant="body1"
                        className={item.text === "Merchant Portal" ? "bg-gradient-to-r from-[#2D9642] to-[#C28F49] brightness-125 bg-clip-text text-transparent font-bold inline-block" : ""}
                      >
                        {item.text}
                      </Typography>
                    </motion.div>
                  </MenuItem>
                </motion.div>
              ))}
            </Box>
          )}
        </AnimatePresence>

        <Divider sx={{ margin: "4px 0" }} />

        <motion.div
          variants={menuItemVariants}
          custom={menuItems.length}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <SignOutButton redirectUrl="/">
            <MenuItem
              onClick={async () => {
                handleClose();
              }}
              sx={{
                padding: "10px 16px",
                margin: "8px",
                color: "#C28F49",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(194, 143, 73, 0.08)",
                },
              }}
            >
              <motion.div
                className="flex items-center w-full"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <LogOut size={18} className="mr-3" />
                <Typography variant="body1" fontWeight={500}>
                  Sign out
                </Typography>
              </motion.div>
            </MenuItem>
          </SignOutButton>
          {/* <MenuItem
            onClick={async () => {
              handleClose();
              await signOut();
            }}
            sx={{
              padding: "10px 16px",
              margin: "8px",
              color: "#C28F49",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(194, 143, 73, 0.08)",
              },
            }}
          >
            <motion.div
              className="flex items-center w-full"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <LogOut size={18} className="mr-3" />
              <Typography variant="body1" fontWeight={500}>
                Sign out
              </Typography>
            </motion.div>
          </MenuItem> */}
        </motion.div>
      </Menu>
    </div>
  );
}
