/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 20:26:38 
 * @Details: 生成入口文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 15:11:46
 */
import fs from "fs-extra"
import { bgBlue, lightBlue, lightYellow } from 'kolorist'
import { VITEPRESS_SIDEBAR_FILE, MAIN_FILE } from './constant'
import { generateMainTemplate,  generateVitepressSidebarTemplate } from './templates'

export const generateLibEntry = () => {
  console.log(lightBlue('Generate lib-entry file.'))
  console.log("---------------------------")

  // 生成菜单入口（sidebar）
  fs.writeFile(VITEPRESS_SIDEBAR_FILE, generateVitepressSidebarTemplate())

  // 生成mian入口文件
  fs.writeFile(MAIN_FILE, generateMainTemplate())

  console.log(bgBlue(`已生成菜单文件：`) + lightYellow(VITEPRESS_SIDEBAR_FILE))
  console.log(bgBlue(`已生成入口文件：`) + lightYellow(MAIN_FILE))
}