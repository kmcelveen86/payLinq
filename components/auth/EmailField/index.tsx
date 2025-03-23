import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ email, setEmail }) => {
  return (
    <motion.div className="flex-none">
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={20} className="text-gray-400" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "rgba(255,255,255,0.05)",
            "&.Mui-focused fieldset": {
              borderColor: "#2D9642",
            },
            "&:hover fieldset": {
              borderColor: "#2D9642",
            },
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.2)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.7)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2D9642",
          },
          mt: 1,
          mb: 2,
        }}
      />
    </motion.div>
  );
};

export default EmailField;
