import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if(!params.categoryId) return new NextResponse("Category ID is required", { status: 400 });

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            }
        })

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal eroor", { status: 500 })
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string} }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        if(!params.categoryId) return new NextResponse("Category ID is required", { status: 400 });

        const category = await prismadb.category.delete({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: {  categoryId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        if (!name) return new NextResponse("Name is required", { status: 400 });

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
            }
        })

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATOGORY_PATCH]', error);
        return new NextResponse("Internal eroor", { status: 500 })
    }
}