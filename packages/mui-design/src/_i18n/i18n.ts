/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-03 18:03:03 
 * @Details:  简版i18n
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-03 22:33:52
 */
import type { App } from 'vue'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import { isValidKey } from '../_utils/common';

const message = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default {
  name: 'i18n',
  install(app: App, lang:string): void {
    // app.use(Tree as any)
    if(!isValidKey(message,lang))  throw Error('invalid sequence');
    app.config.globalProperties._mLang = message[lang]
  }
}
