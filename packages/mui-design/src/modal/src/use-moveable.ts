
import { ref, SetupContext } from 'vue';
import { on, off } from "./dom";
import { ModalProps } from './modal-types';

export const useMoveable = (props: ModalProps, ctx: SetupContext<Record<string, any>>) => {

  let is_moving = ref(false)
  let dragging = ref(false)

  const modalDomInner = ref()
  const modalHeader = ref()
  const modalBody = ref()
  const maskDom = ref()
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
 
  const handleMoveStart = (event: any) => {
    currentDom.value = event.target.parentNode
    dragging.value = true;
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
    maskDom.value.style["pointer-events"] = "all";
    event.preventDefault();
    // 得到鼠标拖动的x,y距离
    let distX = event.clientX - moveStartX.value;
    let distY = event.clientY - moveStartY.value;

    currentDom.value.style.left = distX + "px";
    currentDom.value.style.top = distY + "px";
  
  }
  
  const handleMoveEnd = async (event:any) => {
   
    dragging.value = false;
    maskDom.value.style["pointer-events"] = "none";
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
    // await nextTick(async () => {
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
    on(window, "mousemove", handleResizeMove);
    on(window, "mouseup", handleResizeUp);
    // });
  }
  
  const handleResizeMove = (event: any) => {
    if (!is_moving.value) return false;
    maskDom.value.style["pointer-events"] = "all";
    event.preventDefault();
    // 得到鼠标拖动的宽高距离
    var distX = event.clientX - startX.value;
    var distY = event.clientY - startY.value;
    // 往右上方拖动：

    frameDiv.value.style.width = targetDivWidth.value + distX + "px";
    frameDiv.value.style.height = targetDivHeight.value + distY + "px";
    // 设置最小范围：不能无限制缩放，影响体验
    if (parseInt(frameDiv.value.style.width) <= props.size.minW) {
      frameDiv.value.style.width = props.size.minW + "px";
    }
    if (parseInt(frameDiv.value.style.height) <= props.size.minH) {
      frameDiv.value.style.height = props.size.minH + "px";
    }

    // 最大范围
    // if (parseInt(frameDiv.value.style.width) >= props.size.maxW) {
    //   frameDiv.value.style.width = props.size.maxW + 'px'
    // }
    // if (parseInt(frameDiv.value.style.height) >= props.size.maxH) {
    //   frameDiv.value.style.height = props.size.maxH + 'px'
    // }
  }

  const handleResizeUp = (e: Event) => {
    targetDiv.value.style.width = frameDiv.value.style.width;
    targetDiv.value.style.height = frameDiv.value.style.height;
    modalBody.value.style.height = `${frameDiv.value.offsetHeight - headerHeight.value}px`;

    // resize 事件回调
    ctx.emit("modalResize", {
      event: e,
      data: props.data,
      size: {
        width: frameDiv.value.style.width,
        height: frameDiv.value.style.height
      }
    });
    is_moving.value = false;
    if (maskDom.value)
      maskDom.value.style["pointer-events"] = "none";
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
  return {
    is_moving,
    modalDomInner,
    modalHeader,
    modalBody,
    maskDom,
    handleMoveStart,
    handleResizeStart,
  }
}