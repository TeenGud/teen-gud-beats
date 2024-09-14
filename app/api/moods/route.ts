import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const moods = await prisma.mood.findMany();
    return NextResponse.json(moods)
}