/*
 * @Author: haoxiaojun 
 * @Date: 2022-03-07 15:31:50 
 * @Details: 构建组件库之前，询问是否生成最新的入口和类型文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 17:38:28
 */
import inquirer from "inquirer"
import shell from 'shelljs'
import { generateLibEntry } from "./generate/generate-entry"

export const preBuild = async () => {

  const result = await inquirer.prompt([
    {
      name: 'DTS',
      type: 'list',
      message: '构建组件库前是否需要生成d.ts文件',
      choices: ['N',"Y"]
    },
    {
      name: 'ENTRY',
      type: 'list',
      message: '构建组件库前是否需要生成main.ts和sidebar.ts文件',
      choices: ['N',"Y"]
    }
  ])

  if(result.DTS === 'Y'){
    shell.exec("npm run gDts")
  }
  
  if(result.ENTRY === 'Y'){
    generateLibEntry()
  }
}
