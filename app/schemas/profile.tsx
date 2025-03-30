import { z } from "zod";

const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// Define the notification preferences schema
const notificationPreferencesSchema = z.object({
  email: z.boolean().default(true).optional(),
  sms: z.boolean().default(false).optional(),
  app: z.boolean().default(true).optional(),
});

// Create partial profile schema for updates
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .optional(),
  dateOfBirth: z
    .string()
    .refine((val) => {
      if (!val) return true; // Skip validation if not provided
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < date.getDate())
      ) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, "You must be at least 18 years old")
    .optional(),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  postalCode: z.string().min(5, "ZIP code is required").optional(),
  agreedToTerms: z
    .boolean()
    .refine((val) => val, "You must agree to the terms")
    .optional(),
  // Add notification preferences to the schema
  notifications: notificationPreferencesSchema.optional(),
});

// Keep the original strict schema for creating profiles
export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < date.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, "You must be at least 18 years old"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "ZIP code is required"),
  agreedToTerms: z
    .boolean()
    .refine((val) => val, "You must agree to the terms"),
  // Add notification preferences to the schema
  notifications: notificationPreferencesSchema.optional(),
});

export const profilePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password is required")
      .refine((val) => {
        const hasUpperCase = /[A-Z]/.test(val);
        const hasLowerCase = /[a-z]/.test(val);
        const hasNumber = /\d/.test(val);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      }, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"], // This explicitly ties the error to confirmPassword
      });
    }
  });

// Define the notification preferences type
export type NotificationPreferences = {
  email?: boolean;
  sms?: boolean;
  app?: boolean;
};

// Update the ProfileFormData type to include notifications
export type ProfileFormData = z.infer<typeof profileSchema> & {
  notifications?: NotificationPreferences;
  profileImage?: string | null;
  membershipTier?: string;
};

// Add a type for partial updates
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema> & {
  notifications?: Partial<NotificationPreferences>;
  profileImage?: string | null;
  membershipTier?: string;
};
// Add a type for password updates
export type ProfilePasswordData = z.infer<typeof profilePasswordSchema>;
