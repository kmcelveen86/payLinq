"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { usePaginatedQuery } from "@/app/hooks/usePaginatedQuery";
import { useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface Customer {
    id: string;
    name: string | null;
    email: string;
    createdAt: string;
    banned: boolean;
    membershipTier: string | null;
    _count: {
        paylinqTransactions: number;
        accounts: number; // bank accounts
    }
}

const columnHelper = createColumnHelper<Customer>();

export default function CustomersTable() {
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
    } = usePaginatedQuery<Customer>({
        url: "/api/admin/customers",
        queryKey: ["customers"],
    });

    const columns = useMemo(() => [
        columnHelper.accessor("name", {
            header: "User",
            cell: (info) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{info.getValue() || "Unnamed"}</span>
                    <span className="text-xs text-gray-500">{info.row.original.email}</span>
                </div>
            ),
        }),
        columnHelper.accessor("membershipTier", {
            header: "Tier",
            cell: info => (
                <span className="capitalize text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {info.getValue() || "Free"}
                </span>
            )
        }),
        columnHelper.accessor("banned", {
            header: "Status",
            cell: info => info.getValue() ? (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">Banned</span>
            ) : (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Active</span>
            )
        }),
        columnHelper.accessor("_count.paylinqTransactions", {
            header: "Txns",
            cell: info => info.getValue() || 0
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
                    href={`/customers/${info.row.original.id}`}
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
                        placeholder="Search customers..."
                        className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 text-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setSearch(e.currentTarget.value)
                        }}
                        onBlur={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="border rounded px-3 py-2 text-sm w-full md:w-auto bg-white text-gray-900"
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
                    <div className="text-center py-12 text-gray-500">No customers found.</div>
                ) : (
                    data.map((customer) => (
                        <div key={customer.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{customer.name || "Unnamed"}</h3>
                                    <p className="text-sm text-gray-500">{customer.email}</p>
                                </div>
                                <div>
                                    {customer.banned ? (
                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">Banned</span>
                                    ) : (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Active</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Joined</span>
                                    {format(new Date(customer.createdAt), "MMM d, yyyy")}
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Tier</span>
                                    <span className="capitalize">{customer.membershipTier || "Free"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Transactions</span>
                                    {customer._count.paylinqTransactions}
                                </div>
                            </div>

                            <div className="pt-2 border-t flex justify-end">
                                <Link
                                    href={`/customers/${customer.id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    View Details &rarr;
                                </Link>
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
                                        No customers found.
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
                        className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 hover:bg-gray-50 font-medium"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= meta.totalPages}
                        className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 hover:bg-gray-50 font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
