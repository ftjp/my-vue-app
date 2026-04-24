<!-- 
  Card.vue - 卡片组件（插槽教学专用）
  功能：演示三种插槽
    1. 默认插槽：接收父组件传入的主体内容（如果不传，显示默认文本）
    2. 具名插槽：header / footer，让父组件可以分别定制头部和底部
    3. 作用域插槽：子组件将内部数据（商品列表）传递给父组件，父组件决定每个条目的渲染方式
-->
<template>
  <div class="card">
    <!-- ========= 1. 具名插槽：header ========= -->
    <!-- 父组件使用 <template #header> 填充，不提供则显示默认 -->
    <div class="card-header">
      <slot name="header">
        ⚠️ 默认头部（未提供自定义头部）
      </slot>
    </div>

    <!-- ========= 2. 默认插槽（无 name） ========= -->
    <!-- 父组件直接写在 Card 标签内的内容会出现在这里 -->
    <div class="card-body">
      <slot>
        📌 默认内容（未提供自定义主体内容）
      </slot>
    </div>

    <!-- ========= 3. 具名插槽：footer ========= -->
    <div class="card-footer">
      <slot name="footer">
        🔽 默认脚注（未提供自定义脚注）
      </slot>
    </div>

    <!-- ========= 4. 作用域插槽示例 ========= -->
    <!-- 
      子组件内部定义了一组商品数据（items），父组件无法直接访问。
      通过作用域插槽（scoped slot），子组件将每个 item 和 index 传递给父组件，
      父组件可以完全自定义每个条目的外观和行为（例如添加按钮、改变样式）。
      这就像后端的高阶函数：子组件负责循环（for），父组件提供渲染函数（(item) => 视图）。
    -->
    <div class="scoped-demo" v-if="items.length">
      <div class="scoped-title">✨ 作用域插槽示例（列表渲染 - 数据来自子组件）</div>
      <ul>
        <li v-for="(item, idx) in items" :key="item.id">
          <!-- 
            具名作用域插槽：name="scopedItem"
            传递的数据：:item, :index（可自定义更多属性）
            父组件使用：<template #scopedItem="{ item, index }"> 接收
          -->
          <slot name="scopedItem" :item="item" :index="idx">
            <!-- 默认显示方式（父组件未提供该插槽时使用） -->
            {{ item.name }} - {{ item.price }}元
          </slot>
        </li>
      </ul>
      <p class="scoped-hint">💡 提示：父组件可以提供 #scopedItem 自定义每个商品的展示样式</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 子组件内部的数据（模拟商品列表）
// 重点：这些数据对父组件是“不可见”的，只有通过作用域插槽才能交给父组件处理
const items = ref([
  { id: 1, name: '苹果', price: 5, unit: '个', inStock: true },
  { id: 2, name: '香蕉', price: 3, unit: '根', inStock: true },
  { id: 3, name: '橙子', price: 4, unit: '个', inStock: false }
])
</script>

<style scoped>
.card {
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  margin: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  width: 350px; /* 固定宽度便于并排对比 */
}
.card-header {
  background: #fafafa;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}
.card-body {
  padding: 20px;
}
.card-footer {
  background: #fafafa;
  padding: 10px 20px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #666;
}
.scoped-demo {
  background: #f9f9fc;
  border-top: 1px solid #e9e9ef;
  padding: 12px 20px;
}
.scoped-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #1677ff;
  font-size: 14px;
}
.scoped-hint {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  margin-bottom: 0;
}
ul {
  margin: 0;
  padding-left: 20px;
}
li {
  margin: 6px 0;
}
</style>