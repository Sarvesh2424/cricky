import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const idParam = await params;
    const user = await prisma.user.findUnique({
      where: { id: idParam.id },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 400 },
    );
  }
}
