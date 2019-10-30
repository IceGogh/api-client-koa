const Koa = require('koa')
const request = require('request')
const queryString = require('querystring')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const logger = require('../logger')
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
      const headers = {
        'content-type': 'application/x-www-form-urlencoded'
      }
      const h = ctx.request.header
      for (const i in h) {
        if (i.startsWith('designx-')) {
          headers[i.substr(8)] = h[i]
        }
      }
      console.log('url?:', url)
      if (url.startsWith('http') && url.indexOf('http://127.') === -1) {
        logger.trace({
          url,
          headers
        })
        const s = new Promise((resolve, reject) => {
          if (ctx.request.method === 'POST') {
            let str = ''
            ctx.req.on('data', data => {
              str += data
            })
            ctx.req.on('end', () => {
              const requestData = JSON.parse(str)
              request({
                url,
                headers,
                method: 'post',
                body: queryString.stringify(requestData)
              }, (err, response, data) => {
                if (err) {
                  console.log('err: ', err)
                  resolve({
                    err: 1,
                    errMsg: 'request err'
                  })
                } else {
                  logger.trace({
                    method: 'POST',
                    data
                  })
                  resolve(data)
                }
              })
            })
          } else if (ctx.request.method === 'GET') {
            request({
              url,
              headers,
              method: 'get'
            }, (err, response, data) => {
              if (err) {
                console.log('get err: ', err)
                resolve({
                  err: 1,
                  errMsg: 'request err..'
                })
              } else {
                logger.trace({
                  method: 'GET',
                  data
                })
                resolve(data)
              }
            })
          } else {
            resolve({
              err: 1,
              errMsg: 'request method unsupporte !'
            })
          }
        })
        ctx.response.body = await s
      } else {
        ctx.response.body = {
          err: 1,
          errMsg: '404'
        }
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

