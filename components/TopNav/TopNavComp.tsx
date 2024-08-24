import React from "react";
import { signOut, signIn, auth } from "@/auth";
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
import TopNavDropDown from "@/components/TopNavDropDown";
import TopNav from ".";

export default async function TopNavComp() {
  const session = await auth();
  const user = session?.user?.email;

  return (
    <TopNav>
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1",
          }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image
                src={"/logos/paylinq-logo-new.png"}
                width={70}
                height={70}
                alt="payLinq-Logo"
                className="sm:ml-4 lg:ml-[133px]"
              />
            </Link>
          </Typography>
          <Box className="pr-10">
            <Link href="/howitworks">
              <Button color="secondary" variant="text" sx={{ marginRight: 2 }}>
                Benefits
              </Button>
            </Link>
            <Link href="/pricing">
              <Button color="secondary" variant="text" sx={{ marginRight: 2 }}>
                Features
              </Button>
            </Link>
            <Link href="/contact">
              <Button color="secondary" variant="text">
                How it works
              </Button>
            </Link>
            <Link href="/contact">
              <Button color="secondary" variant="text">
                FAQS
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          className="sm:mr-4 lg:mr-10"
          sx={{
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          {user ? (
            <TopNavDropDown />
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}>
              <Box>
                <Button
                  className="border-2 border-solid"
                  type="submit"
                  color="info"
                  variant="outlined">
                  Sign In/ Sign Up
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </>
    </TopNav>
  );
}
