/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 20:50:29 
 * @Details:  插件的组件，需要注册这两个组件，用于包裹普通vue组件的进行解析渲染，该文件可以通过作者提供的命令生成"register:components": "vitepress-rc"
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-01-14 20:59:46
 */
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
export function registerComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}
