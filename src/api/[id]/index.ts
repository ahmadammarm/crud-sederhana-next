import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { id } = req.query;

    if (req.method === 'GET') {
        const item = await prisma.item.findUnique({ where: { id: Number(id) } });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    }

    else if (req.method === 'PUT') {
        const { name, description } = req.body;
        const updatedItem = await prisma.item.update({
            where: { id: Number(id) },
            data: { name, description },
        });
        res.status(200).json(updatedItem);
    }

    else if (req.method === 'DELETE') {
        await prisma.item.delete({ where: { id: Number(id) } });
        res.status(204).end();
    }

    else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
