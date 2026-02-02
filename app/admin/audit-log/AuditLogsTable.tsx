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

interface AuditLog {
    id: string;
    adminEmail: string;
    action: string;
    targetType: string;
    targetId: string;
    details: any;
    createdAt: string;
}

const columnHelper = createColumnHelper<AuditLog>();

export default function AuditLogsTable() {
    const {
        data,
        meta,
        isLoading,
        page,
        setPage,
        sort,
        setSort,
        order,
        limit,
        search,
        setSearch
    } = usePaginatedQuery<AuditLog>({
        url: "/api/admin/audit-logs",
        queryKey: ["audit_logs"],
    });

    const columns = useMemo(() => [
        columnHelper.accessor("action", {
            header: "Action",
            cell: (info) => <span className="font-mono text-xs font-semibold text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor("adminEmail", {
            header: "Admin",
            cell: (info) => <span className="text-sm text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("targetType", {
            header: "Target",
            cell: info => (
                <div className="flex flex-col text-xs">
                    <span className="font-medium capitalize">{info.getValue()}</span>
                    <span className="font-mono text-gray-500">{info.row.original.targetId.slice(-8)}</span>
                </div>
            )
        }),
        columnHelper.accessor("details", {
            header: "Details",
            cell: info => {
                const details = info.getValue();
                return (
                    <pre className="text-[10px] bg-gray-50 p-1 rounded max-w-xs overflow-x-auto">
                        {JSON.stringify(details, null, 2).slice(0, 100)}
                        {JSON.stringify(details).length > 100 && "..."}
                    </pre>
                )
            }
        }),
        columnHelper.accessor("createdAt", {
            header: "Date",
            cell: (info) => format(new Date(info.getValue()), "MMM d, HH:mm:ss"),
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
                    placeholder="Search email, action, ID..."
                    className="border border-gray-300 rounded px-3 py-2 w-72 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">No logs found.</td></tr>
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
