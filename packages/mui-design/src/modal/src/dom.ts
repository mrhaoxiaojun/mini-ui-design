/*
 * @Author: haoxiaojun
 * @Date: 2022-06-20 10:38:19
 * @Description: 关于DOM的函数
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-11 11:11:20
 */

import { ref } from 'vue';

export const modalDom = ref()

// 创建最小化状态条
export const cleateStatusBar = (muiModalMIn:any) => {

  // 1、清除状态条
  let element = document.getElementById("mui-status-bar");
  if(element){
    element.remove()
  }
  // 2、创建状态条
  let divWarp = document.createElement('div')
  divWarp.setAttribute('id', 'mui-status-bar')
  document.body.append(divWarp)
  // 3、遍历创建最小化项
  muiModalMIn.forEach( (ele: any) => {
    let div = document.createElement('div')
    div.innerHTML = ele.title
    div.setAttribute('class', 'item')
    // 添加点击事件
    div.addEventListener('click',()=>{

      let element = document.getElementById(`mui-modal-warp-${ele.id}`)
      if(element){
        // 1) 显示窗体
        element.style.display = 'block'
        // 2）删除当前最小化状态项
        div.remove()
        // 3) 去重，剔除session中存储的当前项
        let muiModalMIn = window.sessionStorage.getItem("muiModalMIn")
        let min = null
        if(muiModalMIn){
          min = JSON.parse(muiModalMIn)
          for(let i = 0 ; i< min.length ; i++){
            
            if(min[i].id == ele.id){
              min.splice(i,1)
              break
            }

          }
        }
        window.sessionStorage.setItem("muiModalMIn",JSON.stringify(min))
      }
      
    });

    divWarp.append(div)
  });
}

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