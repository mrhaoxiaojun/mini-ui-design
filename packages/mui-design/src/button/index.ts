
import type { App } from 'vue'
import Button from './src/button'
import conf from './../_config/config'
import locale from './../_i18n/i18n'

Button.install = function(app: App): void {
  app.use(conf)
  const componentPrefix = app.config.globalProperties._COMPONENT_PREFIX
  app.component(`${componentPrefix}${Button.name}`, Button)
}

export { Button,locale }

export default {
  title: 'Button a',
  category: '通用',
  install(app: App): void {
    app.use(Button as any)
  }
}
