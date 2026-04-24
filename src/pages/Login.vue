<template>
  <div class="login-container">
    <div class="login-card">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>手机号</label>
          <input type="tel" v-model="form.phone" placeholder="请输入手机号" />
        </div>
        <div class="input-group">
          <label>密码</label>
          <input type="password" v-model="form.password" placeholder="请输入密码" />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <p class="tip">演示账号：15521223364 / 123456</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'
import { ApiResponse } from '../utils/response'
import CryptoJS from 'crypto-js'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  phone: '15521223364',
  password: ''
})

const md5 = (str) => CryptoJS.MD5(str).toString().toUpperCase()

const handleLogin = async () => {
  console.log('=== 开始登录流程 ===')
  if (!form.phone || !form.password) {
    alert('请填写手机号和密码')
    return
  }

  const encryptedPwd = md5(form.password)
  console.log('MD5加密密码:', encryptedPwd)
  alert(`加密后的密码：${encryptedPwd}`)

  const requestParams = {
    phone: form.phone,
    password: encryptedPwd
  }
  console.log('请求参数:', requestParams)

  loading.value = true
  try {
    const data = await request.post('/member/web/auth/pwdLogin', requestParams)
    console.log('原始响应:', data)

    // 使用统一响应类包装
    const apiRes = new ApiResponse(data)
    console.log('包装后的响应:', apiRes)

    if (apiRes.isSuccess()) {
      // 登录成功，保存 token 和用户信息
      const { token, ...userInfo } = apiRes.result
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      console.log('登录成功，用户信息:', userInfo)

      alert('登录成功！即将跳转到 home 页面')
      // 跳转到 home 页面
      router.push('/dashboard/home')
    } else {
      console.error('登录失败:', apiRes.message)
      if (!apiRes.isSuccess()) {
        // 登录失败时，清除可能残留的旧 token
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        alert(apiRes.message || '登录失败')
      }
      alert(apiRes.message || '登录失败，请检查账号密码')
    }
  } catch (error) {
    console.error('请求异常:', error)
    alert('网络错误或服务器异常')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 样式同上，略，可复制之前的样式 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #5a67d8;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.tip {
  margin-top: 1rem;
  font-size: 0.8rem;
  text-align: center;
  color: #888;
}
</style>