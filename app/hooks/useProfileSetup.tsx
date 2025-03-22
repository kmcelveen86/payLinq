"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { createUserProfile } from "../api/userService";
import { profileSchema, ProfileFormData } from "../schemas/profile";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useProfileSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
    trigger,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: session?.user?.email ?? "",
      phone: "",
      dob: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      agreedToTerms: false,
    },
  });

  // Watch form fields for validation
  const formValues = watch();

  const profileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => createUserProfile(data),
    onSuccess: (data) => {
      setCurrentStep(4);
    },
    onError: (error: any) => {
      console.error("Error creating profile:", error);
    },
  });

  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof ProfileFormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["firstName", "lastName"];
        break;
      case 2:
        fieldsToValidate = ["phone", "dob"];
        break;
      case 3:
        fieldsToValidate = [
          "address",
          "city",
          "state",
          "postalCode",
          "agreedToTerms",
        ];
        break;
    }

    return await trigger(fieldsToValidate);
  };

  const handleNextStep = async () => {
    const isStepValid = await validateStep(currentStep);
    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ProfileFormData) =>
    profileMutation.mutate(data);

  // Check if current step is valid
  const isStepOneValid =
    !errors.firstName &&
    !errors.lastName &&
    // !errors.email &&
    formValues.firstName &&
    formValues.lastName;
  // formValues.email;

  const isStepTwoValid =
    !errors.phone && !errors.dob && formValues.phone && formValues.dob;

  const isStepThreeValid =
    !errors.address &&
    !errors.city &&
    !errors.state &&
    !errors.postalCode &&
    !errors.agreedToTerms &&
    formValues.address &&
    formValues.city &&
    formValues.state &&
    formValues.postalCode &&
    formValues.agreedToTerms;

  return {
    currentStep,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    formValues,
    handleNextStep,
    handlePrevStep,
    isStepOneValid,
    isStepTwoValid,
    isStepThreeValid,
    isPending: profileMutation.isPending,
    isError: profileMutation.isError,
    isSuccess: profileMutation.isSuccess,
    error: profileMutation.error,
  };
}
