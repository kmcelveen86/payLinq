import axios from "axios";
import { ProfileFormData } from "../schemas/profile";
import {
  User,
  Address,
  NotificationPreferences,
  PaymentMethod,
} from "../types";

interface UploadResponse {
  success: boolean;
  imageUrl: string;
}

interface UpdateMembershipTierParams {
  tierName: string;
  annualBilling: boolean;
}

interface UpdateMembershipTierResponse {
  success: boolean;
  user: {
    id: string;
    membershipTier: string;
    billingCycle: "monthly" | "annual";
  };
  message: string;
}

const API_BASE_URL = "/api/users";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUserProfile = async (data: ProfileFormData) => {
  const response = await apiClient.post("/profile", data);
  return response.data;
};

// User Profile APIs
export const fetchUserProfile = async (): Promise<User> => {
  const response = await apiClient.get("/profile");
  return response.data;
};

// Mutation for updating user in the db
export const updateDatabaseUser = async ({
  userData,
}: {
  userData: Partial<User> & { notifications?: any };
}) => {
  const response = await apiClient.put("/profile", {
    ...userData,
  });
  return response.data;
};

// export const updateUserProfile = async (
//   userData: Partial<User>
// ): Promise<User> => {
//   const response = await apiClient.put("/profile", {
//     ...userData,
//     agreedToTerms: true,
//   });
//   return response.data;
// };

// Address APIs
export const fetchUserAddress = async (): Promise<Address> => {
  const response = await apiClient.get("/address");
  return response.data;
};

export const updateUserAddress = async (
  addressData: Partial<Address>
): Promise<Address> => {
  const response = await apiClient.put("/address", addressData);
  return response.data;
};

// Notification Preferences APIs
export const fetchNotificationPreferences =
  async (): Promise<NotificationPreferences> => {
    const response = await apiClient.get("/notifications");
    return response.data;
  };

export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferences> => {
  const response = await apiClient.put("/notifications", preferences);
  return response.data;
};

// Function to upload profile image
export const uploadProfileImage = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await apiClient.post("/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateMembershipTier = async (
  params: UpdateMembershipTierParams
): Promise<UpdateMembershipTierResponse> => {
  const response = await apiClient.post("/membership-tier", params);
  return response.data;
};

// Subscription Services
export const fetchSubscriptionStatus = async () => {
  const response = await axios.get("/api/stripe/subscription-status");
  return response.data;
};

export const createPortalSession = async (returnUrl?: string) => {
  const response = await axios.post("/api/stripe/customer-portal", { returnUrl });
  return response.data;
};

export const fetchStripePrices = async () => {
  const response = await axios.get("/api/stripe/prices");
  return response.data;
};

// Payment Methods APIs
// export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
//   const response = await apiClient.get("/payment-methods");
//   return response.data;
// };

// export const addPaymentMethod = async (
//   paymentMethod: Partial<PaymentMethod>
// ): Promise<PaymentMethod> => {
//   const response = await apiClient.post("/payment-methods", paymentMethod);
//   return response.data;
// };

// export const updatePaymentMethod = async (
//   id: string,
//   paymentMethod: Partial<PaymentMethod>
// ): Promise<PaymentMethod> => {
//   const response = await apiClient.put(`/payment-methods/${id}`, paymentMethod);
//   return response.data;
// };

// export const deletePaymentMethod = async (id: string): Promise<void> => {
//   await apiClient.delete(`/payment-methods/${id}`);
// };

// export const enableTwoFactorAuth = async (): Promise<{
//   success: boolean;
//   setupUrl: string;
// }> => {
//   const response = await apiClient.post("/enable-2fa");
//   return response.data;
// };

// export const fetchLoginHistory = async (): Promise<any[]> => {
//   const response = await apiClient.get("/login-history");
//   return response.data;
// };

export const cancelMembership = async () => {
  const response = await axios.post("/api/user/cancel-membership");
  return response.data;
};

export const fetchUserWallet = async () => {
  const response = await apiClient.get("/wallet");
  return response.data;
};

export const fetchUserTransactions = async () => {
  const response = await apiClient.get("/transactions");
  return response.data;
};
