import Application from './application'

async function main() {
    const app = new Application()

    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Shutting down gracefully...')
        await app.stop()
        process.exit(0)
    })

    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM. Shutting down gracefully...')
        await app.stop()
        process.exit(0)
    })

    await app.start()
}

main().catch(err => {
    console.error('Error starting the application:', err)
    process.exit(1)
})