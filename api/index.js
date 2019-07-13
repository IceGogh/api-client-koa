import axios from 'axios'
import config from './config'
if (process.server) {
  axios.defaults.baseURL = `http://${process.env.HOST}:${process.env.PORT}`
}
const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
  config => {
    console.log('datra:', config)
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
