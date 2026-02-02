"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "@/app/hooks/usePaginatedQuery";
import { useMemo } from "react";
import { format } from "date-fns";

interface UppTransaction {
    id: string;
    amount: number;
    type: string;
    description: string;
    status: string;
    createdAt: string;
    wallet: {
        user: {
            name: string | null;
            email: string;
        }
    };
    paylinqTransaction?: {
        merchant?: {
            name: string;
        }
    }
}

const columnHelper = createColumnHelper<UppTransaction>();

export default function UppTable() {
    const {
        data,
        meta,
        isLoading,
        page,
        setPage,
        sort,
        order,
        setSort,
        limit,
        setLimit,
        search,
        setSearch
    } = usePaginatedQuery<UppTransaction>({
        url: "/api/admin/upp",
        queryKey: ["upp_transactions"],
    });

    const columns = useMemo(() => [
        columnHelper.accessor("id", {
            header: "ID",
            cell: (info) => <span className="font-mono text-xs text-gray-500">{info.getValue().slice(-8)}</span>,
        }),
        columnHelper.accessor("wallet.user.email", {
            header: "User",
            cell: (info) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{info.row.original.wallet.user.name || "Unnamed"}</span>
                    <span className="text-xs text-gray-500">{info.getValue()}</span>
                </div>
            )
        }),
        columnHelper.accessor("type", {
            header: "Type",
            cell: info => <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded capitalize">{info.getValue().replace("_", " ").toLowerCase()}</span>
        }),
        columnHelper.accessor("amount", {
            header: "Points",
            cell: info => {
                const val = info.getValue();
                return (
                    <span className={`font-mono font-medium ${val > 0 ? "text-green-600" : "text-gray-900"}`}>
                        {val > 0 ? "+" : ""}{val}
                    </span>
                )
            }
        }),
        columnHelper.accessor("paylinqTransaction.merchant.name", {
            header: "Source", // Merchant or 'System'
            cell: info => info.getValue() || "System / Manual"
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: info => <span className="text-xs text-gray-500 lowercase">{info.getValue()}</span>
        }),
        columnHelper.accessor("createdAt", {
            header: "Date",
            cell: (info) => format(new Date(info.getValue()), "MMM d, HH:mm"),
        }),
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: meta.totalPages,
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <input
                    type="text"
                    placeholder="Search transaction ID or User ID..."
                    className="border rounded px-3 py-2 w-72 text-sm"
                    defaultValue={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setSearch(e.currentTarget.value)
                    }}
                    onBlur={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => setSort(header.id)}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">Loading...</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">No transactions found.</td></tr>
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
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Page {meta.page} of {meta.totalPages}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= meta.totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
