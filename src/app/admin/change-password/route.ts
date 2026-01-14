import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { newPassword } = await req.json();

    // Updating the Admin record (Assuming you created an Admin model with ID 1)
    await prisma.admin.update({
      where: { id: 1 },
      data: { password: newPassword },
    });

    return NextResponse.json({ message: "Password updated!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}