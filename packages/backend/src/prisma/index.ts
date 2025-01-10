import {Prisma, PrismaClient} from '@prisma/client';
import {withAccelerate} from '@prisma/extension-accelerate'
import {DefaultArgs} from "@prisma/client/runtime/library";

declare global {
    var prisma: PrismaClient | null;
}

const prismaClientSingleton = (): PrismaClient => {
    const client = new PrismaClient().$extends(withAccelerate());
    return client as unknown as PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> & {
        $on: Function,
        $use: Function
    };
};

let prisma: PrismaClient;

if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
        prisma = prismaClientSingleton();
    } else {
        if (!global.prisma) {
            global.prisma = prismaClientSingleton();
        }

        prisma = global.prisma;
    }
}

// @ts-ignore
export default prisma;