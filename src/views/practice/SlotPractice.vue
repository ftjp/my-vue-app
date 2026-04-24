<!-- 
  练习目标：理解插槽（slot）的三种形式
  使用组件：Card（位于 src/components/Card.vue）
-->
<template>
    <div class="slot-practice">
        <h1>📦 练习2：插槽（Slot）</h1>
        <p>插槽让父组件可以“填充”子组件的特定区域，实现高度定制化。</p>

        <!-- ========= 1. 默认插槽演示 ========= -->
        <section>
            <h2>1️⃣ 默认插槽（替换主体内容）</h2>
            <div class="demo-row">
                <Card>
                    <!-- 只提供默认插槽内容，不提供 header / footer -->
                    <p>✨ 这是父组件传入的主体内容，完全覆盖了子组件的默认内容。</p>
                </Card>
            </div>
            <p class="tip">💡 特点：父组件只需关心“要放什么”，无需改动子组件结构。</p>
        </section>

        <!-- ========= 2. 具名插槽演示 ========= -->
        <section>
            <h2>2️⃣ 具名插槽（分别定制 Header / Footer）</h2>
            <div class="demo-row">
                <Card>
                    <template #header>
                        🎉 *** 自定义头部（促销通知）***
                    </template>
                    <!-- 默认插槽内容 -->
                    <p>这是主体部分，可以放任意HTML。</p>
                    <button @click="alert('主体按钮')">点击测试</button>
                    <template #footer>
                        <span style="color: #f56c6c;">© 自定义底部 - 限时优惠</span>
                        🔽 底部定制
                    </template>
                </Card>
            </div>
            <p class="tip">💡 特点：多个命名插槽可以独立定制，适合布局组件（如弹窗、卡片）。</p>
        </section>

        <!-- ========= 3. 作用域插槽演示（重点） ========= -->
        <section>
            <h2>3️⃣ 作用域插槽（子组件数据交给父组件渲染）</h2>
            <p class="desc">
                <code>Card</code> 组件内部有一组商品数据（<code>items</code>），默认用简单文本展示。<br>
                <strong>作用域插槽</strong> 允许父组件“接管”每一项的渲染，实现完全自定义。
            </p>

            <div class="demo-row">
                <!-- 示例B：使用作用域插槽，简单自定义（带序号和单价） -->
                <Card>git pull origin main
                    <template #header>
                        🎨 自定义样式1：简洁列表带序号
                    </template>
                    <template #scopedItem="{ item, index }">
                        <div class="simple-item">
                            {{ index + 1 }}. {{ item.name }} - ￥{{ item.price }}/{{ item.unit }}
                        </div>
                    </template>
                </Card>

                <!-- 示例C：使用作用域插槽，高级自定义（带购买按钮+库存状态） -->
                <Card>
                    <template #header>
                        🛒 自定义样式2：带购物车交互
                    </template>
                    <template #scopedItem="{ item, index }">
                        <div class="product-item" :class="{ 'out-of-stock': !item.inStock }">
                            <span class="idx">{{ index + 1 }}.</span>
                            <span class="name">{{ item.name }}</span>
                            <span class="price">￥{{ item.price }}/{{ item.unit }}</span>
                            <button class="buy-btn" :disabled="!item.inStock" @click="buyItem(item)">
                                {{ item.inStock ? '购买' : '缺货' }}
                            </button>
                        </div>
                    </template>
                </Card>
            </div>

            <div class="explanation">
                <h4>🔍 作用域插槽核心价值</h4>
                <ul>
                    <li><strong>子组件负责数据与循环</strong>：<code>v-for</code> 和 <code>items</code> 定义在子组件内。</li>
                    <li><strong>父组件负责外观与交互</strong>：通过 <code>&lt;template #scopedItem="{ item }"&gt;</code> 定义每个条目的 UI。
                    </li>
                    <li><strong>类比后端</strong>：类似于高阶函数 <code>items.map(item =&gt; 父组件提供的渲染函数)</code>。</li>
                    <li><strong>复用性极强</strong>：同一个 <code>Card</code> 组件可以生成商品列表、用户列表、评论列表，只需父组件提供不同的插槽模板。</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
import Card from '../../components/Card.vue'   // 请确保路径正确

function buyItem(item) {
    alert(`已添加 ${item.name} 到购物车，单价：${item.price}元/${item.unit}`)
}
</script>

<style scoped>
.slot-practice {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    background: #fff;
    border-radius: 24px;
}

h1 {
    color: #1677ff;
}

section {
    margin: 40px 0;
    border-bottom: 1px solid #eaeef2;
    padding-bottom: 24px;
}

h2 {
    margin: 0 0 16px;
    padding-left: 12px;
    border-left: 6px solid #1677ff;
}

.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 16px;
}

.tip,
.desc {
    background: #f5f7fa;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 14px;
    margin: 12px 0 0;
}

.desc {
    background: #eef2fa;
}

.explanation {
    background: #f9f9fc;
    border-radius: 16px;
    padding: 16px 24px;
    margin-top: 24px;
    border-left: 4px solid #1677ff;
}

code {
    background: #eef2f6;
    padding: 2px 6px;
    border-radius: 6px;
    font-family: monospace;
}

/* 作用域插槽自定义样式 */
.simple-item {
    padding: 4px 0;
}

.product-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
    border-bottom: 1px dashed #e2e8f0;
}

.product-item.out-of-stock {
    opacity: 0.6;
    background: #fef0e6;
}

.idx {
    width: 28px;
    color: #1677ff;
    font-weight: bold;
}

.name {
    width: 60px;
    font-weight: 500;
}

.price {
    flex: 1;
    color: #f50;
}

.buy-btn {
    background: #52c41a;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
}

.buy-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>