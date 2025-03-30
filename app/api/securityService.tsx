import axios from "axios";

const API_BASE_URL_SECURITY = "/api/security";

const apiClient = axios.create({
  baseURL: API_BASE_URL_SECURITY,
  headers: {
    "Content-Type": "application/json",
  },
});

// Security APIs
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.patch("/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
