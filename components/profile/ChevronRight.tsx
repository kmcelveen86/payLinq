import React from "react";

interface ChevronRightProps {
  size?: number;
  className?: string;
}

const ChevronRight = ({ size = 24, className = "" }: ChevronRightProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRight;
