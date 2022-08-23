import * as request from '@/requests/request'

export const getList = async function(data) {
  return await request.request('post', process.env.VUE_APP_API_GET_LIST, data)
}