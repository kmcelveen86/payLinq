import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/app/api/securityService";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      // Redirect to the home page
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete your account. Please try again.");
    },
  });
};
