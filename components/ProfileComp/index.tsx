"use client";
import React, { useEffect, useState } from "react";
import ProfileSetup from "@/components/ProfileSetup";
import { useSession } from "next-auth/react";
import { formatDistance } from "date-fns";
import ProfileHeader from "./ProfileHeader";
import ProfileSideBar from "@/components/ProfileComp/ProfileSideBar";
import ProfileContent from "./ProfileContent";
import DeleteAccountModal from "@/components/DeleteAccountModal";
import {
  useUserProfile,
  useUpdateUserProfile,
  useProfileImage,
} from "../../app/hooks/useProfile";
import { ProfileFormData } from "../../app/schemas/profile";

const ProfileComp = () => {
  const { data: session } = useSession();
  const userObj = session?.user;

  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notifications: {
      email: true,
      sms: false,
      app: false,
    },
    agreedToTerms: true,
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
  debugger;
  const isAnon = !profileData?.phone;
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
    updateProfile(formData, {
      onSuccess: () => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      },
    });
  };

  const handleEditPayment = (id: string) => {
    console.log("Edit payment", id);
  };

  const handleDeletePayment = (id: string) => {
    console.log("Delete payment", id);
  };

  const handleAddPayment = () => {
    console.log("Add new payment method");
  };

  const handleLogoutDevice = (device: string) => {
    console.log("Logging out from", device);
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

  return isAnon ? (
    <ProfileSetup />
  ) : (
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
            userImage={userObj?.image || null}
            userName={userObj?.name}
            userEmail={formData.email}
            isUploading={isUploading}
            profileImage={profileImage}
            handleProfileImageChange={handleProfileImageChange}
            membershipTier={userObj?.membershipTier}
          />

          <ProfileContent
            activeSection={activeSection}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saveSuccess={saveSuccess}
            loading={loading}
            paymentMethods={paymentMethods}
            handleEditPayment={handleEditPayment}
            handleDeletePayment={handleDeletePayment}
            handleAddPayment={handleAddPayment}
            loginHistory={loginHistory}
            handleLogoutDevice={handleLogoutDevice}
            lastUpdatedText={lastUpdatedText}
          />
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProfileComp;
