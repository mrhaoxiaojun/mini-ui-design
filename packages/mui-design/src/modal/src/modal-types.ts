/*
 * @Author: haoxiaojun
 * @Date: 2022-06-16 22:28:43
 * @Description: 参数
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-15 11:23:03
 */
import type { PropType, ExtractPropTypes } from 'vue'

export const modalProps = {
  // 窗体id
  id: {
    type: String,
    default: "",
    required: true
  },
  // 窗体title
  title: {
    type: String,
    required: true,
    default: "test"
  },
  // 可选，是否显示遮罩
  mask:{
    type: Boolean,
    default: false
  },
  // 可选，窗体title部分icon
  titleIcon: {
    type: Object,
    default: () => {
      return {
        iconType: "h-icon-app",
        iconClass: "h-icon-app"
      };
    }
  },
  // 可选，当前窗体使用的原始数据（配合modalResize回调使用）
  data: {
    type: Object,
    default: () => {}
  },
  // 可选，用于循环数据窗体，当前数据的父级数据集合
  parentData:{
    type: Array,
    default: () => {}
  },
  // 可选,如果有参考DOM 可传入,覆盖默认的宽高
  defaultDomId: {
    type: String,
    default: ""
  },
  // 可选，默认宽度
  defaultW: {
    type: Number,
    default: 500
  },
  // 可选，默认高度
  defaultH: {
    type: Number,
    default: 300
  },
   // 可选, 如果有参考DOM 可传入,覆盖默认的最大宽高
   maxDomId: {
    type: String,
    default: ""
  },
  // 可选，最大宽度
  maxW: {
    type: Number,
    default: 800
  },
  // 可选，最大高度
  maxH: {
    type: Number,
    default: 500
  },
  // 可选，最小宽度
  minW: {
    type: Number,
    default: 150
  },
  // 可选，最小高度
  minH: {
    type: Number,
    default: 150
  },
  // 可选，默认窗体左上角坐标位置
  defaultPosition: {
    type: Object,
    default: () => {
      return {
        x: 500, 
        y: 120, 
      };
    }
  },
  // 可选，最大化窗体左上角坐标位置
  maxPosition:{
    type: Object,
    default: () => {
      return {
        x: 300, 
        y: 120
      };
    }
  },
  // 可选，是否支持最小化按钮
  isShowMin: {
    type: Boolean,
    default: true
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
