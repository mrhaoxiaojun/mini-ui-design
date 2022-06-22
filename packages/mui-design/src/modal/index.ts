
import type { App } from 'vue'
import Modal from './src/modal'
import conf from './../_config/config'
import locale from './../_i18n/i18n'

Modal.install = function(app: App): void {
  app.use(conf)
  const componentPrefix = app.config.globalProperties._COMPONENT_PREFIX
  app.component(`${componentPrefix}${Modal.name}`, Modal)
}

export { Modal,locale }

export default {
  title: 'Modal 对话框',
  category: '反馈',
  install(app: App): void {
    app.use(Modal as any)
  }
}
