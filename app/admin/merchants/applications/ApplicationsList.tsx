"use client";

import { usePaginatedQuery } from "@/app/hooks/usePaginatedQuery";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";

interface MerchantApp {
    id: string;
    businessName: string;
    contactName: string;
    contactEmail: string;
    status: string;
    submittedAt: string;
}

export default function ApplicationsList() {
    const [filterStatus, setFilterStatus] = useState("pending");

    // Custom hook usage - we might need to adjust usePaginatedQuery if it doesn't support custom params well,
    // but usually it blindly passes params. 
    // Let's rely on its ?page=1 defaults and append status manually or via setParams pattern if available.
    // actually usePaginatedQuery handles url params. 

    // Simplified version: Just use a basic fetch or usePaginatedQuery if accessible with custom status
    // Since usePaginatedQuery syncs to URL, modifying the URL `?status=pending` works.

    const { data, meta, isLoading, page, setPage } = usePaginatedQuery<MerchantApp>({
        url: "/api/merchants/applications",
        queryKey: ["merchant_applications"],
    });

    return (
        <div className="space-y-4">
            <div className="flex gap-4 border-b">
                {["pending", "approved", "rejected"].map(s => (
                    <Link
                        key={s}
                        href={`?status=${s}`}
                        className={`py-2 px-4 border-b-2 capitalize text-sm font-medium ${(typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get("status") || "pending" : "pending") === s
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                        onClick={() => setFilterStatus(s)}
                    >
                        {s}
                    </Link>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : data.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No applications found with this status.</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.businessName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{app.contactName}</div>
                                        <div className="text-xs">{app.contactEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(app.submittedAt), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize 
                                    ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/merchants/applications/${app.id}`} className="text-blue-600 hover:text-blue-900">
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
