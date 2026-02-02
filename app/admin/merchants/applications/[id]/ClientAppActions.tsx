"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientAppActions({ applicationId, status }: { applicationId: string, status: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // If approved, show status only
    if (status === 'approved') {
        return (
            <div className="bg-gray-50 p-4 rounded text-center text-sm text-gray-500">
                This application has been approved.
            </div>
        );
    }

    const handleApprove = async () => {
        if (!confirm("Approve this application and create a live Merchant?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/admin/api/merchants/applications/${applicationId}/approve`, { method: "POST" });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
            router.push("/merchants"); // Redirect to merchant list
        } catch (e) {
            alert("Error approving");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        const notes = prompt("Enter rejection reason (optional):");
        if (notes === null) return;

        setLoading(true);
        try {
            const res = await fetch(`/admin/api/merchants/applications/${applicationId}/reject`, {
                method: "POST",
                body: JSON.stringify({ confirm: true, notes })
            });
            if (!res.ok) throw new Error("Failed");
            router.refresh();
        } catch (e) {
            alert("Error rejecting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-4 mt-6">
            <button
                onClick={handleApprove}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full disabled:opacity-50"
            >
                {loading ? "Processing..." : "Approve & Create Merchant"}
            </button>
            {status === 'pending' && (
                <button
                    onClick={handleReject}
                    disabled={loading}
                    className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded w-full disabled:opacity-50"
                >
                    Reject
                </button>
            )}
        </div>
    );
}
