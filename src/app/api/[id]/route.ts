import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


// Get Single Item
export async function GET(
    request: Request,
    { params }: {params: {id: string}}
) {
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        if(!item) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(item)
    } catch(error) {
        console.log(error)
    }
}