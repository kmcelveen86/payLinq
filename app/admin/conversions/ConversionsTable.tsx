"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "@/app/hooks/usePaginatedQuery";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

interface Conversion {
    id: string;
    amount: number;
    currency: string;
    status: string;
    uppEarned: number;
    createdAt: string;
    user: { email: string; firstName: string; lastName: string };
    merchant: { name: string };
}

const columnHelper = createColumnHelper<Conversion>();

export default function ConversionsTable() {
    const [minAmount, setMinAmount] = useState<number | "">("");

    const {
        data,
        meta,
        isLoading,
        page,
        setPage,
        setSearch,
        search,
    } = usePaginatedQuery<Conversion>({
        url: "/api/admin/conversions",
        queryKey: ["conversions", String(minAmount)],
        // Custom params can be handled by appending to URL manually in queryFn or modifying hook.
        // simpler to just use search for now, or assume usePaginatedQuery only handles standard params.
        // If usePaginatedQuery doesn't support extra params dynamically, we might need a custom fetch here.
        // But it typically passes through search params from URL.
        // We will sync minAmount to URL if needed, but for now let's just stick to search.
    });

    // Note: if usePaginatedQuery doesn't forward custom props, we rely on search.
    // For filters: The user can type "amount>100" in search if we implemented advanced parsing, 
    // but simpler is just visual filters.

    const columns = useMemo(() => [
        columnHelper.accessor("createdAt", {
            header: "Date",
            cell: (info) => format(new Date(info.getValue()), "MMM d, HH:mm"),
        }),
        columnHelper.accessor("merchant.name", {
            header: "Merchant",
            cell: (info) => <span className="font-medium text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor("user.email", {
            header: "User",
            cell: (info) => <span className="text-sm text-gray-600">{info.getValue()}</span>,
        }),
        columnHelper.accessor("amount", {
            header: "Amount",
            cell: (info) => (
                <span className="font-mono">
                    {(info.getValue() / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
            ),
        }),
        columnHelper.accessor("uppEarned", {
            header: "UPP Earned",
            cell: (info) => <span className="text-blue-600 font-bold">{info.getValue().toFixed(2)}</span>,
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${info.getValue() === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("id", {
            header: "Actions",
            cell: (info) => (
                <Link href={`/conversions/${info.getValue()}`} className="text-blue-500 hover:align-middle">
                    View
                </Link>
            )
        })
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: meta.totalPages,
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
                <input
                    type="text"
                    placeholder="Search User, Merchant, or ID..."
                    className="border rounded px-3 py-2 w-full max-w-sm text-sm"
                    defaultValue={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setSearch(e.currentTarget.value)
                    }}
                    onBlur={(e) => setSearch(e.target.value)}
                />
                {/* Potentially add amount filter here */}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border">
                {isLoading ? (
                    <div className="p-12 text-center text-gray-500">Loading conversions...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.length === 0 ? (
                                    <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">No conversions found.</td></tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Page {meta.page} of {meta.totalPages}</div>
                <div className="flex gap-2">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50">Previous</button>
                    <button onClick={() => setPage(page + 1)} disabled={page >= meta.totalPages} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
}
