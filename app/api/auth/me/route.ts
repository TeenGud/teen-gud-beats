import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server"
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic'

export async function GET(req: any, res: any) {
    try{
        const user = await getServerSession(req, res, authOptions)
        if(!user) {
            return NextResponse.json({message: "You're not authorized"})
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id)
            },
            select: {
                fullName: true,
                email: true,
                password: false
            }
        })
        return NextResponse.json(data)
    }catch(error){
        console.log(error)
        return NextResponse.json({message: '[USER_GET Server error]'}, {status: 500})
    }
}