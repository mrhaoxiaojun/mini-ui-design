# Modal 对话框

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <button @click="open1({})">test1 普通窗体</button> <br><br>

  <button @click="open2({})">test2 模拟其他盒子高度</button><br><br>
  
  <div id="testId" style="width:800px;height:200px;background:#000;color:#fff;text-align:center;padding-top:50px;">模拟其他盒子的宽高为窗体的最大宽高 (模拟体800*200)</div><br><br>

  <button @click="open({})">test3 循环数据窗体需求</button>
  
  <button @click="open({})">test3 循环数据窗体需求</button>
  


  // 普通窗体
  <m-modal 
    :isShow="isShow1"
    title='普通窗体'
    @modalSmall ="modalSmall1"
    @modalClose="modalClose1"
    :size = "{defaultW:500,defaultH:300}"
    >
    <template #modalBody>
      <div sytle="width:100px;">555</div>
      <p>222</p> 
     </template>
  </m-modal>

  // 模拟其他盒子高度
  <m-modal 
    :isShow="isShow2"
    title='模拟其他盒子高度'
    @modalSmall ="modalSmall2"
    @modalClose="modalClose2"
    :size = "{maxDomId:'testId'}"
    >
    <template #modalBody>
      <div sytle="width:100px;">555</div>
      <p>222</p> 
     </template>
  </m-modal>
</template>

<script setup>

import {ref } from 'vue'
  
let isShow1 = ref(false)
let isShow2 = ref(false)
let isShow3 = ref(false)

const open1 = (data)=>{
  isShow1.value = true
}
const modalSmall1 = (data)=>{
  isShow1.value = false
}
const modalClose1 = (data)=>{
  isShow1.value = false
}


const open2 = (data)=>{
  isShow2.value = true
}
const modalSmall2 = (data)=>{
  isShow2.value = false
}
const modalClose2 = (data)=>{
  isShow2.value = false
}


const open = (data)=>{
  isShow.value = true

   if(!this.getIncludeId(this.viewData[data.type],data)) {
    // 从入口打开modal开始计数
    this.modalTotal(this.modalCount++)
    // 将参数传给子View
    data.isShow = true
    // 关闭回调-hxj
    data.widgetClose= (type,index)=>{
        // 每关闭一个modal做减法
      // this.modalTotal(this.modalCount--)
      // - bar状态
      this.viewStatusBar.forEach((ele,i,ary)=>{
        ele.feMainId === this.viewData[type][index].feMainId && ary.splice(i,1)
      })
      this.viewData[type].splice(index,1)

    }
    // 最小化回调-hxj
    data.widgetSmall = (arr) => {
      // + bar状态
      !this.dealRepeat(arr,"feMainId") && this.viewStatusBar.push(arr)
    }
    // 类型不同或相同的窗体 - 前端自定义所有子已经显的窗体添加主键id--用来唯一性区分
    data.feMainId = `${data.type}-${data.displayName}#${Date.parse(new Date())}`
    // 给对应类型窗体添加显示数据
    this.viewData[data.type].push(data)
  }
  
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

