import { CSS_CLASS_PREFIX } from "./constant"
import { camelCase } from 'lodash'
import { bigCamelCase } from '../../utils'

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

### d-${componentName}

d-${componentName} 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

d-${componentName} 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

`
