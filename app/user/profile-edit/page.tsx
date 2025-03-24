import { auth } from "@/auth";
import ProfileComp from "@/components/ProfileComp";
import ProfileSetup from "@/components/ProfileSetup";
import React from "react";

export default async function Profile() {
  return <div>{<ProfileComp />}</div>;
}
