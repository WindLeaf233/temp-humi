import axios from 'axios'
import * as notice from '@/utils/notice'

export const getData = async function() {
  return new Promise((resolve) => {
    axios.get(process.env.VUE_APP_API_LOOP_UPDATE).then((res) => {
      let data = res.data
      console.log(data)
      if (data.code !== 200) {
        notice.error(`API 返回代码 ${data.code}`)
      } else {
        resolve(data.data)
      }
    }).catch((err) => notice.error(err.toString()))
  })
}
