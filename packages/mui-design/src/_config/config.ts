/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-03 22:29:26 
 * @Details:  全局常量配置
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-03 12:36:58
 */
import type { App } from "vue"
import zhCN from "../_i18n/lang/zh-CN"
import common from "./common"

let globalConstant = {...common}

export default {
  install(app: App): void {
    for(let key in globalConstant){
      app.config.globalProperties[key] = (globalConstant as any)[key]
    }
    // 设置默认值语言
    app.config.globalProperties._mLang = zhCN
  }
}