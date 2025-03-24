"use client";
import React from "react";
import { Mail, Phone, CreditCard, Bell } from "lucide-react";

interface NotificationsFormProps {
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NotificationsForm = ({
  notifications,
  onChange,
}: NotificationsFormProps) => {
  const options = [
    {
      name: "notifications.email",
      label: "Email Notifications",
      description: "Receive updates about your account via email",
      icon: <Mail className="text-gray-400 mr-3" size={18} />,
      checked: notifications.email,
    },
    {
      name: "notifications.sms",
      label: "SMS Notifications",
      description: "Receive important alerts via text message",
      icon: <Phone className="text-gray-400 mr-3" size={18} />,
      checked: notifications.sms,
    },
    {
      name: "notifications.app",
      label: "App Notifications",
      description: "Receive in-app notifications and alerts",
      icon: <CreditCard className="text-gray-400 mr-3" size={18} />,
      checked: notifications.app,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Bell size={20} className="mr-2 text-[#2D9642]" />
          Notification Preferences
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
          <h3 className="text-lg font-medium mb-4">Communication Channels</h3>

          <div className="space-y-4">
            {options.map((opt) => (
              <div key={opt.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  {opt.icon}
                  <div>
                    <p className="text-white">{opt.label}</p>
                    <p className="text-sm text-gray-400">{opt.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    name={opt.name}
                    checked={opt.checked}
                    onChange={onChange}
                  />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9642]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsForm;
