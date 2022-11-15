# Modal 对话框

多功能模态框，简称多窗体，支持最大、最小、关闭、拖拽、伸缩、边界回弹、多个窗体层叠弹出、全局识别并维护唯一标识和层级

### 何时使用

当你需要，多个窗体在界面打开，并可以拖拽、拉神的摆开对照的查看，就是你使用m-modal的时机


### 基本用法

以下是一些常用示例的用法，其中`setModalId`方法为全局公用方法，用来存储窗体id

<b>示例一</b>
:::demo 普通窗体用法

```vue
<template>
  <button @click="open1({title:'普通窗体'})">test1 普通窗体 ( 默认宽高500*300 ) </button> <br><br>

   <!--普通窗体 -->
  <m-modal
    v-if = "isShow1"
    :id = "id1"
    title='普通窗体'
    @modalSmall = "modalSmall1"
    @modalClose = "modalClose1"
    @modalResize = "modalResize"
    :data = "data1"
    :defaultW = '660'
    :defaultH = '300'
    >
    <template #modalBody>
      <div sytle="width:100px;">窗口Id ：{{id1}}</div>
      <p>普通窗体</p> 
     </template>
  </m-modal>

</template>

<script setup>

import {ref,nextTick } from 'vue'

let isShow1 = ref(false)
let id1 = ref()
let data1 = ref()

const open1 = async (data) =>{
  // 0、拒绝重复打开
  if(isShow1.value) return
  // 1、显示模态框
  isShow1.value = true
  // 2、等待多窗体出厂Id序列配置完成
  await nextTick()
  // 3、获取全局多窗体唯一标识、并赋值给当前数据
  data.id = window.sessionStorage.getItem('muiModalCurrentId')
  // 4、设置唯一标识到窗体上
  id1.value = data.id
  // 5、当前数据项
  data1.value = data
  // 6、存储全局多窗体唯一标识统一管理
  setModalId(data.id)

}
const modalSmall1 = ()=>{
  // 最小化回调  
}
const modalClose1 = ()=>{
  isShow1.value = false
}
// 窗体尺寸change回调
const modalResize = (c)=>{
  console.log("拖拽尺寸",c)
}

// 每个窗体引用必选方法，用于设置id，id来自于session自动生成(固定写法)
const setModalId = (id)=>{
  
  // 获取id集合
  let muiModalIdsList = window.sessionStorage.getItem('muiModalIdsList')
  
  // 如果-没有id集合
  if(!muiModalIdsList){
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

<b>示例二</b>
:::demo 模拟其他盒子最大宽度

```vue
<template>
  <button @click="open2({title:'模拟其他盒子最大宽度'})">test2 模拟其他盒子最大宽度 ( 模拟体800*200 ) </button><br><br>
  
  <div id="testId" style="width:800px;height:200px;background:#000;color:#fff;text-align:center;padding-top:50px;">模拟其他盒子的宽高为窗体的最大宽高 (模拟体800*200)</div><br><br>

  <!--模拟其他盒子高度-->
  <m-modal 
    v-if = "isShow2"
    :id = "id2"
    title='模拟其他盒子高度'
    :data = "data2"
    @modalSmall = "modalSmall2"
    @modalClose= "modalClose2"
    maxDomId = "testId"
    >
    <template #modalBody>
      <div sytle="width:100px;">窗口数据 ：{{id2}}</div>
      <p>模拟其他盒子高度</p> 
     </template>
  </m-modal>

</template>

<script setup>

import {ref,nextTick } from 'vue'

let isShow2 = ref(false)
let id2 = ref()
let data2 = ref()

const open2 = async (data)=>{
  // 0、拒绝重复打开
  if(isShow2.value) return
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
const modalSmall2 = ()=>{
  // 最小化回调  
}
const modalClose2 = ()=>{
  isShow2.value = false
}
// 每个窗体引用必选方法，用于设置id，id来自于session自动生成(固定写法)
const setModalId = (id)=>{
  
  // 获取id集合
  let muiModalIdsList = window.sessionStorage.getItem('muiModalIdsList')
  
  // 如果-没有id集合
  if(!muiModalIdsList){
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

<b>示例三</b>
:::demo 循环同种数据类型窗体

```vue
<template>

  <button @click="open3(data1)">test3 循环数据窗体需求（FromView）</button>
  <button @click="open3(data2)">test3 循环数据窗体需求（FromView）</button>

  <button @click="open3(data3)">test3 循环数据窗体需求（TableView）</button>
  <button @click="open3(data4)">test3 循环数据窗体需求（TableView）</button>

  <!--循环同种数据类型窗体Demo-->
  <template v-for = "(item,index) in modalData.FromView" :key = "index">
    <m-modal
      v-if='item !== null'
      :id = "item.id"
      :title = 'item.title'
      @modalSmall = "item.modalSmall"
      @modalClose = "item.modalClose('FromView',index)"
      @modalDataClear = "item.modalDataClear"
      @modalResize = "item.modalResize"
      :data = "item"
      :parentData = 'modalData.FromView'
      :defaultW = '600'
      :defaultH = '300'
      >
      <template #modalBody >
        <div sytle="width:100px;">窗口数据 ：{{item}}</div>
        <p>循环数据窗体需求</p> 
      </template>
    </m-modal>
  </template>

  <!--循环同种数据类型窗体Demo-->
  <template v-for = "(item,index) in modalData.TableView" :key = "index">
    <m-modal
      v-if='item !== null'
      :id = "item.id"
      :title = 'item.title'
      @modalSmall = "item.modalSmall"
      @modalDataClear = "item.modalDataClear"
      @modalResize = "item.modalResize"
      @modalClose = "item.modalClose('TableView',index)"
      :data = "item"
      :parentData = 'modalData.TableView'
      :defaultW = '600'
      :defaultH = '300'
      >
      <template #modalBody >
        <div sytle="width:100px;">窗口数据 ：{{item}}</div>
        <p>循环数据窗体需求</p> 
      </template>
    </m-modal>
  </template>

</template>

<script setup>

import {ref,nextTick } from 'vue'

let modalData = ref({
  FromView:[],
  TableView:[]
})
let data1 = ref({title:'循环窗体头部1',type:'FromView'})
let data2 = ref({title:'循环窗体头部2',type:'FromView'})
let data3 = ref({title:'循环窗体头部3',type:'TableView'})
let data4 = ref({title:'循环窗体头部4',type:'TableView'})
const open3 = async (data)=>{
  
  // 拒绝重复打开
  if(data.isShow) return
  
  // -------------- 1、设置data(固定写法) --------------
  
  // 设置打开状态
  data.isShow = true
  // 关闭回调
  data.modalClose= (type,index)=>{
    // 不能直接splice(modalData.value[type].splice(index,1))删除数据，数组位移会导致后面的数据窗口状态刷新
    // 使用null代替关闭弹出,垃圾回收触发机制组件内已做
    modalData.value[type][index] = null;
    // 设置关闭状态
    data.isShow = false
  }
  // 最小化回调
  data.modalSmall = (data) => {
    console.log(data)
  }
  // 窗体尺寸change回调
  data.modalResize = (c)=>{
    console.log("拖拽尺寸",c)
  }
  // 垃圾回收null数据清空
  data.modalDataClear = (data)=>{
    modalData.value[data.dataType] = []
  }
  // 给对应类型窗体添加显示数据
  modalData.value[data.type].push(data)

  // -------------- 2、设置id集合(固定写法) --------------

  // 1)等待多窗体出厂Id序列配置完成
  await nextTick()
  // 2)获取全局多窗体唯一标识
  let id = window.sessionStorage.getItem('muiModalCurrentId')
  // 3)加塞给当前窗体数据的id和显示状态
  modalData.value[data.type][modalData.value[data.type].length-1]["id"] = id
  // 4)存储全局多窗体唯一标识
  setModalId(id)
  
}

// 每个窗体引用必选方法，用于设置id，id来自于session自动生成 (固定写法)
const setModalId = (id)=>{
  
  // 获取id集合
  let muiModalIdsList = window.sessionStorage.getItem('muiModalIdsList')
  
  // 如果-没有id集合
  if(!muiModalIdsList){
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

| 参数 | 类型 | 默认 | 说明 | 必填 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- |---- | --------- | --------- |
|id      |String      |-      |唯一标识      |是       |           |           |
|title      |String      |test      |标题文本      |是       |           |           |
|mask      |Boolean      |false      |是否显示遮罩      |否       |           |           |
|titleIcon      |Object      |-      |标题icon图标      |否       |           |           |
|data      |Object      |-      |原始数据（配合modalResize回调使用）      |否       |           |           |
|parentData      |Array      |-      |当前数据的父级数据集合（用于循环数据窗体）      |否       |           |           |
|defaultDomId      |String      |-      |参考DOM的Id,覆盖默认的宽高      |否       |           |           |
|defaultW      |Number      |500      |默认宽度（设置defaultDomId后无效）      |否       |           |           |
|defaultH      |Number      |300      |默认高度（设置defaultDomId后无效）      |否       |           |           |
|maxDomId      |String      |-      |参考DOM的Id，覆盖默认的最大宽高      |否       |           |           |
|maxW      |Number      |800      |最大宽度（设置maxDomId后无效）      |否       |           |           |
|maxH      |Number      |500      |最大高度（设置maxDomId后无效）      |否       |           |           |
|minW      |Number      |150      |最小宽度      |否       |           |           |
|minH      |Number      |150      |最小高度      |否       |           |           |
|defaultPosition      |Object      |`{x:500,y:120}`     |默认窗体左上角坐标位置      |否       |           |           |
|maxPosition      |Object      |`{x:300,y:120}`      |最大化窗体左上角坐标位置           |否           |           |       |
|isShowMin      |Boolean      |true      |是否支持最小化按钮           |否           |           |        |

m-modal 事件

| 事件 | 类型 | 说明 | 必填 | 跳转 Demo |
| ---- | ---- | ---- | ---- | --------- |
|modalDataClear      |Function      |清空循环数据垃圾对象，用于循环数据窗体必填，普通和窗体不不必传      |-      |           |
|modalClose      |Function      |关闭，用于循环数据窗体必传，参数(数据类型,索引)，普通和窗体不必传      |      |           |
|modalSmall      |Function      |最小化      |否      |           |
|modalResize      |Function      |窗体大小改变回调      |否     |           |

