import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";

export async function POST(
    req: Request,
){
    try{
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        if (!name) return new NextResponse("Missing Name", {status: 400});

        const category = await prismadb.category.create({
            data:
            {
                name,
                userId
            }
        });

        return NextResponse.json(category);
    } catch (error){
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function GET(
    req: Request,
){
    try{
        const {userId} = auth();

        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const categories = await prismadb.category.findMany({
            where: {
                userId: userId
            }
        });
        
        return NextResponse.json(categories);
    } catch (error){
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}