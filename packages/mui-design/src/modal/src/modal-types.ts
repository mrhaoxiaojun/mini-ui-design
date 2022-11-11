import type { PropType, ExtractPropTypes } from 'vue'

export const modalProps = {
  // 当前窗体使用数据-（配合widgetResize回调使用）
  data: {
    type: Object,
    default: () => {}
  },
  // 是否显示modal
  isShow: {
    type: Boolean,
    default: false
  },
  // 窗体id
  id: {
    type: String,
    default: ""
  },
  // 是否显示遮罩
  mask:{
    type: Boolean,
    default: false
  },
  // 窗体title
  title: {
    type: String,
    default: "test"
  },
  // 窗体title部分icon
  titleIcon: {
    type: Object,
    default: () => {
      return {
        iconType: "h-icon-app",
        iconClass: "h-icon-app"
      };
    }
  },
  // 可选,如果有参考DOM 可传入,覆盖默认的宽高
  defaultDomId: {
    type: String,
    default: ""
  },
  // 默认宽度
  defaultW: {
    type: Number,
    default: 500
  },
  // 默认高度
  defaultH: {
    type: Number,
    default: 300
  },
   // 可选, 如果有参考DOM 可传入,覆盖默认的最大宽高
   maxDomId: {
    type: String,
    default: ""
  },
  // 最大宽度
  maxW: {
    type: Number,
    default: 800
  },
  // 最大高度
  maxH: {
    type: Number,
    default: 500
  },
  // 最小宽度
  minW: {
    type: Number,
    default: 150
  },
  // 最小高度
  minH: {
    type: Number,
    default: 150
  },
  // 默认窗体左上角坐标位置
  defaultPosition: {
    type: Object,
    default: () => {
      return {
        x: 240, 
        y: 200, 
      };
    }
  },
  // 最大化窗体左上角坐标位置
  maxPosition:{
    type: Object,
    default: () => {
      return {
        x: 240, 
        y: 200
      };
    }
  },
  // 是否支持最小化按钮-最小化需要配合widgetSmall回调函数在父页面进行数据集合维护，然后用集合做菜单
  isShowMin: {
    type: Boolean,
    default: true
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
