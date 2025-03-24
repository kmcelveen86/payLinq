"use client";
import React from "react";
import { CreditCard, Edit2, Trash2, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const PaymentMethods = ({
  paymentMethods,
  onEdit,
  onDelete,
  onAdd,
}: PaymentMethodsProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <CreditCard size={20} className="mr-2 text-[#2D9642]" />
          Payment Methods
        </h2>
      </div>

      <div className="space-y-6">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/30 rounded-lg p-5 border border-gray-600 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gray-800 rounded-lg mr-4">
                <CreditCard className="text-[#C28F49]" size={20} />
              </div>
              <div>
                <p className="text-white font-medium">
                  {method.type === "debit" ? "Debit Card" : "Credit Card"} ••••{" "}
                  {method.last4}
                </p>
                <p className="text-sm text-gray-400">
                  Expires {method.expiryDate}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {method.isDefault && (
                <span className="text-xs bg-[#2D9642]/20 text-[#2D9642] px-3 py-1 rounded-full">
                  Default
                </span>
              )}
              <button
                type="button"
                onClick={() => onEdit(method.id)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(method.id)}
                className="p-2 text-rose-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onAdd}
          className="w-full py-3 flex items-center justify-center space-x-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-[#2D9642] transition-colors"
        >
          <PlusCircle size={18} />
          <span>Add New Payment Method</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentMethods;
