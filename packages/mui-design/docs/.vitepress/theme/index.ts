/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 21:03:23 
 * @Details: 主题文件入口，这里需要注册所有我们的UI组件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-01-24 22:29:46
 */
import Theme from 'vitepress/dist/client/theme-default'
import Tree from '../../../src-ui/tree'
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// vitepress-theme-demoblock插件的组件注册
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Tree)
    registerComponents(app)
  }
}
