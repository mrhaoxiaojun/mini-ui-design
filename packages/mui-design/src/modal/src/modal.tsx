/*
 * @Author: haoxiaojun
 * @Date: 2022-06-16 22:28:43
 * @Description: 多功能模态框，简称多窗体，支持最大、最小、关闭、拖拽、伸缩、边界回弹、多个窗体层叠弹出、全局识别维护唯一标识和层级
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-02 17:54:41
 */
import { defineComponent, ref, reactive, watch, nextTick,onMounted} from 'vue';
import { modalProps, ModalProps } from './modal-types'
import { modalDom, getDom, getLocate,oldLocate } from "./dom";
import { useMoveable } from './use-moveable';
import './modal.scss'

export default defineComponent({
  name: 'Modal',
  props: modalProps,
  // emits: ["modalClose","modalSmall","modalResize"],
  setup(props: ModalProps, ctx) {

    let modalSmallShow = ref(false)
    let modalBigShow = ref(false)
    let modalNormalShow = ref(true)
    let is_showMask = ref(true)
    let modalShow = ref(props.isShow)
    let modalSizes = reactive(props.size)

    const {
      is_moving,
      modalDomInner,
      modalHeader,
      modalBody,
      maskDom,
      handleMoveStart,
      handleResizeStart,
    } = useMoveable(props, ctx);
    
    // 全局设置多窗体的Id，每次弹出都会获得唯一的Id
    let muiModalCurrentId = Number(window.sessionStorage.getItem('muiModalCurrentId') || 0)
    muiModalCurrentId = muiModalCurrentId +1 
    window.sessionStorage.setItem('muiModalCurrentId', muiModalCurrentId.toString())
    
    onMounted( ()=>{
      // 初始化操作按钮状态
      modalNormalShow.value = true;
      // 初始化尺寸计算
      computedSize()
      // 初始化位置计算
      computedLocate()
      // 初始化zIndex层级
      initZindex()
      
    })
    
    /**
     * @description: 监控弹窗状态
     * @param {*} props
     * @param {*} param2
     * @return {*}
     */
    // watch(
    //   () => props.isShow, 
    //   (newValue, oldValue) => {
    //     modalShow.value = newValue
    //     if(modalShow.value){

    //       // 全局设置多窗体的Id，每次弹出都会获得唯一的Id
    //       let muiModalCurrentId = Number(window.sessionStorage.getItem('muiModalCurrentId') || 0)
    //       muiModalCurrentId = muiModalCurrentId +1 
    //       window.sessionStorage.setItem('muiModalCurrentId', muiModalCurrentId.toString())
    //       // 初始化操作按钮状态
    //       modalNormalShow.value = true;
    //       // 初始化尺寸计算
    //       computedSize()
    //       // 初始化位置计算
    //       computedLocate()
    //       // 初始化zIndex层级
    //       initZindex()
    //     }
    //   }
    // )

    /**
     * @description: 关闭
     * @return {*}
     */
    const modalClose = (event:any) => {
      console.log(1221,event);
      // modalShow.value = false;
      removeModalId(event)
      ctx.emit("modalClose");
    }
    /**
     * @description: 最小化
     * @return {*}
     */
    const modalSmall= ()=> {
      getLocate();
      modalNormalShow.value = false;
      modalSmallShow.value = true;
      modalBigShow.value = false;
      ctx.emit("modalSmall");
    }

    /**
     * @description: 最大化
     * @param {Event} event
     * @return {*}
     */
    const modalBig = async (event:Event)=> {

      await getLocate();
      console.log(oldLocate);
      

      modalNormalShow.value = false;
      modalSmallShow.value = false;
      modalBigShow.value = true;
      
      const modalDom = await getDom()
      modalDom.left = `${props.position.maxX }px`;
      modalDom.top = `${props.position.maxY }px`;
      modalDom.width = `${modalSizes.maxW}px`;
      modalDom.height = `${modalSizes.maxH}px`;

      console.log(modalDom);

      // m-modal-body 重置最大
      (await getDom("m-modal-body")).height = `${modalSizes.maxH - 24}px`;
      ctx.emit("modalResize", {
        event: event,
        data: props.data,
        size: {
          width: modalDom.width,
          height: modalDom.height
        }
      });
    }

    /**
     * @description: 正常化
     * @param {Event} event
     * @return {*}
     */
    const modalNormal = async (event:Event)=> {
      const modalDom = await getDom()
      
      modalDom.left = oldLocate.left;
      modalDom.top = oldLocate.top;
      modalDom.width = oldLocate.width;
      // modalDom.width = modalSizes.defaultW = oldLocate.width;
      modalDom.height = oldLocate.height;
      (await getDom("m-modal-body")).height  = oldLocate.height
        ? `${Number(oldLocate.height) - 24}px`
        : "auto";
        console.log(modalDom.width);
        console.log(modalDom.height);
        
      modalNormalShow.value = true;
      // modalSmallShow.value = false;
      // modalBigShow.value = false;
      ctx.emit("modalResize", {
        event: event,
        data: props.data,
        size: {
          width:modalDom.width,
          height:modalDom.height
        }
      });
    }
   
    /**
     * @description: 初始化计算尺寸
     * @return {*}
     */
    const computedSize= async ()=> {
      
      // 处理默认宽高
      let defaultW = 500
      let defaultH = 300
      console.log(modalSizes);

      if( modalSizes.defaultDomId){
        let defaultDom = document.getElementById(modalSizes.defaultDomId)
        defaultW = Number(defaultDom?.offsetWidth) - 20
        defaultH = Number(defaultDom?.offsetHeight) - 20
      }

      const modalDom = await getDom()
      modalDom.width = `${modalSizes.defaultW ? modalSizes.defaultW: defaultW}px`;
      modalDom.height = `${modalSizes.defaultH ? modalSizes.defaultH : defaultH}px`;
      
    
      // 处理最大宽高
      let maxW = 800
      let maxH = 500

      if( modalSizes.maxDomId ){
        let maxDom = document.getElementById(modalSizes.maxDomId)
        maxW = Number(maxDom?.offsetWidth) - 20
        maxH = Number(maxDom?.offsetHeight) - 20
      }
      modalSizes.maxW = modalSizes.maxW ? modalSizes.maxW : maxW
      modalSizes.maxH = modalSizes.maxH ? modalSizes.maxH : maxH

      // 最小宽高不做出处理默认150*150

      getLocate();

    }
    // 初始化位置信息
    const computedLocate = async ()=> {
      const modalDom = await getDom()
      window.sessionStorage.getItem('muiModalCurrentId')
      let ary = Array.from(document.getElementsByClassName("mm-modal-warp")); 







      let idsList =  window.sessionStorage.getItem('muiModalIdsList')
      let len = idsList ? JSON.parse(idsList) : 0
      modalDom.left =`${0 + len.length * 10}px`
      modalDom.top = `${0 + len.length * 24}px`
    }

    /**
     * @description: 初始化z-index
     * @return {*}
     */
    const initZindex = async()=>{
      let muiModalZindex = window.sessionStorage.getItem('muiModalZindex')
      if(muiModalZindex){
        window.sessionStorage.setItem('muiModalZindex',JSON.stringify(JSON.parse(muiModalZindex) + 1))
        await nextTick()
        modalDomInner.value.style.zIndex = JSON.stringify(JSON.parse(muiModalZindex) + 1)
      }
    }
    
    /**
     * @description: 关闭窗体时，退出当前id
     * @return {*}
     */
    const removeModalId = (e:any)=>{
      let currentId = e.target.parentNode.parentNode.parentNode.getAttribute("main-id")
      let muiModalIdsList = JSON.parse(window.sessionStorage.getItem('muiModalIdsList') as string)
      let i = muiModalIdsList.indexOf(currentId)
      if(i>-1){
        muiModalIdsList.splice(muiModalIdsList.indexOf(currentId),1)
        window.sessionStorage.setItem('muiModalIdsList',JSON.stringify(muiModalIdsList)) 
      }
    }
   
    return () => (
      // modalShow.value && <div class="m-modal-wrap" ref={modalDom} main-id={props.id}>
      <div class="m-modal-wrap mm-modal-warp" ref={modalDom} main-id={props.id}>
          <div
            ref={modalDomInner}
            class={`m-modal ${ modalSmallShow.value ? 'modal-wrap modalSmall':'modal-wrap'}`}
            style = { modalBigShow.value ? `width = ${modalSizes.maxW}` : `width = ${modalSizes.defaultW}`}>


            {/* heander */}
            <div class="modalHead" ref={modalHeader} onMousedown={handleMoveStart}>
              
              {/* icon */}
              {/* <Icon  type = {props.titleIcon.iconClass} class={props.titleIcon.iconClass} class="title-icon"/> */}
              
              {/* title */}
              {
                !modalSmallShow.value 
                ? <span class="title">{props.title}</span>
                : ""
              }
            
            </div>

            {/* header 操作按钮 */}
            <div class="handleDom">
              { props.isShowMin ? <span onClick={modalSmall}>最小化</span> : "" }
              { modalNormalShow.value ? <span onClick={modalBig}>最大化</span> : "" }
              { !modalNormalShow.value ? <span onClick={modalNormal}>还原</span> : "" }
              <span onClick={modalClose}>关闭</span>
            </div>
            
            {/* body */}
            <div class="m-modal-body" ref={modalBody}>
              {ctx.slots.modalBody?.()}
            </div>  
            
            {/* footer */}
            
            <div class="modal-footer">
              {
                modalNormalShow.value ? 
                <img
                  class="modal-resize"
                  onMousedown ={handleResizeStart}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAtUlEQVR42mL8//8/AyUAIICYGCgEAAFEtAFnz551AuKTQJyALA4QQKS4oA6IzYC4C1kQIIBIMWAZEP+F0nAAEECMlAYiQACx4PMzkGoH4unGxsYLZs2aBeenpaUtgKkDCCAmEvyMNQwAAoiJBD9jDQOAAKI4DAACiAlXPKenpzsB8UkgBvMZGRmdgPgkEKOkA4AAYiLBz1jDACCAmEjwM9YwAAggisMAIIAozkwAAUSxAQABBgCBl0L7jJdTdgAAAABJRU5ErkJggg=="
                /> : ""
              }
              <div class="frame" v-show={is_moving.value}></div>
            </div>

          </div>
          
          { is_showMask ? <div class="m-modal-mask" ref={maskDom} ></div> : ""}
          { props.mask ? <div class="m-modal-bgMask" ></div> : ""}

      </div>
    )

  }
})