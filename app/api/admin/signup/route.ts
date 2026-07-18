import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 },
      );
    }

    // 🔹 Check existing user
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.password) {
        // User registered with OAuth, we can set their password now
        const hashedPassword = await bcrypt.hash(password, 10);
        const updated = await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            name: name || existing.name,
          },
        });
        return NextResponse.json({ user: updated }, { status: 200 });
      }

      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);

    // Return the actual error message for debugging
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 },
    );
  }
}
