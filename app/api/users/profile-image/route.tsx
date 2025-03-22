// src/app/api/users/profile-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get("profileImage") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Path to save the file (in public directory)
    const publicDir = join(process.cwd(), "public");
    const uploadsDir = join(publicDir, "uploads");

    // Ensure uploads directory exists
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const filePath = join(uploadsDir, fileName);

    try {
      await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json(
        { message: "Error saving file: " + (error as Error).message },
        { status: 500 }
      );
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/${fileName}`;

    // Update the user's profile image in the database
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return NextResponse.json(
      { message: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
