/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-08 10:50:02 
 * @Details: markdown的主题配置
 * @Details: vitepress-theme-demoblock编译markdown的主题，使用户更方便查看
 * @Details: vitepress-theme-demoblock作者也是在markdown-it（vue2.0组件库本人使用过赞）依赖基础上进行的vitepress主题的封装，赞
 * @Details: markdown-it使用的时候，demo展示部分需要写两遍很难过，然而这个包大喜一遍即可
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-08 16:05:47
 */

const markdown = {
  config: (md) => {
    const { demoBlockPlugin } = require('vitepress-theme-demoblock')
     // 注册markdown的插件，用于获取markdown特定语法下的代码
    md.use(demoBlockPlugin, {
      cssPreprocessor: 'scss'
    })
  }
}
export default markdown
