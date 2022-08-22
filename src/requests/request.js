import axios from 'axios'
import * as notice from '@/utils/notice'

export const request = async function(type, api, data) {
  return new Promise((resolve) => {
    axios.request({ url: api, method: type, data }).then((res) => {
      let resData = res.data
      console.log(`${type} (${api}) [${data}] =>`, resData)
      if (resData.code !== 200) {
        notice.error(`API 返回代码 ${resData.code}`)
      } else {
        resolve(resData.data)
      }
    }).catch((err) => notice.error(err.toString()))
  })
}