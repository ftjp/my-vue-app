<!-- 
  练习目标：理解 props（父传子）和 emit（子传父）
  使用组件：UserCard（位于 src/components/UserCard.vue）
-->
<template>
    <div class="practice-container">
        <h1>📘 练习1：props 与 emit</h1>
        <p>父组件通过属性传递数据，子组件通过事件通知父组件。</p>

        <!-- 渲染多个 UserCard 组件，传递不同的 props，监听 greet 事件 -->
        <div class="cards-row">
            <UserCard name="张三" :age="25" @greet="handleGreet" />
            <UserCard name="李四" :age="30" @greet="handleGreet" />
            <!-- 不传 age，使用默认值 18（在 UserCard 中定义） -->
            <UserCard name="王五" @greet="handleGreet" />
        </div>

        <!-- 显示从子组件收到的消息 -->
        <div v-if="latestMessage" class="message-box">
            💬 最新消息：{{ latestMessage }}
        </div>

        <div class="explanation">
            <h3>🔍 解析</h3>
            <ul>
                <li><strong>props</strong>：父组件通过 <code>:name="张三"</code> 传递数据，子组件通过 <code>defineProps</code> 接收。</li>
                <li><strong>emit</strong>：子组件调用 <code>emit('greet', 消息)</code>，父组件用 <code>@greet="handleGreet"</code>
                    监听并处理。</li>
                <li>数据单向流动：父→子 (props)，子→父 (事件)。</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from '../../components/UserCard.vue'   // 请确保路径正确

const latestMessage = ref('')

function handleGreet(msg) {
    latestMessage.value = msg
    // 也可以 alert(msg) 用于演示
    console.log('[父组件收到]', msg)
}
</script>

<style scoped>
.practice-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 24px;
    background: #fff;
    border-radius: 24px;
}

h1 {
    color: #42b983;
}

.cards-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;
}

.message-box {
    background: #e6f7ff;
    border-radius: 16px;
    padding: 12px 20px;
    border-left: 5px solid #42b983;
    margin: 20px 0;
}

.explanation {
    background: #f9f9fc;
    border-radius: 16px;
    padding: 16px 24px;
    margin-top: 30px;
    border: 1px solid #e2e8f0;
}

code {
    background: #eef2f6;
    padding: 2px 6px;
    border-radius: 8px;
    font-family: monospace;
}
</style>