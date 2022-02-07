/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 21:03:23 
 * @Details: 主题文件入口，这里需要注册所有我们的UI组件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-03 22:49:12
 */
import Theme from 'vitepress/dist/client/theme-default'
import { Tree,locale } from '../../../src/index'
// import Tree,{ locale } from '../../../src/index'
// import {Tree,locale} from '../../../dist/mui-design.es'
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// vitepress-theme-demoblock插件的组件注册
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Tree)
    // app.use(locale,'en-US')
    app.use(locale,'zh-CN')
    registerComponents(app)
  }
}
