# 快速开始

引导您如何在项目中使用 mui-design

### Vue版本

当前支持的Vue版本 ^3.0.0

### 1. 创建一个项目

推荐使用@vite/cli创建你的项目，其他项目亦可

```shell
yarn create vite my-vue-app --template vue-ts
```
已有项目请忽略此步骤

### 2. 安装

进入你的项目文件夹，使用yarn安装 mui-design

```shell
yarn add mui-design

```

### 3. 全量引入

main.ts 全局引入

```js
import mui from 'mui-design'
import 'mui-design/mui.css'

createApp(App).use(mui).mount('#app')
```

### 3. 按需引入

main.ts 按需引入

```js
import { createApp } from 'vue'
import App from './App.vue'


// ----------Step 1: 引入单个组件----------
import { Tree } from 'mui-design'
// or import Tree from 'mui-design/Tree'

// ----------Step 2: 引入组件样式----------

// ***方式一：手动引入组件样式
import 'mui-design/Tree/style.css'

// ***方式二：全量引入组件样式，使用时候会少去繁琐的引用但会增加打包体积
// import 'mui-design/mui.css' 

// ***方式三：自动按需引入组件样式，vite.config.ts文件
// import styleImport from 'vite-plugin-style-import'
// plugins: [
//   vue(),
//   styleImport({
//     libs: [
//       {
//         libraryName: 'mui-design',
//         esModule: true,
//         resolveStyle: (name) => `mui-design/${name}/style`,
//       },
//     ],
//   })
// ]

// ----------Step 3: 使用组件----------
createApp(App)
.use(Tree) 
.mount('#app')
```

### 4. 启动开发调试

```shell
yarn dev
```