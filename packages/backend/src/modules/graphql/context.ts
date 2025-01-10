import type {FastifyReply, FastifyRequest} from 'fastify';
import type {PubSub} from 'mercurius';
import {PrismaClient} from "@prisma/client";

export interface Context {
    prisma: PrismaClient;
    request: FastifyRequest;
    reply: FastifyReply;
    pubSub?: PubSub;
    userId?: string;
}