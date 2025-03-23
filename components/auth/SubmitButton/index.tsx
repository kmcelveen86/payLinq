import React from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
  text,
}) => {
  return (
    <motion.div
      className="pt-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        type="submit"
        fullWidth
        disabled={isLoading || isDisabled}
        sx={{
          py: 2,
          background: "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
          color: "white",
          fontWeight: "bold",
          boxShadow:
            "0 4px 15px rgba(45, 150, 66, 0.3), 0 1px 3px rgba(45, 150, 66, 0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          borderRadius: "10px",
          "&:hover": {
            background: "linear-gradient(90deg, #236f34 0%, #b37f41 100%)",
            boxShadow:
              "0 7px 20px rgba(45, 150, 66, 0.4), 0 3px 8px rgba(45, 150, 66, 0.2)",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "all 0.5s ease",
          },
          "&:hover:after": {
            left: "100%",
          },
          "&.Mui-disabled": {
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
          },
        }}
        className="relative group"
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>{text}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="ml-2"
            >
              <ArrowRight size={20} />
            </motion.div>
          </Box>
        )}
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
