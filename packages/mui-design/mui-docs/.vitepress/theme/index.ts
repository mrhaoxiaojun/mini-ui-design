/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 21:03:23 
 * @Details: 主题文件入口，这里需要注册所有我们的UI组件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-08 16:20:02
 */
import Theme from 'vitepress/dist/client/theme-default'
import './styles/custom.css'
import 'vitepress-theme-demoblock/theme/styles/index.css'

import { Tree,locale } from '../../../src/mui'
// import {Tree,locale} from '../../../dist/mui-design.es'
// import Tree,{ locale } from '../../../src/mui'
// import { Tree, locale } from '../../../dist/tree'

// 主题样式
// vitepress-theme-demoblock插件的组件注册
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(locale,'zh-CN')
    app.use(Tree)
    registerComponents(app)
  }
}
