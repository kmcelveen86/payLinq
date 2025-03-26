"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { formatDistance } from "date-fns";
import DeleteAccountModal from "../DeleteAccountModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSideBar from "@/components/profile/ProfileSideBar/EditProfileSideBar";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import AddressForm from "@/components/profile/AddressForm";
import NotificationsForm from "@/components/profile/NotificationsForm";
import PaymentMethods from "@/components/profile/PaymentMethods";
import SecuritySettings from "@/components/profile/SecuritySettings";

import {
  useUserProfile,
  useUpdateUserProfile,
  useProfileImage,
} from "../../../app/hooks/useProfile";
import { ProfileFormData } from "../../../app/schemas/profile";

const ProfileEdit = () => {
  const { isLoaded, session, isSignedIn } = useSession();
  const clerkUser = useUser();
  const clerkAuth = useAuth();
  // // console.log("🚀 ~ Profile EDITTTT ~ authclerk:", clerkAuth);
  // // console.log("🚀 ~ Profile EDITTTT ~ userclerk:", clerkUser);
  const userEmail = clerkUser?.user?.primaryEmailAddress;
  const userImg = clerkUser?.user?.imageUrl;
  const userObj = clerkUser?.user;
  const updatedAt = clerkUser?.user?.updatedAt;

  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loginHistory, setLoginHistory] = useState([
    {
      device: "iPhone 14 Pro",
      location: "New York, NY",
      time: "Today, 2:45 PM",
      current: true,
    },
    {
      device: "Macbook Pro",
      location: "New York, NY",
      time: "Yesterday, 9:30 AM",
    },
    {
      device: "Chrome on Windows",
      location: "Boston, MA",
      time: "Oct 15, 2023, 6:15 PM",
    },
  ]);

  const { mutate: uploadImage, isPending: isUploading } = useProfileImage();
  const { data: profileData } = useUserProfile();
  // console.log("🚀 ~ ProfileEdit ~ profileDataprofileData:", profileData);
  const { mutate: updateProfile } = useUpdateUserProfile();

  const paymentMethods = [
    {
      id: "card1",
      type: "debit",
      last4: "4832",
      expiryDate: "04/26",
      isDefault: true,
    },
  ];

  useEffect(() => {
    if (profileData) {
      setFormData((prev) => ({ ...prev, ...profileData }));
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    updateProfile(formData, {
      onSuccess: () => {
        setLoading(false);
        // console.log("Profile updated successfully", formData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      },
    });
  };

  const handleEditPayment = (id: string) => {
    // console.log("Edit payment", id);
  };

  const handleDeletePayment = (id: string) => {
    // console.log("Delete payment", id);
  };

  const handleAddPayment = () => {
    // console.log("Add new payment method");
  };

  const handleLogoutDevice = (device: string) => {
    // console.log("Logging out from", device);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    uploadImage(file);
  };

  const lastUpdatedText = userObj?.updatedAt
    ? formatDistance(new Date(userObj.updatedAt), new Date(), {
        addSuffix: true,
      })
    : "Just now";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <ProfileHeader title="Manage Your Profile" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProfileSideBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
            userImage={userObj?.imageUrl || null}
            userName={userObj?.firstName as string}
            userEmail={formData.email}
            isUploading={isUploading}
            profileImage={profileImage}
            handleProfileImageChange={handleProfileImageChange}
          />

          <form onSubmit={handleSubmit} className="lg:col-span-3">
            {activeSection === "personal" && (
              <PersonalInfoForm
                firstName={formData.firstName}
                lastName={formData.lastName}
                email={formData.email}
                phone={formData.phone}
                dateOfBirth={formData.dateOfBirth}
                onChange={handleChange}
                updatedAt={lastUpdatedText}
              />
            )}

            {activeSection === "address" && (
              <AddressForm
                address={formData.address}
                city={formData.city}
                state={formData.state}
                postalCode={formData.postalCode}
                onChange={handleChange}
                updatedAt={lastUpdatedText}
              />
            )}

            {activeSection === "notifications" && (
              <NotificationsForm
                emailEnabled={formData?.notifications?.email ?? false}
                smsEnabled={formData?.notifications?.sms ?? false}
                appEnabled={formData?.notifications?.app ?? false}
                onChange={handleChange}
              />
            )}

            {activeSection === "payment" && (
              <PaymentMethods
                methods={paymentMethods}
                onEdit={handleEditPayment}
                onDelete={handleDeletePayment}
                onAdd={handleAddPayment}
              />
            )}

            {activeSection === "security" && (
              <SecuritySettings
                loginHistory={loginHistory}
                onLogoutDevice={handleLogoutDevice}
              />
            )}

            <div className="bg-gray-800 border-t border-gray-700 rounded-b-xl p-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`
      px-6 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] 
      rounded-lg font-medium text-white flex items-center
      transition-all duration-300 ease-in-out
      ${
        loading
          ? "opacity-90 cursor-not-allowed"
          : "hover:shadow-lg hover:shadow-green-700/30 hover:scale-105 hover:brightness-110 active:scale-95"
      }
    `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProfileEdit;
