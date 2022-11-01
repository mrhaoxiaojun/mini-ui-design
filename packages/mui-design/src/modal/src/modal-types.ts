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
    default: true
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
  size: {
    type: Object,
    default: () => {
      return {
        defaultW: 500, 
        defaultH: 300, 
        defaultDomId:"", // 可选,如果有参考DOM 可传入,覆盖默认的宽高
        maxW: 800, 
        maxH: 500,
        maxDomId:"", // 可选, 如果有参考DOM 可传入,覆盖默认的最大宽高
        minW: 150, 
        minH: 150,
      };
    }
  },
  position:{
    type: Object,
    default: () => {
      return {
        defaultX: 240, 
        defaultY: 200, 
        maxX: 240, 
        maxY: 200
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
