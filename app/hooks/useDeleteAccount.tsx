import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const deleteAccount = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.delete("/api/users/delete-account");
  return response.data;
};

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      toast.success("Your account has been deleted successfully");

      // Sign out the user
      await signOut({ redirect: false });

      // Redirect to the home page or signup page
      router.push("/");
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete your account. Please try again.");
    },
  });
};
