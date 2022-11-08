/*
 * @Author: haoxiaojun
 * @Date: 2022-06-20 10:38:19
 * @Description: 关于DOM的函数
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-08 16:48:04
 */

import { ref } from 'vue';

export const modalDom = ref()

 // 关闭遮罩
 export const closeMask = ()=> {
  document.onmouseup = function (event) {
    let ele = Array.from(document.getElementsByClassName('mx-modal-mask'))
    ele.forEach(element => {
      element.remove()
    })
  }
}
// 创建遮罩
export const createElementMask = ()=> {
  var div = document.createElement('div')
  div.setAttribute('class', 'mx-modal-mask')
  div.setAttribute('id', 'mx-maskDom')
  document.body.append(div)
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