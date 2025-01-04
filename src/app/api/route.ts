import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';



export async function GET() {
    try {
        const items = await prisma.item.findMany()
        return NextResponse.json(items)
    } catch(error) {
        return NextResponse.json({error: "error"}, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const item = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description
            }
        })
        return NextResponse.json(item)

    } catch(error) {

    }
}

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
      return NextResponse.json({ message: 'item deleted' })
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting item' }, { status: 500 })
    }
  }

