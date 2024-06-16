// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../../database/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name } = req.body;

  try {
    await registerUser({ email, name });
    res.redirect(302, "/signin");
  } catch (error) {
    res.status(400).json({ message:'user not registere' });
  }
}
