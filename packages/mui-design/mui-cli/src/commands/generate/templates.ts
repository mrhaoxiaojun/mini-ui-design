/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-14 09:49:24 
 * @Details: 生成的模板文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-24 14:57:09
 */
import { COMPONENTS_DIR } from "./constant"
import { camelCase } from 'lodash'
import { bigCamelCase, parseComponentInfo, resolveDirFilesInfo,components } from '../../utils'
import { COMPONENT_NAMESPACE, CSS_CLASS_PREFIX } from "../../_config/common"

// 创建组件index.ts入口模板
type IndexParameters = {
  title: string,
  category: string,
  componentName: string
}
export const generateIndexTemplate = ({
  title,
  category,
  componentName,
}: IndexParameters) => {
  const importComponentStr = `import ${bigCamelCase(componentName)} from './src/${componentName}'`
  const installComponentStr = `app.use(${bigCamelCase(componentName)} as any)`

  return `
import type { App } from 'vue'
${importComponentStr}
import conf from './../_config/config'
import locale from './../_i18n/i18n'

${bigCamelCase(componentName)}.install = function(app: App): void {
  app.use(conf)
  const componentPrefix = app.config.globalProperties._COMPONENT_PREFIX
  app.component(\`\${componentPrefix}\${${bigCamelCase(componentName)}.name\}\`, ${bigCamelCase(componentName)})
}

export { ${bigCamelCase(componentName)},locale }

export default {
  title: '${bigCamelCase(componentName)} ${title}',
  category: '${category}',
  install(app: App): void {
    ${installComponentStr}
  }
}
`
}

// 创建组件tsx模板
type ComponentParameters = {
  styleName: string,
  typesName: string,
  componentName: string
}
export const generateComponentTemplate = ({ 
  styleName, 
  componentName, 
  typesName 
}:ComponentParameters) => `\
import { defineComponent } from 'vue'
import { ${camelCase(componentName)}Props, ${bigCamelCase(
  componentName
)}Props } from './${typesName}'
import './${styleName}.scss'

export default defineComponent({
  name: '${bigCamelCase(componentName)}',
  props: ${camelCase(componentName)}Props,
  emits: [],
  setup(props: ${bigCamelCase(componentName)}Props, ctx) {
    return () => {
      return (<div class="${CSS_CLASS_PREFIX}-${componentName}"></div>)
    }
  }
})
`

// 创建类型声明模板
export const generateTypesTemplate = ({ componentName }:{componentName:string}) => `\
import type { PropType, ExtractPropTypes } from 'vue'

export const ${camelCase(componentName)}Props = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(
  componentName
)}Props>
`

// 创建scss模板
export const generateStyleTemplate = ({ componentName }:{componentName:string}) => `\
.${CSS_CLASS_PREFIX}-${componentName} {
  //
}
`

// 创建测试模板
export const generateTestsTemplate = ({componentName}:{componentName:string}) => `\
import { mount } from '@vue/test-utils';
import { ${bigCamelCase(componentName)} } from '../index';

describe('${componentName} test', () => {
  it('${componentName} init render', async () => {
    // todo
  })
})
`

// 创建文档模板
export const generateDocumentTemplate = ({ componentName, title }:{componentName:string,title:string}) => `\
# ${bigCamelCase(componentName)} ${title}

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

\`\`\`vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: '${bigCamelCase(componentName)} ${title} 组件文档示例'
    }
  }
})
</script>

<style>

</style>
\`\`\`

:::

### ${COMPONENT_NAMESPACE}-${componentName}

${COMPONENT_NAMESPACE}-${componentName} 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

${COMPONENT_NAMESPACE}-${componentName} 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

`
// 创建vitepress-sidebar
type InfoItems = {
  title: string,
  category: string,
  status: string,
  dirName:string
}
export const generateVitepressSidebarTemplate = () => {
  let sidebar = []
  const staticNavs = [
    { text: '介绍', link: '/' },
    { text: '快速开始', link: '/start' },
  ]
  // 读取文件名称、路径
  const fileInfo = resolveDirFilesInfo(COMPONENTS_DIR)

  // 读取组件内部详情
  let componentsInfo:InfoItems[] = []
  fileInfo.forEach( f => {
    let info= parseComponentInfo(f)
    componentsInfo.push(info)
  })
  
  // 源数据解析为类sidebar格式
  let dataAnalysis:any = {}
  componentsInfo.forEach( v => {
    dataAnalysis[v.category] =[]
  })
  componentsInfo.forEach( v => {
    dataAnalysis[v.category].push({
      text:v.title,
      link: `/components/${v.dirName}/`
    })
  })
  
// 生成动态sidebar
  let dynamicSidebar:any = []
  for(let i in dataAnalysis){
    dynamicSidebar.push({
      text:i,
      children:dataAnalysis[i]
    })
  }
  sidebar = [...staticNavs,...dynamicSidebar]
  
  return  `\
    // 根据脚本自动生成sidebar
    export default {
      '/': ${JSON.stringify(sidebar, null, 2).replace(/\n/g, '\n\t')}
    }
  `
}

// 创建组件main入口模板
export const generateMainTemplate = () => {
  // 读取文件名称、路径
  const componentsName =  components(COMPONENTS_DIR)

  let importComponentStr = ''
  let installsComponents:any = []
  let exportComponents:any = []
  componentsName.forEach(componentName => {
    let name = bigCamelCase(componentName)
    importComponentStr += `import ${name}Install, { ${name} } from './${componentName}'\n`
    installsComponents.push(`${name}Install`)
    exportComponents.push(name)
  });

  return `
// 根据脚本自动生成入口文件
import type { App } from 'vue'
${importComponentStr}
import locale from './_i18n/i18n'
import conf from './_config/config'
import './_style/style.scss'

const installs = [${installsComponents}]

export {
  locale,
  ${exportComponents.join(',\n\t')}
}

export default {
  // 实现vue3插件，需要实现一个install方法，将来接收一个App实例，createApp()
  install(app: App): void {
    app.use(conf)
    installs.forEach((p) => app.use(p as any))
  }
}
`
}