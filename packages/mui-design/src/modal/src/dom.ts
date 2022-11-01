/*
 * @Author: haoxiaojun
 * @Date: 2022-06-20 10:38:19
 * @Description: 关于DOM的函数
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-01 11:37:54
 */

import { ref ,nextTick} from 'vue';

/**
 * @description: 位置信息
 * @return {*}
 */
export let oldLocate = ref(<any>{
  left:0 || "",
  top: 0 || "",
  width: 0 || "",
  height: 0 || ""
})

export const modalDom = ref()

/**
 * @description: 获取content
 * @param {*} className
 * @param {*} attr
 * @return {*}
 */
export const getDom = async (className = "m-modal", attr = "style") : Promise<any> => {
  await nextTick()
  // console.log(modalDom.value.getElementsByClassName(className));
  
  return modalDom.value.getElementsByClassName(className)[0][attr];
}

/**
 * @description: 记录上一次位置
 * @return {*}
 */
export const getLocate = async ()=> {
  const modalDom = await getDom()
  oldLocate = {
    left: modalDom.left,
    top: modalDom.top,
    width: modalDom.width,
    height: modalDom.height
  }
}



/* istanbul ignore next */
export const on = (function () {
  if (!!document.addEventListener) {
    return function (element:any, event:string, handler:Function) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element:any, event:string, handler:Function) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const off = (function () {
  if (!!document.removeEventListener) {
    return function (element:any, event:string, handler:Function) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element:any, event:string, handler:Function) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()