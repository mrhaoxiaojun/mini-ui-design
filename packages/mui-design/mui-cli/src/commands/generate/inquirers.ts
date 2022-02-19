/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 20:25:48 
 * @Details: 与用户交互的问答
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-19 17:57:16
 */
import { camelCase } from "lodash";
import { components } from "../../utils";
import { CREATE_SUPPORT_TYPES,VITEPRESS_SIDEBAR_CATEGORY, COMPONENTS_DIR } from "./constant"

export const typeName = () => ({
  name: 'name',
  type: 'input',
  message: '（必填）请输入组件 name ，将用作目录及文件名(自动化驼峰转换名称)：',
  validate: (value:string) => {
    let v = value.trim()
    if (v === '') {
      return '组件 name 是必填项！'
    }
    if(components(COMPONENTS_DIR).includes(v) || components(COMPONENTS_DIR).includes(camelCase(v))){
      return `已有该（${v}）组件名称，请重新输入`
    }
    return true
  }
})

export const typeTitle = () => ({
  name: 'title',
  type: 'input',
  message: '（必填）请输入组件中文名称，将用作文档列表显示：',
  validate: (value:string) => {
    if (value.trim() === '') {
      return '组件名称是必填项！'
    }
    return true
  }
})

export const selectCategory = () => ({
  name: 'category',
  type: 'list',
  message: '（必填）请选择组件分类，将用作文档列表分类：',
  choices: VITEPRESS_SIDEBAR_CATEGORY,
  default: 0
})


export const selectCreateType = () => ({
  // 用于获取后的属性名
  name: 'type',
  // 交互方式为列表单选
  type: 'list',
  // 提示信息
  message: '（必填）请选择生成类型：',
  // 选项列表
  choices: CREATE_SUPPORT_TYPES,
  // 默认值，这里是索引下标
})