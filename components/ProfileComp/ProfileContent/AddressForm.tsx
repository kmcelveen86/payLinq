"use client";
import React from "react";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  formData: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastUpdatedText: string;
}

const AddressForm = ({
  formData,
  onChange,
  lastUpdatedText,
}: AddressFormProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <MapPin size={20} className="mr-2 text-[#2D9642]" />
          Address Information
        </h2>
        <span className="text-sm text-gray-400">{lastUpdatedText}</span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
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
              value={formData.city}
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
              value={formData.state}
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
              value={formData.postalCode}
              onChange={onChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D9642] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
