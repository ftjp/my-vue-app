import axios from 'axios'
import router from '../router'  // 需要导入路由实例

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 白名单（登录接口等）
const whiteList = ['/member/web/auth/pwdLogin']

request.interceptors.request.use(
  config => {
    const isWhiteListed = whiteList.some(url => config.url.includes(url))
    if (!isWhiteListed) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => Promise.reject(error)
)

request.interceptors.response.use(
  response => response.data,
  error => {
    // 处理 HTTP 错误（如 401）
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        // token 过期或无效，清除本地存储并跳转登录
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        // 避免当前页面是登录页时重复跳转
        if (router.currentRoute.value.path !== '/') {
          router.push('/')
          alert('登录已过期，请重新登录')
        }
      }
    }
    console.error('网络请求错误:', error)
    return Promise.reject(error)
  }
)

export default request