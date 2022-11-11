/*
 * @Author: haoxiaojun
 * @Date: 2022-06-16 22:28:43
 * @Description: 多功能模态框，简称多窗体，支持最大、最小、关闭、拖拽、伸缩、边界回弹、多个窗体层叠弹出、全局识别维护唯一标识和层级
 * @LastEditors: haoxiaojun
 * @LastEditTime: 2022-11-11 11:29:15
 */
import { defineComponent, ref, reactive, nextTick,onMounted ,getCurrentInstance} from 'vue';
import { modalProps, ModalProps } from './modal-types'
import { modalDom, closeMask , cleateStatusBar } from './dom';
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
    let maxW = ref(props.maxW)
    let maxH = ref(props.maxH)
    // let muiModalMIn = ref([])
    // let is_showMask = ref(true)
    // let modalShow = ref(props.isShow)
    // let modalSizes = reactive(props.size)
    
    const {
      is_moving,
      modalDomInner,
      modalHeader,
      modalBody,
      // maskDom,
      oldLocate,
      handleMoveStart,
      handleResizeStart,
      getLocate,
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
      // 监听刷新页面需要需要清空指定session
      clearSession()
      // 关闭遮罩
      closeMask()
    })
   
    /**
     * @description: 关闭
     * @return {*}
     */
    const modalClose = (event:any) => {
      removeModalId(event)
      ctx.emit("modalClose");
    }
    /**
     * @description: 最小化
     * @return {*}
     */
    const modalSmall= (event:any)=> {
      
      // 1、当前记录位置
      getLocate();
      // 2、最小化当前窗体
      event.target.parentNode.parentNode.parentNode.style.display = 'none'
      // 3、获取最小化窗体数据集合
      let modalMin = window.sessionStorage.getItem("muiModalMIn")
      let muiModalMIn = modalMin ?  JSON.parse(modalMin) : []
      // 4、添加最新数据到书记集合并存储到session （去重动作在还原窗体时已做）
      muiModalMIn.push(props.data)
      window.sessionStorage.setItem('muiModalMIn',JSON.stringify(muiModalMIn))
      // 5、根据数据集合动态生成状态条
      cleateStatusBar(muiModalMIn)
      // 6、回调业务层
      ctx.emit("modalSmall");
    }

    /**
     * @description: 最大化
     * @param {Event} event
     * @return {*}
     */
    const modalBig = async (event:Event)=> {

      // 记录旧的位置、大小信息
      await getLocate();
      console.log(oldLocate);

      // 设置状态
      modalNormalShow.value = false;
      modalSmallShow.value = false;
      modalBigShow.value = true;

      // 设置位置、大小
      await nextTick()
      modalDomInner.value.style.left = `${props.maxPosition.x }px`;
      modalDomInner.value.style.top = `${props.maxPosition.y }px`;
      modalDomInner.value.style.width = `${props.maxW}px`;
      modalDomInner.value.style.height = `${props.maxH}px`;
      
      // 设置body高度-方便调用者使用获取
      modalDomInner.value.getElementsByClassName("m-modal-body")[0].style.height = `${props.maxH - 24}px`;

      // 返回当前窗体信息
      ctx.emit("modalResize", {
        event: event,
        data: props.data,
        size: {
          width: modalDomInner.value.style.width,
          height: modalDomInner.value.style.height
        }
      });
    }

    /**
     * @description: 正常化
     * @param {Event} event
     * @return {*}
     */
    const modalNormal = async (event:Event)=> {

      // 还原窗体位置、大小信息
      await nextTick()
      modalDomInner.value.style.left = oldLocate.value.left;
      modalDomInner.value.style.top = oldLocate.value.top;
      modalDomInner.value.style.width = oldLocate.value.width;
      modalDomInner.value.style.height = oldLocate.value.height;
      
      // 设置body高度-方便调用者使用获取
      modalDomInner.value.getElementsByClassName("m-modal-body")[0].style.height = oldLocate.value.height
      ? `${Number(oldLocate.value.height.split("p")[0]) - 24}px`
      : "auto";
      
      // 设置正常化状态
      modalNormalShow.value = true;

      // 返回当前窗体信息
      ctx.emit("modalResize", {
        event: event,
        data: props.data,
        size: {
          width:modalDomInner.value.style.width,
          height:modalDomInner.value.style.height
        }
      });
    }
   
    /**
     * @description: 初始化计算尺寸
     * @return {*}
     */
    const computedSize= async ()=> {
      
      // 处理默认宽高
      let defaultW = props.defaultW
      let defaultH = props.defaultH

      if( props.defaultDomId){
        let defaultDom = document.getElementById(props.defaultDomId)
        defaultW = Number(defaultDom?.offsetWidth) - 20
        defaultH = Number(defaultDom?.offsetHeight) - 20
      }

      modalDomInner.value.style.width = `${defaultW}px`;
      modalDomInner.value.style.height = `${defaultH}px`;
      
      // 处理最大宽高
      if( props.maxDomId ){
        let maxDom = document.getElementById(props.maxDomId)
        maxW.value = Number(maxDom?.offsetWidth) - 20
        maxH.value = Number(maxDom?.offsetHeight) - 20
      }

      // 最小宽高不做出处理默认150*150

      getLocate();

    }
    // 初始化位置信息
    const computedLocate = async ()=> {
     
      await nextTick()

      let idsList =  window.sessionStorage.getItem('muiModalIdsList')
      let len = idsList ? JSON.parse(idsList) : 0
      
      modalDomInner.value.style.left =`${200 + len.length * 10}px`
      modalDomInner.value.style.top = `${50 + len.length * 24}px`
      
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
      }else{
        window.sessionStorage.setItem('muiModalZindex',"1001")
      }
    }
    
    /**
     * @description: 关闭窗体时，退出当前id
     * @return {*}
     */
    const removeModalId = (e:any)=>{
      let currentId = e.target.parentNode.parentNode.parentNode.getAttribute("data-mainId")
      let muiModalIdsList = JSON.parse(window.sessionStorage.getItem('muiModalIdsList') as string)
      let i = muiModalIdsList.indexOf(currentId)
      if(i>-1){
        muiModalIdsList.splice(muiModalIdsList.indexOf(currentId),1)
        window.sessionStorage.setItem('muiModalIdsList',JSON.stringify(muiModalIdsList)) 
      }
    }

     /**
      * @description: 页面刷新清空指定session
      * @return {*}
      */
     const clearSession = ()=>{
      window.addEventListener('beforeunload', e => {
        window.sessionStorage.removeItem('muiModalZindex')
        window.sessionStorage.removeItem('muiModalIdsList')
        window.sessionStorage.removeItem('muiModalCurrentId')
        window.sessionStorage.removeItem('muiModalMIn')
      }) 
    }
   
    return () => (
      // modalShow.value && <div class="m-modal-wrap" ref={modalDom} main-id={props.id}>
      <div class="m-modal-wrap mui-modal-warp" id={'mui-modal-warp-'+ props.id} ref={modalDom}  data-mainId={props.id} >
          <div
            ref={modalDomInner}
            class={`m-modal modal-wrap`}
            style = { modalBigShow.value ? `width = ${maxW}` : `width = ${props.defaultW}`}>


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
          
          {/* { is_showMask ? <div class="m-modal-mask" ref={maskDom} ></div> : ""} */}
          { props.mask ? <div class="m-modal-bgMask" ></div> : ""}

      </div>
    )

  }
})