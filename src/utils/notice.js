import { ElNotification } from 'element-plus'

export const error = (message) => {
  ElNotification({
    title: '发生了错误',
    message,
    type: 'error'
  })
}