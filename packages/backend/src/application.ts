import fastify, {FastifyInstance} from 'fastify'
import compress from '@fastify/compress'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import etag from '@fastify/etag'
import rateLimit from '@fastify/rate-limit'
import session from '@fastify/secure-session'

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid'

import {graphql} from './modules'

declare module 'fastify' {
    interface FastifyRequest {
        id: string
    }
}

export default class Application {
    private fastify: FastifyInstance
    private readonly port: number

    constructor() {
        dotenv.config()

        this.fastify = fastify()
        this.port = Number(process.env.PORT || 3000)

        this.setupPlugins()
        this.setupModules()
        this.setupRoutes()
        this.setupHooks()

        this.fastify.ready()
    }

    private setupPlugins() {
        this.fastify.register(compress, {})
        this.fastify.register(cookie, {})
        this.fastify.register(cors, {origin: '*'})
        this.fastify.register(etag, {})
        this.fastify.register(rateLimit, {
            max: 120,
            timeWindow: '1 minute',
        })
        this.fastify.register(session, {
            sessionName: 'presence',
            cookieName: 'presence',
            key: fs.readFileSync(path.join(__dirname, '..', 'secret-key')),
            expiry: 5 * 24 * 60 * 60, // Default 5 day
            cookie: {path: '/'}
        })
    }

    private setupModules() {
        this.fastify.register(graphql)
    }

    private setupRoutes() {
        this.fastify.get('/ping', async (_request, _reply) => {
            return 'Pong'
        })

        this.fastify.get('/', async function (_request, reply) {
            const query = '{ add(x: 2, y: 2) }'
            return reply.graphql(query)
        })
    }

    private setupHooks() {
        this.fastify.decorateRequest('id', '')

        this.fastify.addHook('onRequest', async (request, _reply) => {
            request.id = uuidv4()
        })

        this.fastify.addHook('onSend', async (request, reply, payload) => {
            reply.header('server', 'backend')
            reply.header('x-request-id', request.id)

            return payload
        })
    }

    public async start() {
        try {
            await this.fastify.listen({port: this.port, host: '0.0.0.0'})
            console.log(`Backend is reachable at :${this.port}`)
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    }

    public async stop() {
        try {
            await this.fastify.close()
            console.log('Backend stopped')
        } catch (err) {
            console.error('Error stopping fastify:', err)
        }
    }
}