import prisma from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password, username, type } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const clerk = await clerkClient();

    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      publicMetadata: {
        role: type,
      },
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        clerkId: clerkUser.id,
        role: type,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
