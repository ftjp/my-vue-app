<template>
  <div class="app-wrapper">
    <!-- 左侧菜单：淡蓝色、无竖线、轻松快活 -->
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">🌿</div>
        <div class="logo-text">我的vue练习管理</div>
        <div class="logo-sub">后台管理</div>
      </div>
      <el-menu :default-active="activeMenu" class="menu" router background-color="#e8f4ff" text-color="#2c6e9e"
        active-text-color="#1677ff" :collapse="false">
        <el-menu-item index="/dashboard/home">
          <span>🏠 首页</span>
        </el-menu-item>
        <el-sub-menu index="practice">
          <template #title>
            <span>📚 练习</span>
          </template>
          <el-menu-item index="/dashboard/ref-practice">
            <span>🔢 响应式 API 综合练习</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/props-emit-practice">
            <span>📚 Props与Events练习</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/slot-practice">
            <span>🎭 插槽练习</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </aside>

    <!-- 右侧主要内容区 -->
    <div class="main-container">
      <header class="header">
        <div class="header-left">
          <span class="greeting">嗨，{{ username }} ✨</span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-name">
              {{ username }} <el-icon>
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = computed(() => route.path)

const username = computed(() => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo).nickName || '用户' : '用户'
})

const handleCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/')
  }
}
</script>

<style scoped>
/* 整体布局 */
.app-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f5f9ff;
  /* 全局柔和背景 */
}

/* 左侧边栏 - 淡蓝色，无竖线 */
.sidebar {
  width: 260px;
  background-color: #e8f4ff;
  /* 清爽淡蓝色 */
  border-right: none;
  /* 关键：去掉右侧竖线 */
  box-shadow: none;
  /* 去掉任何阴影竖线 */
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  /* 右侧圆角，更柔和 */
}

/* Logo 区域 */
.logo {
  padding: 24px 16px 16px 24px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(44, 110, 158, 0.1);
  margin-bottom: 12px;
}

.logo-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.logo-text {
  font-size: 22px;
  font-weight: 600;
  color: #2c6e9e;
  letter-spacing: 1px;
}

.logo-sub {
  font-size: 12px;
  color: #80b3d9;
  margin-top: 4px;
}

/* 菜单样式 - 圆润、无边框 */
.menu {
  flex: 1;
  border-right: none;
  background-color: #e8f4ff;
  padding: 0 12px;
}

.el-menu-item {
  height: 48px;
  line-height: 48px;
  margin: 6px 0;
  border-radius: 24px;
  /* 圆润的胶囊形 */
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
}

.el-menu-item:hover {
  background-color: #d4e8ff !important;
  color: #1677ff;
}

.el-menu-item.is-active {
  background-color: #ffffff !important;
  color: #1677ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.el-sub-menu .el-sub-menu__title {
  height: 48px;
  line-height: 48px;
  margin: 6px 0;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 500;
  color: #2c6e9e;
}

.el-sub-menu .el-sub-menu__title:hover {
  background-color: #d4e8ff !important;
}

/* 子菜单弹出样式 */
.el-menu--inline .el-menu-item {
  padding-left: 44px !important;
  background-color: #e8f4ff;
}

.el-menu--inline .el-menu-item.is-active {
  background-color: #ffffff !important;
}

/* 右侧主区域 */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部 */
.header {
  height: 64px;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 16px 20px 0 20px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.greeting {
  font-size: 16px;
  color: #2c6e9e;
  font-weight: 500;
}

.user-name {
  cursor: pointer;
  color: #2c6e9e;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.user-name:hover {
  color: #1677ff;
}

/* 内容区 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f9ff;
}
</style>