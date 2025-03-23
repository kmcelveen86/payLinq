import React from "react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface TermsCheckboxProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  agreeToTerms,
  setAgreeToTerms,
}) => {
  return (
    <motion.div className="flex-none">
      <FormControlLabel
        control={
          <Checkbox
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            sx={{
              color: "rgba(255,255,255,0.5)",
              "&.Mui-checked": {
                color: "#C28F49",
              },
            }}
          />
        }
        label={
          <Typography variant="body2" className="text-gray-300">
            I agree to the{" "}
            <span className="text-[#C28F49] cursor-pointer hover:underline">
              Terms and Conditions
            </span>
          </Typography>
        }
        sx={{ color: "rgba(255,255,255,0.7)" }}
      />
    </motion.div>
  );
};

export default TermsCheckbox;
