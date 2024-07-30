import React from "react";
import { cookies } from "next/headers";

export default async function SignInInput() {
  const csrfToken = cookies().get("next-auth.csrf-token")?.value.split("|")[0];
  console.log('GREG LOOK!  ~ SignInInput ~ csrfToken:', csrfToken);

  return <input name="csrfToken" type="hidden" defaultValue={csrfToken} />;
}
