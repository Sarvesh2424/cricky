import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching posts" + err.message },
      { status: 400 },
    );
  }
}
