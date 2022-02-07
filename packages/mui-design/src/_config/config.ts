/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-03 22:29:26 
 * @Details:  全局常量配置
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-03 22:31:19
 */
import type { App } from "vue"
import common from "./common"

let globalConstant = {...common}

export default {
  install(app: App): void {
    for(let key in globalConstant){
      app.config.globalProperties[key] = (globalConstant as any)[key]
    }
  }
}