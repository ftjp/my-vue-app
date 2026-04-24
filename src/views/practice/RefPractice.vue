<template>
  <div class="counter-demo">
    <h2>响应式 API 综合练习</h2>

    <!-- 1. ref 演示 -->
    <section class="api-section">
      <h3>📌 ref - 简单计数器</h3>
      <p>当前计数（ref）：<strong>{{ count }}</strong></p>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
      <button @click="reset">重置</button>
      <p class="hint">✨ 每次点击都会触发 watch 打印日志</p>
    </section>

    <!-- 2. reactive 演示 -->
    <section class="api-section">
      <h3>📌 reactive - 用户对象</h3>
      <p>姓名：<input v-model="user.name" placeholder="修改姓名" /></p>
      <p>年龄：<input type="number" v-model="user.age" /></p>
      <p>👤 用户信息：{{ user.name }}，{{ user.age }} 岁</p>
    </section>

    <!-- 3. computed 演示：从 reactive 派生 -->
    <section class="api-section">
      <h3>📌 computed - 派生信息</h3>
      <p>✨ 用户描述：{{ userDescription }}</p>
      <p>✨ 年龄是否成年：{{ isAdult ? '✅ 是' : '❌ 否' }}</p>
    </section>

    <!-- 4. 手动触发 watch 演示的说明 -->
    <div class="note">
      💡 <strong>提示</strong>：打开浏览器控制台，修改上面的计数或用户信息，观察 watch 输出的日志。
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ==================== 1. ref：基本类型响应式 ====================
// 类似 AtomicInteger，通过 .value 访问和修改
const count = ref(0)

// 定义修改 count 的方法（直接操作 .value）
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)

// ==================== 2. reactive：对象响应式 ====================
// 类似被 Proxy 代理的普通对象，直接访问属性即可，无需 .value
const user = reactive({
  name: '张三',
  age: 20
})

// ==================== 3. computed：派生状态（有缓存） ====================
// 根据已有的响应式数据自动计算新值，只有依赖变化时才会重新计算
const userDescription = computed(() => `${user.name} 今年 ${user.age} 岁`)
const isAdult = computed(() => user.age >= 18)

// ==================== 4. watch：侦听变化并执行副作用 ====================
// 侦听单个 ref 源
watch(count, (newVal, oldVal) => {
  console.log(`[watch] count 变化: ${oldVal} → ${newVal}`)
})

// 侦听 reactive 对象的某个属性（需要写成 getter 函数）
// 注意：直接 watch(user.age) 是不行的，因为 age 是基本类型数字，
// 需要传入一个返回该属性的函数 () => user.age
watch(
  () => user.age,
  (newAge, oldAge) => {
    console.log(`[watch] 用户年龄变化: ${oldAge} → ${newAge}`)
    // 可以在这里执行副作用，比如调用后端 API、更新本地存储等
  }
)

// 侦听多个源（同时侦听 count 和 user 的 name）
// 传入数组，回调中也会收到新旧值的数组
watch(
  [count, () => user.name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`[watch] 多个源变化:`)
    console.log(`  - count: ${oldCount} → ${newCount}`)
    console.log(`  - userName: ${oldName} → ${newName}`)
  }
)

// 可选：深度侦听整个 reactive 对象（默认就是深度，但要注意性能）
// 这里不展示，因为 user 本身变化（如赋值新对象）不常见，一般深度侦听用于复杂嵌套对象
</script>

<style scoped>
.counter-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 12px;
  font-family: system-ui, sans-serif;
}

.api-section {
  background: white;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
}

h3 {
  margin-top: 0;
  color: #42b983;
}

button {
  margin: 0 8px 0 0;
  padding: 6px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #2c8c6a;
}

input {
  padding: 6px 10px;
  margin-left: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.hint {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.note {
  background: #eef2fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}
</style>