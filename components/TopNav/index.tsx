import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import payLinqLogo from "../../app/resources/img/payLinq-logo.png";
import Image from "next/image";

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

export default function TopNav() {
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar>
          <Toolbar
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{display: "flex", alignItems: "center"}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Image
                  src={payLinqLogo}
                  width={70}
                  height={70}
                  alt="payLinq-Logo"
                />
              </Typography>
              <Box>
                <Link href="/howitworks">
                  <Button
                    color="info"
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                  >
                    How it Works
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    color="info"
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                  >
                    Pricing
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    color="info"
                    variant="outlined"
                  >
                    Contact
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box>
              <Link href="/signin">
                <Button color="info" variant="outlined" sx={{ marginRight: 2 }}>
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button color="info" variant="outlined">
                  Register
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
