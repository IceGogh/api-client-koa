import axios from 'axios'
import config from './config'
if (process.server) {
  axios.defaults.baseURL = `http://${process.env.HOST}:${process.env.PORT}`
}
const service = axios.create(config)
service.interceptors.request.use(
  config => {
    const { headers, params } = JSON.parse(config.data)
    config.headers = headers
    config.data = params
    console.log('config:', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
