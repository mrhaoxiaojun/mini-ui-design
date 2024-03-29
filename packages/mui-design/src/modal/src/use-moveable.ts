/*
 * @Author: haoxiaojun
 * @Date: 2022-06-28 17:31:19
 * @Description: 移动和拉伸
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-15 09:08:16
 */

import { ref, SetupContext } from 'vue';
import { on, off,createElementMask } from "./dom";
import { ModalProps } from './modal-types';

export const useMoveable = (props: ModalProps, ctx: SetupContext<Record<string, any>>) => {

  let is_moving = ref(false)
  let dragging = ref(false)

  const modalDomInner = ref()
  const modalHeader = ref()
  const modalBody = ref()
  const currentDom = ref()
  
  let moveStartX = ref()
  let moveStartY = ref()
  let startX = ref()
  let startY = ref()
  let targetDiv = ref()
  let frameDiv = ref()
  let headerHeight = ref()
  let targetDivWidth = ref()
  let targetDivHeight = ref()

  /**
   * @description: 位置信息
   * @return {*}
   */
   let oldLocate = ref(<any>{
    left:0 || "",
    top: 0 || "",
    width: 0 || "",
    height: 0 || ""
  })
 
  const handleMoveStart = (event: any) => {
    currentDom.value = event.target.parentNode
    dragging.value = true;
    createElementMask()
    // 鼠标的位置,参照modal左上角
    moveStartX.value = event.clientX - modalDomInner.value.offsetLeft;
    moveStartY.value = event.clientY - modalDomInner.value.offsetTop;
    // 提高层级
    getModalZindex()
    
    on(window, "mousemove", handleMoveMove);
    on(window, "mouseup", handleMoveEnd);
  }

  const handleMoveMove = async (event: any) => {

    if (!dragging.value) return false;
    // maskDom.value.style["pointer-events"] = "all";
    event.preventDefault();
    // 得到鼠标拖动的x,y距离
    let distX = event.clientX - moveStartX.value;
    let distY = event.clientY - moveStartY.value;

    currentDom.value.style.left = distX + "px";
    currentDom.value.style.top = distY + "px";
  
  }
  
  const handleMoveEnd = async (event:any) => {
   
    dragging.value = false;
    // maskDom.value.style["pointer-events"] = "none";
    // 处理上下边界
    if (Number(currentDom.value.style.top.split("p")[0]) <= 0) {
      currentDom.value.style.top = 0;
    }
    if (Number(currentDom.value.style.top.split("p")[0]) >= document.body.clientHeight) {
      currentDom.value.style.top = `${document.body.clientHeight - 50}px`;
    }
    off(window, "mousemove", handleMoveMove);
    off(window, "mouseup", handleMoveEnd);
  }

  const handleResizeStart = async (event: any) => {
    targetDiv.value = modalDomInner.value;
    frameDiv.value = event.target.nextElementSibling; // 线框dom
    headerHeight.value = modalHeader.value.offsetHeight; // modal header height
    is_moving.value = true;

    // 得到点击时该地图容器的宽高：
    targetDivWidth.value = targetDiv.value.offsetWidth;
    targetDivHeight.value = targetDiv.value.offsetHeight;
    // 鼠标的位置
    startX.value = event.clientX;
    startY.value = event.clientY;
    createElementMask()
    on(window, "mousemove", handleResizeMove);
    on(window, "mouseup", handleResizeUp);
  }
  
  const handleResizeMove = (event: any) => {
    if (!is_moving.value) return false;
    // maskDom.value.style["pointer-events"] = "all";
    event.preventDefault();
    // 得到鼠标拖动的宽高距离
    var distX = event.clientX - startX.value;
    var distY = event.clientY - startY.value;
    // 往右上方拖动：

    frameDiv.value.style.width = targetDivWidth.value + distX + "px";
    frameDiv.value.style.height = targetDivHeight.value + distY + "px";
    // 设置最小范围：不能无限制缩放，影响体验
    if (parseInt(frameDiv.value.style.width) <= props.minW) {
      frameDiv.value.style.width = props.minW + "px";
    }
    if (parseInt(frameDiv.value.style.height) <= props.minH) {
      frameDiv.value.style.height = props.minH + "px";
    }

    // 最大范围
    // if (parseInt(frameDiv.value.style.width) >= props.maxW) {
    //   frameDiv.value.style.width = props.maxW + 'px'
    // }
    // if (parseInt(frameDiv.value.style.height) >= props.maxH) {
    //   frameDiv.value.style.height = props.maxH + 'px'
    // }
  }

  const handleResizeUp = (event: any) => {
    
    let distX = event.clientX - startX.value
    let distY = event.clientY - startY.value
    // 单纯的点击事件禁止进行宽高变化
    if (distX === 0 && distY === 0) {
      is_moving.value = false;
      off(window, "mousemove", handleResizeMove);
      off(window, "mouseup", handleResizeUp);
      return
    }

    // 设置外部宽高
    targetDiv.value.style.width = frameDiv.value.style.width;
    targetDiv.value.style.height = frameDiv.value.style.height;
    // 设置内部body的高度
    modalBody.value.style.height = `${frameDiv.value.offsetHeight - headerHeight.value}px`;

    // resize 事件回调
    ctx.emit("modalResize", {
      event: event,
      data: props.data,
      size: {
        width: frameDiv.value.style.width,
        height: frameDiv.value.style.height
      }
    });
    is_moving.value = false;
    //   maskDom.value.style["pointer-events"] = "none";
    off(window, "mousemove", handleResizeMove);
    off(window, "mouseup", handleResizeUp);
  }

  const getModalZindex = () =>{
    let muiModalZindex = window.sessionStorage.getItem('muiModalZindex')
    if(muiModalZindex){
      let zIndex = JSON.parse(muiModalZindex) + 1
      window.sessionStorage.setItem('muiModalZindex',JSON.stringify(zIndex))
      currentDom.value.style.zIndex = zIndex
    }else{
      window.sessionStorage.setItem('muiModalZindex',JSON.stringify(1001))
    }
  }

  /**
   * @description: 记录上一次位置
   * @return {*}
   */
  const getLocate = async ()=> {
    oldLocate.value = {
      left: `${modalDomInner.value.offsetLeft}px`,
      top: `${modalDomInner.value.offsetTop}px`,
      width: `${modalDomInner.value.offsetWidth}px`,
      height: `${modalDomInner.value.offsetHeight}px`,
    }
  }

  return {
    is_moving,
    modalDomInner,
    modalHeader,
    modalBody,
    oldLocate,
    handleMoveStart,
    handleResizeStart,
    getLocate,
  }
}