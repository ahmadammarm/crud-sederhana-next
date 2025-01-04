import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


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

// UPDATE Item
export async function PUT(
    request: NextRequest,
    { params }: { params: {id: number} }
) {
    try {
        const body = await request.json()
        const item = await prisma.item.update({
            where: {
                id: params.id
            },
            data: {
                name: body.name,
                description: body.description
            }
        })
        return NextResponse.json(item)
    } catch(error) {
        console.log(error)
    }
}

// DELETE product
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await prisma.item.delete({
        where: {
          id: parseInt(params.id),
        },
      })
      return NextResponse.json({ message: 'Product deleted' })
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
  }