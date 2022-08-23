import * as request from '@/requests/request'

export const getData = async function() {
  return await request.request('get', process.env.VUE_APP_API_LOOP_UPDATE, {})
}