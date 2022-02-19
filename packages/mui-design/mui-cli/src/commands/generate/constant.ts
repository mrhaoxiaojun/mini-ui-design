const { resolve } = require('path')
const { version } = require('../../../../../mui-design/package-lock.json')

export const VERSION = version
export const CWD = process.cwd()

export const COMPONENTS_DIR = resolve(CWD, 'src')
export const TESTS_DIR = '__tests__'
export const DOCS_DIR = resolve(CWD, 'mui-docs')
export const DOCS_COMPONENTS_DIR = resolve(DOCS_DIR, 'components')
export const DOCS_VITEPRESS_DIR = resolve(DOCS_DIR, '.vitepress')

export const INDEX_FILE_NAME = 'index.ts'
export const DOCS_FILE_NAME = 'index.md'

export const MUI_NAMESPACE = 'M'
export const CSS_CLASS_PREFIX = 'mui'

// export const MUI_FILE_NAME = 'vue-devui.ts'
// export const MUI_FILE = resolve(COMPONENTS_DIR, MUI_FILE_NAME)

// export const VITEPRESS_SIDEBAR_FILE_NAME = 'sidebar.ts'
// export const VITEPRESS_SIDEBAR_FILE = resolve(
//   DOCS_VITEPRESS_DIR,
//   `config/${VITEPRESS_SIDEBAR_FILE_NAME}`
// )

// 这里的分类顺序将会影响最终生成的页面侧边栏顺序
export const VITEPRESS_SIDEBAR_CATEGORY = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']
// create type 支持项
export const CREATE_SUPPORT_TYPES = ['component', 'lib-entry']
