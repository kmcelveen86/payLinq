import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, CreditCard } from "lucide-react";

interface Props {
  emailEnabled: boolean;
  smsEnabled: boolean;
  appEnabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationsForm = ({
  emailEnabled,
  smsEnabled,
  appEnabled,
  onChange,
}: Props) => {
  return (
    <motion.div
      key="notifications"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Mail size={20} className="mr-2 text-[#2D9642]" />
          Notification Preferences
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
          <h3 className="text-lg font-medium mb-4">Communication Channels</h3>
          <div className="space-y-4">
            {[
              {
                name: "notifications.email",
                label: "Email Notifications",
                description: "Receive updates about your account via email",
                checked: emailEnabled,
                icon: <Mail size={18} className="text-gray-400 mr-3" />,
              },
              {
                name: "notifications.sms",
                label: "SMS Notifications",
                description: "Receive important alerts via text message",
                checked: smsEnabled,
                icon: <Phone size={18} className="text-gray-400 mr-3" />,
              },
              {
                name: "notifications.app",
                label: "App Notifications",
                description: "Receive in-app notifications and alerts",
                checked: appEnabled,
                icon: <CreditCard size={18} className="text-gray-400 mr-3" />,
              },
            ].map(({ name, label, description, checked, icon }) => (
              <div className="flex items-center justify-between" key={name}>
                <div className="flex items-center">
                  {icon}
                  <div>
                    <p className="text-white">{label}</p>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                  />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9642]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsForm;
