/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 20:31:43 
 * @Details:  配置左侧菜单sidebar (vitepress的固定约定文件.vitepress/config.ts)
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-01-14 20:57:57
 */

// vitepress-theme-demoblock编译markdown的主题，使用户更方便查看
// vitepress-theme-demoblock作者也是在markdown-it（vue2.0组件库本人使用过赞）依赖基础上进行的vitepress主题的封装，赞
// markdown-it使用的时候，demo展示部分需要写两遍很难过，然而这个包大喜一遍即可
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      children: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Tree 树', link: '/components/tree/' },
      ]
    },
    {
      text: '导航',
    },
    {
      text: '反馈',
    },
    {
      text: '数据录入',
    },
    {
      text: '数据展示',
    },
    {
      text: '布局',
    },
  ]
}
  
const config = {
  themeConfig: {
    sidebar,
  }, 
  markdown: {
    config: (md) => {
      // 注册markdown的插件，用于获取markdown特定语法下的代码
      md.use(demoBlockPlugin)
    }
  }
}

export default config
  