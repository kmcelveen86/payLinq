"use client";
import { changePassword } from "@/app/api/securityService";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ProfilePasswordData, profilePasswordSchema } from "../schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useUpdatePassword() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilePasswordData>({
    resolver: zodResolver(profilePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
  });

  // Watch form fields for validation
  const formValues = watch();

  const profilePasswordMutation = useMutation({
    mutationFn: (data: ProfilePasswordData) =>
      changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword
      ),
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully");
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update password");
    },
  });

  const onSubmit = async (data: ProfilePasswordData) =>
    profilePasswordMutation.mutate(data);
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    formValues,
    isPending: profilePasswordMutation.isPending,
    isError: profilePasswordMutation.isError,
    isSuccess: profilePasswordMutation.isSuccess,
    error: profilePasswordMutation.error,
  };
}
