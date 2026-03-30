import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  console.log(id);
  const team = await prisma.user.findUnique({
    where: { id },
    select: { favouriteTeam: true },
  });
  return new NextResponse.json({ team });
}
