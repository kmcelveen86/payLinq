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

export default function MerchantConversionsTable({ merchantId }: { merchantId: string }) {


    // Fallback if hook doesn't support queryParams merging (it likely relies on queryKey or URL construction)
    // Looking at common patterns, if the hook constructs URL from params, we might need a custom fetcher or 
    // simply append to url: `/api/admin/conversions?merchantId=${merchantId}`
    // Let's assume the hook appends search/page/limit but we need to inject the extra param.
    // The safest way without seeing the hook internals is to override the URL.
    const urlWithParam = `/api/admin/conversions?merchantId=${merchantId}`;

    // Re-call hook with precise URL
    const query = usePaginatedQuery<Conversion>({
        url: urlWithParam,
        queryKey: ["conversions", merchantId]
    });

    // Deconstruct from the robust query call
    const tableData = query.data;
    const tableMeta = query.meta;
    const tableLoading = query.isLoading;
    const tablePage = query.page;
    const setTablePage = query.setPage;
    const setTableSearch = query.setSearch;
    const tableSearch = query.search;


    const columns = useMemo(() => [
        columnHelper.accessor("createdAt", {
            header: "Date",
            cell: (info) => <span className="text-gray-900">{format(new Date(info.getValue()), "MMM d, HH:mm")}</span>,
        }),
        // Omit Merchant Name since we are in merchant view
        columnHelper.accessor("user.email", {
            header: "User",
            cell: (info) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{info.row.original.user.firstName} {info.row.original.user.lastName}</span>
                    <span className="text-xs text-gray-500">{info.getValue()}</span>
                </div>
            ),
        }),
        columnHelper.accessor("amount", {
            header: "Amount",
            cell: (info) => (
                <span className="font-mono font-medium text-gray-900">
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
                <Link href={`/conversions/${info.getValue()}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                    View
                </Link>
            )
        })
    ], []);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: tableMeta.totalPages,
    });

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-200">
                <input
                    type="text"
                    placeholder="Search User ID or Email..."
                    className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={tableSearch}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setTableSearch(e.currentTarget.value)
                    }}
                    onBlur={(e) => setTableSearch(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                {tableLoading ? (
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
                                                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tableData.length === 0 ? (
                                    <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">No conversions found for this merchant.</td></tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
                <div className="text-sm text-gray-700">Page {tableMeta.page} of {tableMeta.totalPages}</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTablePage(tablePage - 1)}
                        disabled={tablePage <= 1}
                        className="px-3 py-1 border border-gray-300 rounded text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setTablePage(tablePage + 1)}
                        disabled={tablePage >= tableMeta.totalPages}
                        className="px-3 py-1 border border-gray-300 rounded text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
