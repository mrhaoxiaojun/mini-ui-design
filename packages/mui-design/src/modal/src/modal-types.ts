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
        defaultW: null, // 默认地图宽度
        defaultH: null, // 不设置高度
        maxW: null, // 默认地图宽度
        maxH: null, // 默认地图高度
        minW: null, // 默认150
        minH: null // 默认150
      };
    }
  },
  // 顶部-头DOM id
  getDocTopdomid: {
    type: String,
    default: "common-header"
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
