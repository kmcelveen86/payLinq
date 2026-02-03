import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateDatabaseUser,
  fetchUserAddress,
  updateUserAddress,
  fetchNotificationPreferences,
  updateNotificationPreferences,
  updateMembershipTier,
  // fetchPaymentMethods,
  // addPaymentMethod,
  // updatePaymentMethod,
  // deletePaymentMethod,
  uploadProfileImage,
  fetchSubscriptionStatus,
  createPortalSession,
  fetchUserWallet,
  fetchUserTransactions,
} from "@/app/api/userService";
import { toast } from "react-hot-toast";
import { ProfileFormData } from "../schemas/profile";
import { useUser } from "@clerk/nextjs";


// Define a separate type for database update
type DatabaseUserData = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  agreedToTerms: boolean;
};

// User Profile Hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: Infinity, // Never stale until explicit invalidation
  });
};

export const useUpdateUserProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormData) => {
      if (!user) throw new Error("User not logged in");

      // Then update the database
      const databaseUser = await updateDatabaseUser({
        userData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber, // Map phoneNumber to phoneNumber
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          notifications: data.notifications,
        },
      });

      return {
        database: databaseUser,
      };
    },
    onSuccess: (data) => {
      // Update the cache with the new data
      // queryClient.setQueryData(["userProfile"], data);

      // Invalidate any cached queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // Show success message
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    },
  });
};

// Address Hooks
export const useUserAddress = () => {
  return useQuery({
    queryKey: ["userAddress"],
    queryFn: fetchUserAddress,
    staleTime: Infinity,
  });
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddress"] });
      toast.success("Address updated successfully");
    },
    onError: (error) => {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    },
  });
};

// Notification Preferences Hooks
export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: ["notificationPreferences"],
    queryFn: fetchNotificationPreferences,
    staleTime: Infinity,
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPreferences"] });
      toast.success("Notification preferences updated");
    },
    onError: (error) => {
      console.error("Error updating notification preferences:", error);
      toast.error("Failed to update notification preferences");
    },
  });
};

// MEMBERSHIP TIER HOOKS

export const useUpdateMembershipTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMembershipTier,
    onSuccess: (data) => {
      // Update the cached user profile with the new membership tier
      queryClient.setQueryData(["userProfile"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            membershipTier: data.user.membershipTier,
          };
        }
        return oldData;
      });

      // Invalidate queries to trigger refetching
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userPoints"] });

      toast.success(data.message || "Membership tier updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating membership tier:", error);
      toast.error(
        error.response?.data?.message || "Failed to update membership tier"
      );
    },
  });
};

// Payment Methods Hooks
// export const usePaymentMethods = () => {
//   return useQuery({
//     queryKey: ["paymentMethods"],
//     queryFn: fetchPaymentMethods,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

// export const useAddPaymentMethod = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addPaymentMethod,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
//       toast.success("Payment method added");
//     },
//     onError: (error) => {
//       console.error("Error adding payment method:", error);
//       toast.error("Failed to add payment method");
//     },
//   });
// };

// export const useUpdatePaymentMethod = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       updatePaymentMethod(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
//       toast.success("Payment method updated");
//     },
//     onError: (error) => {
//       console.error("Error updating payment method:", error);
//       toast.error("Failed to update payment method");
//     },
//   });
// };

// export const useDeletePaymentMethod = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePaymentMethod,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
//       toast.success("Payment method removed");
//     },
//     onError: (error) => {
//       console.error("Error deleting payment method:", error);
//       toast.error("Failed to remove payment method");
//     },
//   });
// };

// Subscription Hooks
export const useSubscriptionStatus = () => {
  return useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: fetchSubscriptionStatus,
    staleTime: Infinity,
  });
};

export const useManageSubscription = () => {
  return useMutation({
    mutationFn: createPortalSession,
    onSuccess: (data: { url: string }) => {
      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Error creating portal session:", error);
      toast.error("Failed to redirect to billing portal");
    },
  });
};

export const useUserWallet = () => {
  return useQuery({
    queryKey: ["userWallet"],
    queryFn: fetchUserWallet,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Poll every minute
    refetchOnWindowFocus: true,
  });
};

export const useUserTransactions = () => {
  return useQuery({
    queryKey: ["userTransactions"],
    queryFn: fetchUserTransactions,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Poll every minute
    refetchOnWindowFocus: true,
  });
};

// React Query hook for profile image upload
export const useProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      // Update the cached user profile with the new image URL
      queryClient.setQueryData(["userProfile"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            profileImage: data.imageUrl,
            image: data.imageUrl,
          };
        }
        return oldData;
      });

      // Invalidate the query to trigger a background refetch
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Profile image updated successfully");
    },
    onError: (error) => {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile image");
    },
  });
};

// Combined profile data hook for convenience
export const useProfileData = () => {
  const profileQuery = useUserProfile();
  const addressQuery = useUserAddress();
  const notificationsQuery = useNotificationPreferences();
  // const paymentMethodsQuery = usePaymentMethods();

  const isLoading =
    profileQuery.isLoading ||
    addressQuery.isLoading ||
    notificationsQuery.isLoading;
  // || paymentMethodsQuery.isLoading;

  const isError =
    profileQuery.isError || addressQuery.isError || notificationsQuery.isError;
  // || paymentMethodsQuery.isError;

  const data = {
    user: profileQuery.data,
    address: addressQuery.data,
    notifications: notificationsQuery.data,
    // paymentMethods: paymentMethodsQuery.data
    // || [],
  };

  return {
    isLoading,
    isError,
    data,
  };
};
