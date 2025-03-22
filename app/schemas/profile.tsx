import { z } from "zod";

const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// Define the notification preferences schema
const notificationPreferencesSchema = z.object({
  email: z.boolean().default(true),
  sms: z.boolean().default(false),
  app: z.boolean().default(true),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),

  dob: z.string().refine((val) => {
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

// Define the notification preferences type
export type NotificationPreferences = {
  email: boolean;
  sms: boolean;
  app: boolean;
};

// Update the ProfileFormData type to include notifications
export type ProfileFormData = z.infer<typeof profileSchema> & {
  notifications?: NotificationPreferences;
  profileImage?: string | null;
  membershipTier?: string;
};
