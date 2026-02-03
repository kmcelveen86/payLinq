
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    createdAt: string;
}

const fetchNotifications = async (): Promise<Notification[]> => {
    const { data } = await axios.get("/api/notifications");
    return data;
};

const markNotificationAsRead = async (id: string) => {
    const { data } = await axios.patch(`/api/notifications/${id}/read`);
    return data;
};

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        // Refetch every 5 minutes to keep count fresh without spamming
        refetchInterval: 5 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useMarkNotificationRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: (data, variables) => {
            // Optimistically update the cache
            queryClient.setQueryData(["notifications"], (oldData: Notification[] | undefined) => {
                if (!oldData) return [];
                return oldData.map((notification) =>
                    notification.id === variables ? { ...notification, read: true } : notification
                );
            });
        },
        onError: (error) => {
            console.error("Error marking notification as read:", error);
            toast.error("Failed to update notification");
        },
    });
};
