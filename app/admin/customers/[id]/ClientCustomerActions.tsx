"use client";

import { useState } from "react";
import { SuspendUserModal } from "../../components/ActionModals";

export default function ClientCustomerActions({ user }: { user: any }) {
    const [showSuspend, setShowSuspend] = useState(false);

    return (
        <>
            <button
                className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 text-sm font-medium opacity-50 cursor-not-allowed"
                title="Impersonation coming soon"
            >
                Impersonate
            </button>

            {user.banned ? (
                <button
                    onClick={() => setShowSuspend(true)}
                    className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                >
                    Unban User
                </button>
            ) : (
                <button
                    onClick={() => setShowSuspend(true)}
                    className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
                >
                    Ban User
                </button>
            )}

            <SuspendUserModal
                isOpen={showSuspend}
                onClose={() => setShowSuspend(false)}
                userId={user.id}
                isBanned={user.banned}
            />
        </>
    );
}
