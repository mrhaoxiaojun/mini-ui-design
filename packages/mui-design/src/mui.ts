// 固定写法需要，自动生成
import type { App } from 'vue'
import TreeInstall, { Tree } from './tree'
import CardInstall, { Card } from './card'
import locale from './_i18n/i18n'
import conf from './_config/config'
import './_style/style.scss'

const installs = [
  TreeInstall,
  CardInstall
]

export {
  locale,
  Tree,
  Card,
}

export default {
  version: '0.0.1',
  // 实现vue3插件，需要实现一个install方法，将来接收一个App实例，createApp()
  install(app: App): void {
    app.use(conf)
    installs.forEach((p) => app.use(p as any))
  }
}