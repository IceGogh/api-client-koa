const Koa = require('koa')
const request = require('request')
const queryString = require('querystring')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production');
(async function start() {
  const nuxt = new Nuxt(config)
  const host = process.env.HOST || '127.0.0.1'
  const port = 7779

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(async(ctx, next) => {
    if (ctx.request.path.startsWith('/rewrite')) {
      const url = ctx.request.path.substr(9)
      if (url.startsWith('http')) {
        const s = new Promise((resolve, reject) => {
          let str = ''
          ctx.req.on('data', data => {
            str += data
          })
          ctx.req.on('end', () => {
            const requestData = JSON.parse(str)
            request({
              url,
              method: 'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: queryString.stringify(requestData)
            }, (err, response, data) => {
              console.log('response: ', typeof response, response)
              if (err) {
                console.log('err: ', err)
                resolve({
                  err: 1,
                  errMsg: 'request err'
                })
              } else {
                resolve(data)
              }
            })
          })
        })
        ctx.response.body = await s
      } else {
        await next()
      }
    } else {
      await next()
    }
  })

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
)()

