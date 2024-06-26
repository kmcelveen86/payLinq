import React from "react";
import Link from "next/link";
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
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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

export default async function TopNav() {
  const isMobile = useMediaQuery("(max-width:720px)");
  const { data: session } = useSession();

  return (
    <React.Fragment>
      {isMobile ? (
        <HideOnScroll>
          <HamburgerMenu />
        </HideOnScroll>
      ) : (
        <HideOnScroll>
          <AppBar>
            <Toolbar
              style={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
              }}>
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
                    <Button
                      color="info"
                      variant="outlined"
                      sx={{ marginRight: 2 }}>
                      How it Works
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      color="info"
                      variant="outlined"
                      sx={{ marginRight: 2 }}>
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
              {session?.user?.email ? (
                <Box>
                  <Button
                    onClick={() => signOut()}
                    color="info"
                    variant="outlined"
                    sx={{ marginRight: 2 }}>
                    Log Out
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Link href="/signin">
                    <Button
                      color="info"
                      variant="outlined"
                      sx={{ marginRight: 2 }}>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button color="info" variant="outlined">
                      Register
                    </Button>
                  </Link>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      )}
    </React.Fragment>
  );
}
