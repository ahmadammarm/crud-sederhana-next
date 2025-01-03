import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient
const globale = global as any

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!globale.prisma) {
        globale.prisma = new PrismaClient()
    }
    prisma = globale.prisma
}

export default prisma
