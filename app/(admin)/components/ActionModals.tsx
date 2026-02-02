"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
    onConfirm: () => void;
    confirmLabel?: string;
    confirmDestructive?: boolean;
}

function Modal({ isOpen, onClose, title, children, isLoading, onConfirm, confirmLabel = "Confirm", confirmDestructive }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <div className="mb-6">{children}</div>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} disabled={isLoading} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-white rounded font-medium ${confirmDestructive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                            } disabled:opacity-50`}
                    >
                        {isLoading ? "Processing..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function SuspendMerchantModal({ merchantId, currentStatus, isOpen, onClose }: { merchantId: string, currentStatus: string, isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const action = currentStatus === "suspended" ? "unsuspend" : "suspend";

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/merchants/${merchantId}/suspend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, reason }),
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
            onClose();
        } catch (e) {
            alert("Error updating status");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === "suspend" ? "Suspend Merchant" : "Unsuspend Merchant"}
            onConfirm={handleConfirm}
            confirmLabel={action === "suspend" ? "Suspend Account" : "Reactivate Account"}
            confirmDestructive={action === "suspend"}
            isLoading={isLoading}
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Are you sure you want to {action} this merchant? This will be logged.
                </p>
                <div>
                    <label className="block text-sm font-medium mb-1">Reason (Required)</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        placeholder="e.g. Violation of terms, Requested by user..."
                        required
                    />
                </div>
            </div>
        </Modal>
    );
}

export function UpdateRateModal({ merchantId, currentRate, isOpen, onClose }: { merchantId: string, currentRate: number, isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const [rate, setRate] = useState(String(currentRate));
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/merchants/${merchantId}/rate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rate: Number(rate), reason }),
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
            onClose();
        } catch (e) {
            alert("Error updating rate");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Update Commission Rate"
            onConfirm={handleConfirm}
            confirmLabel="Save"
            isLoading={isLoading}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">New Rate (0.0 - 1.0)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Example: 0.8 = 80% of Base UPP</p>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Reason (Required)</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        placeholder="e.g. Contract renewal negotiation..."
                        required
                    />
                </div>
            </div>
        </Modal>
    );
}

export function SuspendUserModal({ userId, isBanned, isOpen, onClose }: { userId: string, isBanned: boolean, isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const action = isBanned ? "unban" : "ban";

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/customers/${userId}/suspend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, reason }),
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
            onClose();
        } catch (e) {
            alert("Error updating status");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === "ban" ? "Ban User" : "Unban User"}
            onConfirm={handleConfirm}
            confirmLabel={action === "ban" ? "Ban Account" : "Restore Account"}
            confirmDestructive={action === "ban"}
            isLoading={isLoading}
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Are you sure you want to {action} this user? They will {action === "ban" ? "lose access immediately" : "regain access"}.
                </p>
                <div>
                    <label className="block text-sm font-medium mb-1">Reason (Required)</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        placeholder="e.g. Violation of terms..."
                        required
                    />
                </div>
            </div>
        </Modal>
    );
}
