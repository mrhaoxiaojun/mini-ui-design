// 固定写法需要，自动生成
import type { App } from 'vue'
import Tree from './src/tree'
import conf from './../_config/config'
import locale from './../_i18n/i18n'

Tree.install = function(app: App): void {
  app.use(conf)
  
  const componentPrefix = app.config.globalProperties._COMPONENT_PREFIX
  app.component(`${componentPrefix}${Tree.name}`, Tree)
}

export { Tree,locale }

export default {
  title: 'Tree 树',
  category: '数据展示',
  install(app: App): void {
    app.use(Tree as any)
  }
}
