import React from "react";

const AuthDivider: React.FC = () => {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow h-px bg-gray-700"></div>
      <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
      <div className="flex-grow h-px bg-gray-700"></div>
    </div>
  );
};

export default AuthDivider;
