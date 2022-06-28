import type { PropType, ExtractPropTypes } from 'vue'

export const modalProps = {
  // 当前窗体使用数据-（配合widgetResize回调使用）
  data: {
    type: Object,
    default: () => {}
  },
  // 是否显示modal
  widgetShowProps: {
    type: Boolean,
    default: true
  },
  // 是否显示遮罩
  widgetShowMask:{
    type: Boolean,
    default: false
  },
  // 窗体title
  widgetTitle: {
    type: String,
    default: "test"
  },
  // 窗体title部分icon
  widgetIconStyle: {
    type: Object,
    default: () => {
      return {
        iconType: "h-icon-app",
        iconClass: "h-icon-app"
      };
    }
  },
  widgetSize: {
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

  // 左侧-菜单DOM id
  getDocLeftdomid: {
    type: String,
    default: "view-tree-left"
  },
  // 右侧工作区DOM id
  getDocRightdomid: {
    type: String,
    default: "view-tree-right"
  },
  // 是否停靠至-工作区左边
  stopWorkspaceLeft: {
    type: Boolean,
    default: false
  },
  // 是否停靠至-窗体底部边
  stopDocBottom: {
    type: Boolean,
    default: false
  },
  // 多窗体距离窗体的top距离-（如果stopWinBottom为true的时候失效）
  stopDocTop: {
    type: Number,
    default: 100
  },
  // 是否支持最小化按钮-最小化需要配合widgetSmall回调函数在父页面进行数据集合维护，然后用集合做菜单
  widgetMinShow: {
    type: Boolean,
    default: true
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
