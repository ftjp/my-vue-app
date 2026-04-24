<!-- 
  UserCard 组件：演示 props（父传子）和 emit（子传父）
  类似于一个“函数组件”，接收参数（name, age），点击按钮时通过回调（emit）向上传递消息
-->
<template>
  <div class="user-card">
    <!-- 直接在模板中使用 props，无需 props.name，Vue 自动展开 -->
    <h3>{{ name }}</h3>
    <p>年龄：{{ age }}</p>
    <button @click="sayHello">👋 打招呼</button>
  </div>
</template>

<script setup>
// ---------- 1. 定义 props（父传子） ----------
// 使用对象语法，支持类型校验、默认值、是否必填
// (后端类比：方法参数声明)
const props = defineProps({
  name: {
    type: String,
    required: true,           // 必传，类似 @NotNull
    default: '匿名用户'       // 默认值（仅当 required: false 时有效）
  },
  age: {
    type: Number,
    required: false,
    default: 18
  }
})

// ---------- 2. 定义 emit（子传父） ----------
// 声明组件会触发的事件，便于类型提示和文档
// (后端类比：回调函数或事件通知)
const emit = defineEmits(['greet'])

function sayHello() {
  // 触发父组件监听的自定义事件，携带数据（消息字符串）
  emit('greet', `我是${props.name}，今年${props.age}岁`)
}
</script>

<style scoped>
.user-card {
  border: 1px solid #b2d8ff;
  border-radius: 16px;
  padding: 16px;
  margin: 12px;
  background: #f0f9ff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.1s;
}
.user-card:hover {
  transform: translateY(-2px);
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  cursor: pointer;
  margin-top: 8px;
}
button:hover {
  background-color: #2c8c6a;
}
</style>