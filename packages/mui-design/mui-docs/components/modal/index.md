# Modal 对话框

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <div>{{ msg }}</div>
  <m-modal  :widgetSize = "{defaultW:500,defaultH:300,maxH:500}">
    <template #widgetBody>
      <div sytle="width:100px;">555</div>
      <p>222</p> 
     </template>
  </m-modal>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
   
    return {
      msg: 'Modal 对话框 组件文档示例'
    }
  }
})
</script>

<style>

</style>
```

:::

### m-modal

m-modal 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

m-modal 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

