import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        if(!params.blogId) return new NextResponse("Blog ID is required", { status: 400 });

        const blog = await prismadb.blog.findMany({
            where: {
                id: params.blogId,
            },
            include:{
                Images: true,
                category: true,
            }
        })

        return NextResponse.json(blog);
    } catch (error) {
        console.log('[BLOG_GET]', error);
        return new NextResponse("Internal eroor", { status: 500 })
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { blogId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        if(!params.blogId) return new NextResponse("Blog ID is required", { status: 400 });

        const blog = await prismadb.blog.delete({
            where: {
                id: params.blogId,
            },
        })

        return NextResponse.json(blog);
    } catch (error) {
        console.log('[BLOG_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { title, categoryId, mainImage, Images, content } = body;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        if (!title) return new NextResponse("Missing Title", {status: 400});

        if(!content) return new NextResponse("Missing Content", {status: 400});

        if (!Images || !Images.length) return new NextResponse("Missing Images", {status: 400})

        if (!mainImage) return new NextResponse("Missing Main Image", {status: 400});

        if (!categoryId) return new NextResponse("Missing Category ID", {status: 400});

        if(!params.blogId) return new NextResponse("productId ID is required", { status: 400 });

        await prismadb.blog.update({
            where: {
                id: params.blogId,
            },
            data: {
                title,
                content,
                categoryId,
                mainImage: mainImage,
                Images: {
                    deleteMany:{},
                }
            }
        })

        const blog = await prismadb.blog.update({
            where: {
                id: params.blogId,
            },
            data:{
                Images: {
                    createMany: {
                        data: [
                            ...Images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(blog);
    } catch (error) {
        console.log('[BLOG_PATCH]', error);
        return new NextResponse("Internal eroor", { status: 500 })
    }
}

