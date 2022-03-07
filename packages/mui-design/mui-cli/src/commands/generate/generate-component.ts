/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 20:26:38 
 * @Details: 生成组件和MD文档模板，同时更新入口文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 15:15:15
 */
import fs from "fs-extra"
import { bgBlue, lightBlue, lightYellow } from 'kolorist'
import { resolve } from 'path'
import { DOCS_COMPONENTS_DIR, COMPONENTS_DIR, TESTS_DIR, INDEX_FILE_NAME, DOCS_FILE_NAME} from './constant'
import { generateComponentTemplate, generateDocumentTemplate, generateIndexTemplate, generateStyleTemplate, generateTestsTemplate, generateTypesTemplate } from './templates'
import { bigCamelCase } from '../../utils'
import { camelCase } from 'lodash'
import { generateLibEntry } from "./generate-entry"

type Info = {
  name:string,
  title:string,
  category:string,
}

export const generateComponent = async (info:Info) => {
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
