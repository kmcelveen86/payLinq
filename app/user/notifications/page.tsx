
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useNotifications, useMarkNotificationRead } from "@/app/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
    const { data: notifications, isLoading } = useNotifications();
    const { mutate: markRead } = useMarkNotificationRead();

    const handleNotificationClick = (id: string, read: boolean) => {
        if (!read) {
            markRead(id);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircle className="text-green-400" size={24} />;
            case "warning":
                return <AlertTriangle className="text-yellow-400" size={24} />;
            case "error":
                return <XCircle className="text-red-400" size={24} />;
            default:
                return <Info className="text-blue-400" size={24} />;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/user/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center">
                        <Bell className="mr-3 text-[#2D9642]" size={32} />
                        Notifications
                    </h1>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2D9642]"></div>
                    </div>
                ) : notifications?.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <Bell size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No notifications yet.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {notifications?.map((notification) => (
                            <motion.div
                                key={notification.id}
                                variants={itemVariants}
                                onClick={() => handleNotificationClick(notification.id, notification.read)}
                                className={`
                            relative p-4 rounded-xl border cursor-pointer transition-all duration-200
                            ${notification.read
                                        ? "bg-gray-800/40 border-gray-700 hover:bg-gray-800/60"
                                        : "bg-gray-800 border-[#2D9642]/50 hover:bg-gray-750 shadow-lg shadow-[#2D9642]/10"}
                        `}
                            >
                                {!notification.read && (
                                    <span className="absolute top-4 right-4 h-2 w-2 bg-[#2D9642] rounded-full"></span>
                                )}
                                <div className="flex items-start">
                                    <div className={`p-2 rounded-lg mr-4 ${notification.read ? "bg-gray-700/50" : "bg-gray-700"}`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-lg mb-1 ${notification.read ? "text-gray-300" : "text-white"}`}>
                                            {notification.title}
                                        </h3>
                                        <p className={`text-sm mb-2 ${notification.read ? "text-gray-500" : "text-gray-300"}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
