import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox'
import {controller} from './controller'

export const graphql: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(controller)
}