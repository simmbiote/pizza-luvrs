const Hapi = require('@hapi/hapi')

const plugins = require('./plugins')
const routes = require('./routes')
const CatboxRedis = require('@hapi/catbox-redis');

async function startServer() {
  const server = Hapi.Server({
    port: 3000, ///process.env.PORT || 3000
    cache: [{
      name: 'redis',
      provider: {
        constructor: CatboxRedis,
        options: {
          partition: 'tfg-next-cache-cluster',
          host: 'tfg-next-cache-cluster.cgjfhu.0001.use2.cache.amazonaws.com',
          port: 6379
        }
      }
    }],
  })

  await plugins.register(server)
  routes.register(server)

  try {
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.error(`Server could not start. Error: ${err}`)
  }
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit()
})

startServer()