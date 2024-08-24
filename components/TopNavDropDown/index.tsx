"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { signIn, auth } from "@/auth";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TopNav from ".";
import SignOutButton from "../SignOutButton";

export default function TopNavDropDown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}>
        <AccountCircleIcon />
      </IconButton>
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
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link href="/user/dashboard">My profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            handleClose();
            await signOut();
          }}>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}
