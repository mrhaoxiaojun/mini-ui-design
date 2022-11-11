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
    v-if = "isShow1"
    :data = "data1"
    :id = "id1"
    title='普通窗体'
    @modalSmall = "modalSmall1"
    @modalClose = "modalClose1"
    :defaultW = '660'
    :defaultH = '300'
    >
    <template #modalBody>
      <div sytle="width:100px;">窗口Id ：{{id1}}</div>
      <p>普通窗体</p> 
     </template>
  </m-modal>

  <!--模拟其他盒子高度-->
  <m-modal 
    v-if = "isShow2"
    :data = "data2"
    :id = "id2"
    title='模拟其他盒子高度'
    @modalSmall = "modalSmall2"
    @modalClose= "modalClose2"
    maxDomId = "testId"
    >
    <template #modalBody>
      <div sytle="width:100px;">窗口数据 ：{{id2}}</div>
      <p>模拟其他盒子高度</p> 
     </template>
  </m-modal>

  <!--循环同种数据类型窗体Demo-->
  <m-modal 
    v-for = "(item,index) in modalData.FromView" :key = "index"
    :data = "item"
    :id = "item.id"
    :title = 'item.title'
    @modalSmall = "item.modalSmall"
    @modalClose = "item.modalClose('FromView',index)"
    :defaultW = '600'
    :defaultH = '300'
    >
    <template #modalBody>
      <div sytle="width:100px;">窗口数据 ：{{item}}</div>
      <p>循环数据窗体需求</p> 
     </template>
  </m-modal>

</template>

<script setup>

import {ref,nextTick } from 'vue'

let isShow1 = ref(false)
let isShow2 = ref(false)
let id1 = ref()
let id2 = ref()
let data1 = ref()
let data2 = ref()
let modalData = ref({
  FromView:[],
  TableView:[]
})


const open1 = async (data) =>{
  // 1、显示模态框
  isShow1.value = true
  // 2、等待多窗体出厂Id序列配置完成
  await nextTick()
  // 3、获取全局多窗体唯一标识
  data.id = window.sessionStorage.getItem('muiModalCurrentId')
  // 4、设置唯一标识到窗体上
  id1.value = data.id
  // 5、当前数据项
  data1.value = data
  // 6、存储全局多窗体唯一标识统一管理
  setModalId(data.id)
}
const modalSmall1 = (data)=>{
  // 最小化回调  
}
const modalClose1 = (data)=>{
  isShow1.value = false
}


const open2 = async (data)=>{
  // 1、显示模态框
  isShow2.value = true
  // 2、等待多窗体出厂Id序列配置完成
  await nextTick()
  // 3、获取全局多窗体唯一标识
  data.id = window.sessionStorage.getItem('muiModalCurrentId')
  // 4、设置唯一标识到窗体上
  id2.value = data.id
  // 5、当前数据项
  data2.value = data
  // 6、存储全局多窗体唯一标识
  setModalId(data.id)

}
const modalSmall2 = (data)=>{
  // 最小化回调  
}
const modalClose2 = (data)=>{
  isShow2.value = false
}


const open3 = async (data)=>{

  //  if(!this.getIncludeId(this.viewData[data.type],data)) {
    // 从入口打开modal开始计数
    // this.modalTotal(this.modalCount++)
    // 将参数传给子View

    // 关闭回调
    data.modalClose= (type,index)=>{
      // - bar状态
      // this.viewStatusBar.forEach((ele,i,ary)=>{
      //   ele.feMainId === this.viewData[type][index].feMainId && ary.splice(i,1)
      // })
      modalData.value[type].splice(index,1)

    }
    // 最小化回调-hxj
    data.modalSmall = (arr) => {
      // + bar状态
      // !this.dealRepeat(arr,"feMainId") && this.viewStatusBar.push(arr)
    }
    // 给对应类型窗体添加显示数据
    modalData.value[data.type].push(data)
    // 等待多窗体出厂Id序列配置完成
    await nextTick()
    // 获取全局多窗体唯一标识
    let id = window.sessionStorage.getItem('muiModalCurrentId')
    // 加塞给当前窗体数据的id
    modalData.value[data.type][modalData.value[data.type].length-1]["id"] = id
    // 存储全局多窗体唯一标识
    setModalId(id)
  // }
  
}
const setModalId = (id)=>{
  
  // 获取id集合
  let muiModalIdsList = window.sessionStorage.getItem('muiModalIdsList')
  
  // 如果-没有id集合
  if(!muiModalIdsList){
    console.log(id)
    window.sessionStorage.setItem('muiModalIdsList',JSON.stringify([id]))
    return;
  }
  // 如果-有id集合
  muiModalIdsList = JSON.parse(muiModalIdsList)
  muiModalIdsList.push(id)
  window.sessionStorage.setItem('muiModalIdsList',JSON.stringify(muiModalIdsList))
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

