import { commonFetch } from '../common'

// module
export const module_list = async () => {
  return await commonFetch({
    url: '/proxy/ApiDoc/app-get_struct'
  })
}

// class
export const api_list = async data => {
  return await commonFetch({
    url: '/proxy/ApiDoc/app-get_api',
    method: 'post',
    data
  })
}

// desc
export const api_desc = async data => {
  return await commonFetch({
    url: `/proxy/ApiDoc/app-get_doc`,
    method: 'post',
    data
  })
}

// request
export const request_api = async (cmd, data, method = 'post') => {
  return await commonFetch({
    url: `/proxy/${cmd}`,
    method,
    data
  })
}
