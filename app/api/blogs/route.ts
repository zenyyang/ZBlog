import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";

export async function POST(
    req: Request
){
    try{
        const { userId } = auth();
        const body = await req.json();

        const { title, categoryId, mainImage, Images, content } = body;

        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        if (!title) return new NextResponse("Missing Title", {status: 400});

        if (!content) return new NextResponse("Missing Content", {status: 400});

        if (!Images || !Images.length) return new NextResponse("Missing Images", {status: 400})

        if (!mainImage) return new NextResponse("Missing Main Image", {status: 400});

        if (!categoryId) return new NextResponse("Missing Category ID", {status: 400});

        const blog = await prismadb.blog.create({
            data:
            {
                title,
                content,
                mainImage: mainImage,
                categoryId,
                Images: {
                    createMany: {
                        data: [
                            ...Images.map((image: {url: string} ) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(blog);
    } catch (error){
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function GET(
    req: Request,
){
    try{
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') 

        const blogs = await prismadb.blog.findMany({
            where: {
                categoryId: categoryId ? categoryId : undefined,
            },
            include: {
                Images: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        return NextResponse.json(blogs);
    } catch (error){
        console.log('[BLOGS_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}