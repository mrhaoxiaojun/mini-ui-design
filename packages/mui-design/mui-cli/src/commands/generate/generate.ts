/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 20:26:38 
 * @Details: 生成组件和MD文档模板、入口文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-03 15:27:49
 */
import inquirer from 'inquirer'
import fs from "fs-extra"
import { bgBlue, lightBlue, lightYellow, red } from 'kolorist'
import { resolve } from 'path'
import { CREATE_SUPPORT_TYPES, DOCS_COMPONENTS_DIR, COMPONENTS_DIR, TESTS_DIR, INDEX_FILE_NAME, DOCS_FILE_NAME, VITEPRESS_SIDEBAR_FILE, MAIN_FILE } from './constant'
import { selectCategory, selectCreateType, typeName, typeTitle } from './inquirers'
import { generateComponentTemplate, generateDocumentTemplate, generateIndexTemplate, generateMainTemplate, generateStyleTemplate, generateTestsTemplate, generateTypesTemplate, generateVitepressSidebarTemplate } from './templates'
import { bigCamelCase } from '../../utils'
import { camelCase } from 'lodash'

type CMD = {
  type?:string
}

type Info = {
  name:string,
  title:string,
  category:string,
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
      default:
        break;
    }
  } catch (e:unknown) {
    const error  = e as object
    console.log(red('✖') + error.toString())
    process.exit(1)
  }
}

const generateComponent = async (info:Info) => {
  console.log(lightBlue('Generate new components.'))
  console.log("---------------------------")

  let  { name } = info
  name = camelCase(name)

  const componentName = name
  const styleName = name
  const typesName = name + '-types'
  const testName = name + '.spec'

  const _params = {
    ...info,
    componentName,
    typesName,
    styleName,
    testName
  } as const
  
  const componentDir = resolve(COMPONENTS_DIR, componentName)
  const srcDir = resolve(componentDir, 'src')
  const testsDir = resolve(componentDir, TESTS_DIR)
  const docsDir = resolve(DOCS_COMPONENTS_DIR, componentName)
  
  await Promise.all([fs.mkdirs(componentDir), fs.mkdirs(srcDir), fs.mkdirs(testsDir),fs.mkdirs(docsDir)])

  const writeFiles = [
    fs.writeFile(resolve(componentDir, INDEX_FILE_NAME), generateIndexTemplate(_params)),
    fs.writeFile(resolve(srcDir, `${componentName}.tsx`), generateComponentTemplate(_params)),
    fs.writeFile(resolve(srcDir, `${typesName}.ts`), generateTypesTemplate(_params)),
    fs.writeFile(resolve(srcDir, `${styleName}.scss`), generateStyleTemplate(_params)),
    fs.writeFile(resolve(testsDir, `${testName}.ts`), generateTestsTemplate(_params)),
    fs.writeFile(resolve(docsDir, DOCS_FILE_NAME), generateDocumentTemplate(_params)),
  ]
  await Promise.all(writeFiles)
  
  console.log(bgBlue(`已生成新组件：`) + lightYellow(bigCamelCase(componentName)))
  console.log(bgBlue(`组件文件地址：`) + lightYellow(componentDir))
  console.log(bgBlue(`markdown地址：`) + lightYellow(docsDir))

  generateLibEntry()
}

const generateLibEntry = () => {
  console.log(lightBlue('Generate lib-entry file.'))
  console.log("---------------------------")

  // 生成菜单入口（sidebar）
  fs.writeFile(VITEPRESS_SIDEBAR_FILE, generateVitepressSidebarTemplate())

  // 生成mian入口文件
  fs.writeFile(MAIN_FILE, generateMainTemplate())

  console.log(bgBlue(`已生成菜单文件：`) + lightYellow(VITEPRESS_SIDEBAR_FILE))
  console.log(bgBlue(`已生成入口文件：`) + lightYellow(MAIN_FILE))
}