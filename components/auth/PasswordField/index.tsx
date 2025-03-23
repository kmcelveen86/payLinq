import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  label?: string;
  error?: string | null;
  autoComplete?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  setPassword,
  label = "Password",
  error = null,
  autoComplete = "current-password",
}) => {
  return (
    <motion.div className="flex-none">
      <TextField
        margin="normal"
        required
        fullWidth
        name={label.toLowerCase().replace(/\s+/g, "-")}
        label={label}
        type="password"
        id={label.toLowerCase().replace(/\s+/g, "-")}
        autoComplete={autoComplete}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockKeyhole size={20} className="text-gray-400" />
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
          "& .MuiFormHelperText-root": {
            color: error ? "#f44336" : "inherit",
          },
          mt: 1,
          mb: 2,
        }}
      />
    </motion.div>
  );
};

export default PasswordField;
