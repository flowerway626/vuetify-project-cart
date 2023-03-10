import axios from 'axios'
import { useUserStore } from '@/stores/user'

// 複製一個新的自定義 axios
export const api = axios.create({
  // 後端網址
  baseURL: import.meta.env.VITE_API
})

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})
// 原本為 => 呼叫 axios(post、delete...) ---> 送出請求 ---> 呼叫的地方
// 請求攔截器
// => 呼叫 axios(post、delete...) ---> interceptors.request ---> 送出請求 ---> interceptors.response ---> 呼叫的地方
// config => axios 送出的設定
apiAuth.interceptors.request.use(config => {
  // 一定要放裡面，放外面可能會是固定值無法做更動
  const user = useUserStore()
  config.headers.authorization = 'Bearer ' + user.token
  return config
})

apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果失敗的請求有回應
  if (error.response) {
    // 如果失敗的請求回應是 401，可能是 JWT 驗證失敗
    if (error.response.status === 401) {
      // 確認請求的網址不是延長登入、登入、登出
      if (!['/users/extend', '/users/login', '/users/logout'].includes(error.config.url)) {
        const user = useUserStore()
        // 傳送延長登入請求
        return apiAuth.patch('/users/extend', {}).then(({ data }) => {
          // 更新 pinia 的 JWT
          user.token = data.result
          // 修改原請求的 JWT
          error.config.headers.authorization = 'Bearer ' + user.token
          // 重新傳送原請求
          return axios(error.config)
        }).catch(_ => {
          // 重新登入失敗，強制登出
          user.logout()
          // 回傳原本的錯誤到呼叫的地方
          return Promise.reject(error)
        })
      }
    }
  }
  // 如果失敗的請求沒回應，回傳原本的錯誤到呼叫的地方
  return Promise.reject(error)
})
