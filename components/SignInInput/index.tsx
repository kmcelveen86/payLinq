import React from "react";
import { cookies } from "next/headers";

export default async function SignInInput() {
  const csrfToken = (await cookies()).get("next-auth.csrf-token")?.value.split("|")[0];

  return <input name="csrfToken" type="hidden" defaultValue={csrfToken} />;
}
