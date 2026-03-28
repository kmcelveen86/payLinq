"use client";
import React, { useEffect, useRef, useState } from "react";
// import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowRight } from "lucide-react";
import { useUserProfile } from "@/app/hooks/useProfile";
import { useAuth, useSession, useUser } from "@clerk/nextjs";

export default function LifeDeserveSection(): React.ReactElement<any> {
  const router = useRouter();
  const { isLoaded, session, isSignedIn } = useSession();
  const clerkUser = useUser();
  const clerkAuth = useAuth();
  // console.log("🚀 ~ TopNavComp ~ authclerk:", clerkAuth);
  // console.log("🚀 ~ TopNavComp ~ userclerk:", clerkUser);
  const userEmail = clerkUser?.user?.primaryEmailAddress;
  // const { data: session } = useSession();
  const { data: userProfile } = useUserProfile();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Skip execution during server-side rendering

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasElement = canvas;
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 50;

    const colors = ["#2D9642", "#38B053", "#C28F49", "#D9A55C"];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvasElement.width;
        this.y = Math.random() * canvasElement.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasElement.width) this.x = 0;
        if (this.x < 0) this.x = canvasElement.width;
        if (this.y > canvasElement.height) this.y = 0;
        if (this.y < 0) this.y = canvasElement.height;
      }

      draw(): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    function init(): void {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connect(): void {
      if (!ctx) return;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particles[a].color;
            ctx.globalAlpha = 0.2 - distance / 500;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate(): void {
      requestAnimationFrame(animate);
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      connect();
    }

    init();
    animate();

    const handleResize = (): void => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  // const handleOnStartJourneyClick = () => {
  //   if (isAnonymous) {
  //     signIn("email", { callbackUrl: "/membership-tiers" });
  //   } else {
  //     if (!userProfile?.firstName) {
  //       router.push("/user/profile-edit");
  //     } else {
  //       router.push("/membership-tiers");
  //     }
  //   }
  // };

  // const getButtonText = () => {
  //   if (isAnonymous) {
  //     return "Start Your Journey";
  //   }

  //   if (userProfile?.firstName) {
  //     return "Continue Your Journey";
  //   }

  //   return "Your Journey Awaits";
  // };

  return (
    <div className="relative">
      {/* Canvas for animated background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-1"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(10,10,10,0.9) 50%, rgba(15,15,15,0.95) 100%)",
        }}
      />

      {/* Background accents */}
      <div
        className="absolute top-20 h-96 rounded-full blur-[150px] opacity-20 z-1"
        style={{ backgroundColor: "#2D9642" }}
      />
      <div
        className="absolute bottom-10 right-20 h-96 rounded-full blur-[150px] opacity-15 z-1"
        style={{ backgroundColor: "#C28F49" }}
      />

      <Box
        display="flex"
        minHeight="100vh"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex="2"
        sx={{
          marginLeft: { xs: "0", md: "133px" },
          color: "#fff",
          padding: { xs: "2rem", md: "3rem" },
          "@media (max-width: 1139px)": {
            flexDirection: "column",
            marginLeft: "0",
          },
          "@media (min-width: 720px) and (max-width: 1139px)": {
            paddingTop: "80px",
          },
        }}
      >
        <Box flex={1} p={2} maxWidth={{ xs: "100%", lg: "80%" }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h1"
              component="div"
              gutterBottom
              className="lg:w-[1039px] leading-10"
            >
              <div className="text-responsive leading-4">
                <span
                  className="font-mono font-semibold xs:text-2xl md:text-3xl lg:text-5xl text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #2D9642, #C28F49)",
                  }}
                >
                  {`Spend Anywhere. Unlock Real Purchasing Power.`}
                </span>
              </div>
            </Typography>

            <Typography
              variant="h6"
              component="div"
              className="text-white leading-relaxed xs:text-sm md:text-base lg:text-lg mt-6 mb-8"
            >
              {`Where your money becomes more valuable after you spend it.`}
            </Typography>

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8"
            >
              <Button
                onClick={handleOnStartJourneyClick}
                variant="contained"
                size="large"
                className="bg-linear-to-r from-[#2D9642] to-[#C28F49] hover:from-[#259138] hover:to-[#B37F41]"
                sx={{
                  borderRadius: "50px",
                  padding: "12px 32px",
                  fontWeight: "bold",
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #259138 0%, #B37F41 100%)",
                  },
                }}
                endIcon={
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                }
              >
                {getButtonText()}
              </Button>
            </motion.div> */}
          </motion.div>
        </Box>
      </Box>


    </div>
  );
}
