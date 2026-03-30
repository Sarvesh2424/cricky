import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, content, userId } = await request.json();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Post created successfully", status: 201 },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating post: " + err.message },
      { status: 400 },
    );
  }
}
