"use client";

import { useState } from "react";
import { format } from "date-fns";
import { revokeUserSession, banUser, deleteSecurityLogs } from "@/app/actions/security";
import { toast } from "react-hot-toast";

type Log = {
    id: string;
    createdAt: Date;
    userEmail: string;
    ipAddress: string | null;
    path: string;
    action: string;
    user: {
        id: string;
        name: string | null;
        email: string;
        banned: boolean;
    };
};

export default function SecurityLogTable({ initialLogs }: { initialLogs: Log[] }) {
    const [logs, setLogs] = useState(initialLogs);
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());

    // Import the delete action dynamically or at top if not circular
    // For now assuming it's imported at top
    // import { deleteSecurityLogs } from "@/app/actions/security";

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedLogs);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedLogs(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedLogs.size === logs.length) {
            setSelectedLogs(new Set());
        } else {
            setSelectedLogs(new Set(logs.map(l => l.id)));
        }
    };

    const handleDelete = async () => {
        if (selectedLogs.size === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedLogs.size} logs?`)) return;

        setLoadingAction("bulk-delete");
        try {
            await deleteSecurityLogs(Array.from(selectedLogs));
            toast.success("Logs deleted successfully.");
            setLogs(prev => prev.filter(l => !selectedLogs.has(l.id)));
            setSelectedLogs(new Set());
        } catch (error) {
            toast.error("Failed to delete logs.");
            console.error(error);
        } finally {
            setLoadingAction(null);
        }
    };


    const handleRevoke = async (userId: string) => {
        if (!confirm("Are you sure you want to forcibly sign out this user?")) return;
        setLoadingAction(userId);
        try {
            await revokeUserSession(userId);
            toast.success("User session revoked.");
        } catch (error) {
            toast.error("Failed to revoke session.");
            console.error(error);
        } finally {
            setLoadingAction(null);
        }
    };

    const handleBan = async (userId: string) => {
        if (!confirm("Are you sure you want to BAN this user? This is a severe action.")) return;
        setLoadingAction(userId);
        try {
            await banUser(userId);
            toast.success("User banned and sessions revoked.");
            // Update local state to show banned
            setLogs(prev => prev.map(log =>
                log.user.id === userId ? { ...log, user: { ...log.user, banned: true } } : log
            ));
        } catch (error) {
            toast.error("Failed to ban user.");
            console.error(error);
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="space-y-4">
            {selectedLogs.size > 0 && (
                <div className="flex items-center justify-between bg-red-50 p-2 rounded border border-red-200">
                    <span className="text-sm text-red-800 font-medium px-2">{selectedLogs.size} logs selected</span>
                    <button
                        onClick={handleDelete}
                        disabled={loadingAction === "bulk-delete"}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {loadingAction === "bulk-delete" ? "Deleting..." : "Delete Selected"}
                    </button>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden border border-red-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 w-4">
                                    <input
                                        type="checkbox"
                                        checked={logs.length > 0 && selectedLogs.size === logs.length}
                                        onChange={toggleSelectAll}
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technical</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr key={log.id} className={`hover:bg-red-50/30 ${selectedLogs.has(log.id) ? "bg-red-50" : ""}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedLogs.has(log.id)}
                                            onChange={() => toggleSelect(log.id)}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{log.user.name || "Unknown"}</span>
                                            <span className="text-xs text-gray-500">{log.userEmail}</span>
                                            {log.user.banned && <span className="text-xs text-red-600 font-bold">BANNED</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            {log.action}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-1">Path: {log.path}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                                        <div>IP: {log.ipAddress || "N/A"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleRevoke(log.user.id)}
                                            disabled={loadingAction === log.user.id}
                                            className="text-orange-600 hover:text-orange-900 disabled:opacity-50"
                                        >
                                            Revoke Session
                                        </button>
                                        {!log.user.banned && (
                                            <button
                                                onClick={() => handleBan(log.user.id)}
                                                disabled={loadingAction === log.user.id}
                                                className="text-red-600 hover:text-red-900 font-bold disabled:opacity-50"
                                            >
                                                BAN USER
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No security incidents logged.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
