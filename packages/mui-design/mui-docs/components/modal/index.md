# Modal 对话框

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <button @click="open({'type':'formView','id':'1','displayName':'fv1','stopWorkspaceLeft':true})">
    fromView1-靠左
  </button>
  <button @click="open({'type':'formView','id':'2','displayName':'fv2','stopDocBottom':true})">
    fromView2-靠下
  </button>
{{isShow}}
  <m-modal 
    :widgetShowProps="isShow"
    @widgetSmall ="widgetSmall"
    @widgetClose="widgetClose"
    :widgetSize = "{defaultW:500,defaultH:300,maxH:500}"
    >
    <template #widgetBody>
      <div sytle="width:100px;">555</div>
      <p>222</p> 
     </template>
  </m-modal>
</template>

<script setup>

import {ref } from 'vue'
  
let isShow = ref(false)

const open = (data)=>{
  isShow.value = true
}
const widgetSmall = (data)=>{
  isShow.value = false
}
const widgetClose = (data)=>{
  isShow.value = false
}

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

