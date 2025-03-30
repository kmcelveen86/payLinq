export interface User {
  clerkId: string;
  id: string;
  updatedAt?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  dateOfBirth?: string;
  image?: string;
  billingCycle?: "monthly" | "annual";
  membershipTier:
  | "Freemium"
  | "Lifestyle"
  | "VIP Lifestyle"
  | "Elite Lifestyle";
}

export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  app: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "debit" | "credit";
  last4: string;
  expiryDate: string;
  isDefault: boolean;
  brand?: string;
  cardholderName?: string;
}

export interface LoginActivity {
  id: string;
  device: string;
  location: string;
  time: string;
  current: boolean;
}

export interface ProfileFormData {
  user: User;
  address: Address;
  notifications: NotificationPreferences;
  paymentMethods: PaymentMethod[];
}
