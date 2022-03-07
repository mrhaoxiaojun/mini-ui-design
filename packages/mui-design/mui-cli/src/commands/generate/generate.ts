/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 20:26:38 
 * @Details: 生成组件和MD文档模板、入口文件、类型文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 16:08:49
 */
import inquirer from 'inquirer'
import shell from 'shelljs'
import { red } from 'kolorist'
import { CREATE_SUPPORT_TYPES } from './constant'
import { selectCategory, selectCreateType, typeName, typeTitle } from './inquirers'
import { generateComponent } from './generate-component'
import { generateLibEntry } from './generate-entry'

type CMD = {
  type?:string
}
interface Generate {
  (cmd?:CMD): Promise<void>;
}

export const generate:Generate = async (cmd = {}) => {
  
  let { type } = cmd
  // 如果没有在命令参数里带入 type 那么就询问一次
  if (!type) {
    const result = await inquirer.prompt([selectCreateType()])
    type = result.type
  }

  // 如果从命令行中获取的类型不在我们支持范围内，那么输出错误提示并重新选择
  if (CREATE_SUPPORT_TYPES.every((t) => type !== t)) {
    console.log(
      red(`当前类型仅支持：${CREATE_SUPPORT_TYPES.join(', ')}，收到不在支持范围内的 "${type}"，请重新选择！`)
    )
    return generate()
  }

  try {
    switch (type) {
      case 'component':
        // 如果是组件，我们还需要收集一些信息
        const info = await inquirer.prompt([typeName(),typeTitle(),selectCategory()])
        generateComponent(info)
        break;
      case 'lib-entry':
        generateLibEntry()
        break;
      case 'dts':
        shell.exec("npm run gDts")
      break;
      default:
        break;
    }
  } catch (e:unknown) {
    const error  = e as object
    console.log(red('✖') + error.toString())
    process.exit(1)
  }
}