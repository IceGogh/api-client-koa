import request from './index'

export function commonFetch (req) {
  console.log('req: ', req)
  if (!req.params) {
    req['params'] = {}
  }
  const tempRequest = JSON.parse(JSON.stringify(req))
  console.log('tempRequest: ', tempRequest)
  return request(tempRequest)
}
