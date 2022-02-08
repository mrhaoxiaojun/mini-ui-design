/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 20:31:43 
 * @Details: vitepress配置文件 (vitepress的固定约定文件.vitepress/config.ts)
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-08 16:27:36
 */

import markdown from './config/markdown'
import nav from './config/nav'
import sidebar from './config/sidebar'

const config = {
  title: 'Vue3.0 Mini Ui Design',
  description: 'Vue3.0 Mini Ui Design 组件库',
  lang: 'zh-CN',
  markdown,
  themeConfig: {
    sidebar,
    nav,
    logo: 'https://vuejs.org/images/logo.png',
  }
}

export default config
  