import React from "react";
import Home from "@/components/Home/";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import { Box, Button, Typography, useMediaQuery, Link } from "@mui/material";
import HamburgerMenu from "@/components/HamburgerMenu";
import TopNav from "@/components/TopNav";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user?.email;

  return (
    <>
      <HamburgerMenu />
      <TopNav>
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">
                <Image
                  src={"/logos/paylinq-logo.png"}
                  width={70}
                  height={70}
                  alt="payLinq-Logo"
                />
              </Link>
            </Typography>
            <Box>
              <Link href="/howitworks">
                <Button color="info" variant="outlined" sx={{ marginRight: 2 }}>
                  How it Works
                </Button>
              </Link>
              <Link href="/pricing">
                <Button color="info" variant="outlined" sx={{ marginRight: 2 }}>
                  Pricing
                </Button>
              </Link>
              <Link href="/contact">
                <Button color="info" variant="outlined">
                  Contact
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
              margin: 2,
            }}>
            {user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}>
                <Box>
                  <Button
                    type="submit"
                    color="info"
                    variant="outlined"
                    sx={{ marginRight: 2 }}>
                    Log Out
                  </Button>
                </Box>
              </form>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn();
                }}>
                <Box>
                  <Button
                    type="submit"
                    color="info"
                    variant="outlined"
                    sx={{ marginRight: 2 }}>
                    Sign In/ Sign Up
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </>
      </TopNav>
      <Home />
    </>
  );
}
