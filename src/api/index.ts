import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const items = await prisma.item.findMany();
        res.status(200).json(items);
    }

    else if (req.method === 'POST') {
        const { name, description } = req.body;
        const newItem = await prisma.item.create({
            data: { name, description },
        });
        res.status(201).json(newItem);
    }

    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}
