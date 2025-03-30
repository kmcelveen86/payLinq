"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TopNavDropDown from "@/components/TopNavDropDown";
import HamburgerMenu from "../HamburgerMenu";
import TopNav from "./index";
import {
  SignInButton,
  SignOutButton,
  useAuth,
  useUser,
  useSession,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";

export default function TopNavComp() {
  const isMobile = useMediaQuery("(max-width:720px)");
  // const session = await auth();
  // const user = session?.user?.email;
  const { isLoaded, session, isSignedIn } = useSession();
  // console.log("🚀 ~ TopNavComp ~ session:", session);
  const clerkUser = useUser();
  const clerkAuth = useAuth();
  // console.log("🚀 ~ TopNavComp ~ authclerk:", clerkAuth);
  // console.log("🚀 ~ TopNavComp ~ userclerk:", clerkUser);

  return isMobile ? (
    <HamburgerMenu />
  ) : (
    <TopNav>
      <>
        {/* Gradient top border */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
            zIndex: 10,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1",
            position: "relative",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Box sx={{ position: "relative" }}>
                <Image
                  src={"/logos/paylinq-logo-new.png"}
                  width={70}
                  height={70}
                  alt="payLinq-Logo"
                  className="sm:ml-4 lg:ml-[133px]"
                />
                {/* Optional logo glow */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "radial-gradient(circle, rgba(45, 150, 66, 0.1) 0%, transparent 70%)",
                    filter: "blur(10px)",
                    zIndex: -1,
                  }}
                />
              </Box>
            </Link>
          </Typography>

          <Box className="pr-10">
            <Link href="/howitworks">
              <Button
                sx={{
                  marginRight: 2,
                  fontWeight: 500,
                  color: "#fff",
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  padding: "8px 12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderBottomColor: "#2D9642",
                  },
                }}
              >
                How It Works
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                sx={{
                  marginRight: 2,
                  fontWeight: 500,
                  color: "#fff",
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  padding: "8px 12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderBottomColor: "#C28F49",
                  },
                }}
              >
                Features
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                sx={{
                  marginRight: 2,
                  fontWeight: 500,
                  color: "#fff",
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  padding: "8px 12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderBottomColor: "#2D9642",
                  },
                }}
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                sx={{
                  fontWeight: 500,
                  color: "#fff",
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  padding: "8px 12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderBottomColor: "#C28F49",
                  },
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </Box>
        {clerkUser.isSignedIn ? (
          <TopNavDropDown />
        ) : (
          <Box
            className="sm:mr-4 lg:mr-10"
            sx={{
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <SignedIn>
              <SignOutButton redirectUrl="/" />
            </SignedIn>
            <SignedOut>
              <Box
                sx={{
                  background: "linear-gradient(90deg, #2D9642, #C28F49)",
                  color: "white",
                  borderRadius: "50px",
                  padding: "8px 24px",
                  fontWeight: "medium",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  border: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                    background: "linear-gradient(90deg, #236f34, #b37f41)",
                  },
                }}
              >
                <SignUpButton>Join Waitlist</SignUpButton>
              </Box>
            </SignedOut>
          </Box>
        )}
      </>
    </TopNav>
  );
}
