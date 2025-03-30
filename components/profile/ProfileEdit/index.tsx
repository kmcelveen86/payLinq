"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { formatDistance, format } from "date-fns";
import DeleteAccountModal from "@/components/DeleteAccountModal";
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
  const userEmail = clerkUser?.user?.primaryEmailAddress;
  const userImg = clerkUser?.user?.imageUrl;
  const userObj = clerkUser?.user;
  const updatedAt = clerkUser?.user?.updatedAt;

  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const userFullName =
    userObj?.fullName || `${profileData?.firstName} ${profileData?.lastName}`;
  const { mutate: updateProfile } = useUpdateUserProfile();
  // const formattedDate = format(new Date(profileData?.dateOfBirth as any), 'MM dd yyyy');
  // console.log("🚀 ~ ProfileEdit ~ formattedDate:", formattedDate)

  const paymentMethods = [
    {
      id: "card1",
      type: "debit",
      last4: "4832",
      expiryDate: "04/26",
      isDefault: true,
    },
  ];

  // Array of sections for the mobile dropdown
  const sections = [
    { id: "personal", label: "Personal Information" },
    { id: "address", label: "Address" },
    { id: "notifications", label: "Notifications" },
    { id: "payment", label: "Payment Methods" },
    { id: "security", label: "Security Settings" },
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const selectSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const lastUpdatedText = userObj?.updatedAt
    ? formatDistance(new Date(userObj.updatedAt), new Date(), {
        addSuffix: true,
      })
    : "Just now";

  // Find the label for the active section
  const activeSectionLabel = sections.find(
    (s) => s.id === activeSection
  )?.label;

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

        {/* Mobile User Profile Summary */}
        <div className="lg:hidden mb-6">
          <div className="bg-gray-800 rounded-xl p-6 mb-4 flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={
                    profileImage || userObj?.imageUrl || "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{userFullName}</h3>
              <p className="text-gray-400 text-sm">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Mobile Section Selector Dropdown */}
        <div className="lg:hidden mb-6 relative">
          <button
            onClick={toggleMobileMenu}
            className="w-full bg-gray-800 rounded-xl p-4 flex justify-between items-center"
          >
            <span>{activeSectionLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute z-10 w-full mt-2 rounded-xl bg-gray-800 overflow-hidden shadow-lg">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => selectSection(section.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors ${
                    activeSection === section.id
                      ? "bg-gray-700 font-medium"
                      : ""
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <ProfileSideBar
              userFullName={userFullName}
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
          </div>

          {/* Form Section - Full width on mobile */}
          <form onSubmit={handleSubmit} className="lg:col-span-3">
            {activeSection === "personal" && (
              <PersonalInfoForm
                firstName={formData.firstName}
                lastName={formData.lastName}
                email={formData.email}
                phoneNumber={formData.phoneNumber}
                dateOfBirth={
                  formData.dateOfBirth || profileData?.dateOfBirth || ""
                }
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

            {/* Sticky Save Button on Mobile */}
            {activeSection !== "security" && (
              <div className="lg:bg-gray-800 lg:border-t lg:border-gray-700 lg:rounded-b-xl lg:p-4 lg:flex lg:justify-end">
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-center z-10">
                  {saveSuccess && (
                    <div className="absolute -top-10 left-0 right-0 bg-green-600 text-white py-2 px-4 text-center">
                      Changes saved successfully!
                    </div>
                  )}
                  {activeSection !== "security" && (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`
                  w-full px-6 py-3 bg-gradient-to-r from-[#2D9642] to-[#C28F49] 
                  rounded-lg font-medium text-white flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  ${
                    loading
                      ? "opacity-90 cursor-not-allowed"
                      : "hover:shadow-lg hover:shadow-green-700/30 hover:brightness-110 active:scale-95"
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
                  )}
                </div>

                {/* Desktop Save Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                  hidden lg:flex px-6 py-2 bg-gradient-to-r from-[#2D9642] to-[#C28F49] 
                  rounded-lg font-medium text-white items-center
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
            )}
          </form>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      {/* Add padding at the bottom to account for the fixed save button on mobile */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default ProfileEdit;
