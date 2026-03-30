import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { id, likes } = await request.json();
    const updateLike = await prisma.post.update({
      where: { id },
      data: { likes },
    });
    return NextResponse.json(
      { message: "Updated likes", status: 200 },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Cannot change likes" },
      { status: 400 },
    );
  }
}
