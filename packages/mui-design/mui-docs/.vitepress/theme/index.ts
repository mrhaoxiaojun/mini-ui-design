/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 21:03:23 
 * @Details: 主题文件入口，这里需要注册所有我们的UI组件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-24 16:05:37
 */
import Theme from 'vitepress/dist/client/theme-default'
import './styles/custom.css'
import 'vitepress-theme-demoblock/theme/styles/index.css'

import muiDesign,{ locale } from '../../../src/mian'
// import { Tree,locale } from '../../../src/mian'
// import {Tree,locale} from '../../../dist/mui-design.es'
// import { Tree, locale } from '../../../dist/tree'

// 主题样式
// vitepress-theme-demoblock插件的组件注册
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(locale,'zh-CN')
    app.use(muiDesign)
    registerComponents(app)
  }
}
