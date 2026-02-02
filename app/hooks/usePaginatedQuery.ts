import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface UsePaginatedQueryOptions {
    url: string;
    queryKey: string[];
    initialPage?: number;
    initialLimit?: number;
    initialSort?: string;
    initialOrder?: "asc" | "desc";
}

export function usePaginatedQuery<T>({
    url,
    queryKey,
    initialPage = 1,
    initialLimit = 20,
    initialSort = "createdAt",
    initialOrder = "desc",
}: UsePaginatedQueryOptions) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Read from URL or default
    const page = Number(searchParams.get("page")) || initialPage;
    const limit = Number(searchParams.get("limit")) || initialLimit;
    const sort = searchParams.get("sort") || initialSort;
    const order = (searchParams.get("order") as "asc" | "desc") || initialOrder;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    // Helper to update URL
    const updateUrl = useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === "") {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            });
            console.log("Updating URL:", newSearchParams.toString());
            startTransition(() => {
                router.push(`${pathname}?${newSearchParams.toString()}`);
            });
        },
        [pathname, router, searchParams]
    );

    // Fetcher
    const fetcher = async (): Promise<PaginatedResponse<T>> => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            sort,
            order,
        });
        if (search) params.set("search", search);
        if (status) params.set("status", status);

        const res = await fetch(`${url}?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    };

    const query = useQuery({
        queryKey: [...queryKey, page, limit, sort, order, search, status],
        queryFn: fetcher,
        placeholderData: (previousData) => previousData, // Keep previous data while fetching new
    });

    return {
        data: query.data?.data || [],
        meta: query.data?.meta || { total: 0, page, limit, totalPages: 0 },
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        isPlaceholderData: query.isPlaceholderData,
        isUrlUpdating: isPending,
        // State exposed for table controls
        page,
        limit,
        sort,
        order,
        search,
        status,
        // Actions
        setPage: (p: number) => updateUrl({ page: p }),
        setLimit: (l: number) => updateUrl({ limit: l, page: 1 }), // Reset to page 1 on limit change
        setSort: (s: string) => updateUrl({ sort: s, order: s === sort && order === "asc" ? "desc" : "asc" }),
        setSearch: (s: string) => updateUrl({ search: s, page: 1 }),
        setStatus: (s: string) => updateUrl({ status: s, page: 1 }),
    };
}
