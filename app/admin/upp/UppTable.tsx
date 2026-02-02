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
                    className="border border-gray-300 rounded px-3 py-2 w-full md:w-72 text-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setSearch(e.currentTarget.value)
                    }}
                    onBlur={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading transactions...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No transactions found.</div>
                ) : (
                    data.map((trx) => (
                        <div key={trx.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold text-gray-900">{trx.wallet.user.name || "Unnamed"}</div>
                                    <div className="text-xs text-gray-500">{trx.wallet.user.email}</div>
                                </div>
                                <span className={`font-mono font-medium ${trx.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                                    {trx.amount > 0 ? "+" : ""}{trx.amount}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3 mt-1">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-medium">Type</span>
                                    <span className="capitalize bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium inline-block mt-0.5">
                                        {trx.type.replace("_", " ").toLowerCase()}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-medium">Source</span>
                                    <span className="text-gray-900 block mt-0.5">{trx.paylinqTransaction?.merchant?.name || "System"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-medium">Date</span>
                                    <span className="text-gray-700 block mt-0.5">{format(new Date(trx.createdAt), "MMM d, HH:mm")}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-medium">ID</span>
                                    <span className="font-mono text-xs text-gray-500 block mt-0.5">{trx.id.slice(-8)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden border">
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
