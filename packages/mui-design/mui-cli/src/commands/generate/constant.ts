/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 09:48:17 
 * @Details: 生成工具的常量集合
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 15:22:20
 */
import { COMPONENT_LIBRARY_MAIN_FILE_NAME } from "../../_config/common"

const { resolve } = require('path')

export const CWD = process.cwd()

export const COMPONENTS_DIR = resolve(CWD, 'src')
export const TESTS_DIR = '__tests__'
export const DOCS_DIR = resolve(CWD, 'mui-docs')
export const DOCS_COMPONENTS_DIR = resolve(DOCS_DIR, 'components')
export const DOCS_VITEPRESS_DIR = resolve(DOCS_DIR, '.vitepress')
export const VITEPRESS_SIDEBAR_FILE = resolve(DOCS_VITEPRESS_DIR,'config/sidebar.ts')

export const INDEX_FILE_NAME = 'index.ts'
export const DOCS_FILE_NAME = 'index.md'

export const MAIN_FILE = resolve(COMPONENTS_DIR, COMPONENT_LIBRARY_MAIN_FILE_NAME)


// 这里的分类顺序将会影响最终生成的页面侧边栏顺序
export const VITEPRESS_SIDEBAR_CATEGORY = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']
// create type 支持项
export const CREATE_SUPPORT_TYPES = ['component', 'lib-entry', "dts"]
