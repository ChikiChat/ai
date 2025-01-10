import mercurius from 'mercurius';
import type {FastifyReply, FastifyRequest,} from 'fastify';
import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox'
import prisma from "../../prisma";
import type {Context} from './context';
import schema from "./schema";
import resolvers from "./resolvers";

export const controller: FastifyPluginAsyncTypebox = async (app) => {
    app.register(mercurius, {
        schema,
        resolvers,
        graphiql: true,
        context: (request: FastifyRequest, reply: FastifyReply): Context => {
            return {
                prisma: prisma,
                request,
                reply,
                // userId: getUserId(request.headers.authorization as string),
            };
        },
        subscription: {
            onConnect: (param) => {
                process.stdout.write('Connected to websocket\n');

                return param;
            },
            context: async (_, request) => {
                return {
                    request: request,
                    // userId: getUserId(request.headers.authorization as string),
                };
            },
        },
    })
}
