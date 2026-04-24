<template>
  <div class="home">
    <h1>首页</h1>
    <p>欢迎 {{ userName }}，登录成功！</p>
    <p>手机号：{{ phone }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({})
try {
  const stored = localStorage.getItem('userInfo')
  if (stored) userInfo.value = JSON.parse(stored)
} catch(e) { console.error(e) }

const userName = userInfo.value.nickName || '用户'
const phone = userInfo.value.phone || ''
</script>

<style scoped>
.home { background: white; padding: 20px; border-radius: 8px; }
</style>