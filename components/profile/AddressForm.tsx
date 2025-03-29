import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Props {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatedAt?: string | Date;
}

const AddressForm = ({
  address,
  city,
  state,
  postalCode,
  onChange,
  updatedAt,
}: Props) => {
  return (
    <motion.div
      key="address"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <MapPin size={20} className="mr-2 text-[#2D9642]" />
          Address Information
        </h2>
        {updatedAt && (
          <span className="text-sm text-gray-400">
            Last updated:{" "}
            {typeof updatedAt === "string"
              ? updatedAt
              : updatedAt.toLocaleString()}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={onChange}
            className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={onChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={state}
              onChange={onChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={postalCode}
              onChange={onChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddressForm;
