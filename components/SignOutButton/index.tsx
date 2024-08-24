import { signOut } from "next-auth/react";
import { MenuItem } from "@mui/material";
import React from "react";

export default async function SignOutButton() {
  return (
    <MenuItem
      onClick={async () => {
        await signOut();
      }}>
      Sign out
    </MenuItem>
  );
}
