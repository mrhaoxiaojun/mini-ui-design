# Modal 对话框

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <button @click="open1({title:'普通窗体'})">test1 普通窗体 ( 默认宽高500*300 ) </button> <br><br>

  <button @click="open2({title:'模拟其他盒子最大宽度'})">test2 模拟其他盒子最大宽度 ( 模拟体800*200 ) </button><br><br>
  
  <div id="testId" style="width:800px;height:200px;background:#000;color:#fff;text-align:center;padding-top:50px;">模拟其他盒子的宽高为窗体的最大宽高 (模拟体800*200)</div><br><br>

  <button @click="open3({title:'循环窗体头部1',type:'FromView'})">test3 循环数据窗体需求</button>
  
  <button @click="open3({title:'循环窗体头部2',type:'FromView'})">test3 循环数据窗体需求</button>
  


   <!--普通窗体 -->
  <m-modal 
    :isShow="isShow1"
    title='普通窗体'
    @modalSmall ="modalSmall1"
    @modalClose="modalClose1"
    :size = "{defaultW:500,defaultH:300}"
    >
    <template #modalBody>
      <div sytle="width:100px;">555</div>
      <p>普通窗体</p> 
     </template>
  </m-modal>

  <!--模拟其他盒子高度-->
  <m-modal 
    :isShow="isShow2"
    title='模拟其他盒子高度'
    @modalSmall ="modalSmall2"
    @modalClose="modalClose2"
    :size = "{maxDomId:'testId'}"
    >
    <template #modalBody>
      <div sytle="width:100px;">123</div>
      <p>模拟其他盒子高度</p> 
     </template>
  </m-modal>

  <!--循环同种数据类型窗体Demo-->
  <m-modal 
    v-for="(item,index) in modalData.FromView" :key="index"
    :isShow="item.isShow"
    :title='item.title'
    @modalSmall ="item.modalSmall"
    @modalClose="item.modalClose"
    :size = "{defaultW:500,defaultH:300}"
    >
    <template #modalBody>
      <div sytle="width:100px;">123</div>
      <p>循环数据窗体需求</p> 
     </template>
  </m-modal>

</template>

<script setup>

import {ref,nextTick } from 'vue'

let isShow1 = ref(false)
let isShow2 = ref(false)
let isShow3 = ref(false)
let modalData = ref({
  FromView:[],
  TableView:[]
})


const open1 = async (data) =>{

  // 显示模态框
  isShow1.value = true
  // 等待多窗体出厂Id序列配置完成
  await nextTick()
  // 获取全局多窗体唯一标识
  data.id = window.sessionStorage.getItem('muiModalCurrentId')
  console.log(data)
  // 存储全局多窗体唯一标识
  setModalId(data.id)

}
const modalSmall1 = (data)=>{
  isShow1.value = false
}
const modalClose1 = (data)=>{
  isShow1.value = false
}


const open2 = async (data)=>{

  isShow2.value = true
   // 等待多窗体出厂Id序列配置完成
  await nextTick()
  // 获取全局多窗体唯一标识
  data.id = window.sessionStorage.getItem('muiModalCurrentId')
  // 存储全局多窗体唯一标识
  setModalId(data.id)

}
const modalSmall2 = (data)=>{
  isShow2.value = false
}
const modalClose2 = (data)=>{
  isShow2.value = false
}


const open3 = async (data)=>{
  // isShow.value = true

  //  if(!this.getIncludeId(this.viewData[data.type],data)) {
    // 从入口打开modal开始计数
    // this.modalTotal(this.modalCount++)
    // 将参数传给子View


   // 等待多窗体出厂Id序列配置完成
    await nextTick()
    // 获取全局多窗体唯一标识
    data.id = window.sessionStorage.getItem('muiModalCurrentId')
    // 存储全局多窗体唯一标识
    setModalId(data.id)
    // 打开窗体
    data.isShow = true
    // 关闭回调
    data.modalClose= (type,index)=>{
      // - bar状态
      // this.viewStatusBar.forEach((ele,i,ary)=>{
      //   ele.feMainId === this.viewData[type][index].feMainId && ary.splice(i,1)
      // })
      // this.viewData[type].splice(index,1)

    }
    // 最小化回调-hxj
    data.modalSmall = (arr) => {
      // + bar状态
      // !this.dealRepeat(arr,"feMainId") && this.viewStatusBar.push(arr)
    }
    // 给对应类型窗体添加显示数据
    modalData.value[data.type].push(data)
  // }
  
}
const setModalId = (id)=>{
  
  // 获取id集合
  let muiModalIdsList = window.sessionStorage.getItem('muiModalIdsList')
  
  // 没有id集合
  if(!muiModalIdsList){
    window.sessionStorage.setItem('muiModalIdsList',JSON.stringify([id]))
    return;
  }
  // 有id集合
  muiModalIdsList = JSON.parse(muiModalIdsList)
  if(!muiModalIdsList.includes(id)){
    // 去重
    muiModalIdsList.push(id)
    window.sessionStorage.setItem('muiModalIdsList',JSON.stringify(muiModalIdsList))
  }
}
// const modalSmall3 = (data)=>{
//   isShow3.value = false
// }
// const modalClose3 = (data)=>{
//   isShow3.value = false
// }


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

