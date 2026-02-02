"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    SortingState,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "@/app/hooks/usePaginatedQuery";
import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

// Type based on our Prisma Model + API response structure
interface Merchant {
    id: string;
    name: string;
    contactEmail?: string; // Schema might not have this populated yet
    category?: string;
    createdAt: string;
    commissionRate?: number;
    _count?: {
        paylinqTransactions: number;
    }
}

const columnHelper = createColumnHelper<Merchant>();

export default function MerchantsTable() {
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
    } = usePaginatedQuery<Merchant>({
        url: "/api/admin/merchants",
        queryKey: ["merchants"],
    });

    const columns = useMemo(() => [
        columnHelper.accessor("name", {
            header: "Business Name",
            cell: (info) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{info.getValue()}</span>
                    {/* <span className="text-xs text-gray-500">ID: {info.row.original.id}</span> */}
                </div>
            ),
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: (info) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {info.getValue() || "Uncategorized"}
                </span>
            ),
        }),
        columnHelper.accessor("_count.paylinqTransactions", {
            header: "Txns",
            cell: info => info.getValue() || 0
        }),
        columnHelper.accessor("commissionRate", {
            header: "Rate",
            cell: info => `${((info.getValue() || 0) * 100).toFixed(0)}%`
        }),
        columnHelper.accessor("createdAt", {
            header: "Joined",
            cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy"),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
                <Link
                    href={`/merchants/${info.row.original.id}`}
                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                >
                    View
                </Link>
            ),
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
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search merchants..."
                        className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 text-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setSearch(e.currentTarget.value)
                        }}
                        onBlur={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                </select>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No merchants found.</div>
                ) : (
                    data.map((merchant) => (
                        <div key={merchant.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{merchant.name}</h3>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                                        {merchant.category || "Uncategorized"}
                                    </span>
                                </div>
                                <Link
                                    href={`/merchants/${merchant.id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    View
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 border-t pt-3 mt-1">
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Rate</span>
                                    {((merchant.commissionRate || 0) * 100).toFixed(0)}%
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Transactions</span>
                                    {merchant._count?.paylinqTransactions || 0}
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-xs text-gray-400 uppercase">Joined</span>
                                    {format(new Date(merchant.createdAt), "MMM d, yyyy")}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table */}
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
                                            onClick={() => {
                                                setSort(header.id)
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {sort === header.id && (order === "asc" ? " ↑" : " ↓")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                        No merchants found.
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
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
                    Page {meta.page} of {meta.totalPages} ({meta.total} results)
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                        className="px-3 py-1 border border-gray-300 bg-white text-gray-900 rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= meta.totalPages}
                        className="px-3 py-1 border border-gray-300 bg-white text-gray-900 rounded disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
