import { defineComponent, ref, reactive ,watch} from 'vue';
import { modalProps, ModalProps } from './modal-types'
import { oldLocate, modalDom, getDom, getLocate } from "./dom";
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
    let is_showMask = ref(false)
    let modalShow = ref(props.isShow)
    let modalSizes = reactive(props.size)
    // onMounted(async () => {
    //   if(modalShow.value){
    //     computedSize()
    //     computedLocate()
    //   }
    // })
    const {
      is_moving,
      modalDomInner,
      modalHeader,
      modalBody,
      maskDom,
      handleMoveStart,
      handleResizeStart,
    } = useMoveable(props, ctx);
    
    watch(() => props.isShow, (newValue, oldValue) => {
      modalShow.value = newValue
      if(modalShow.value){
        computedSize()
        computedLocate()
      }
    })

    /**
     * @description: 关闭
     * @return {*}
     */
    const modalClose = () => {
      modalSmallShow.value = false;
      modalBigShow.value = false;
      modalNormalShow.value = false;
      modalShow.value = false;
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

      getLocate();

      modalNormalShow.value = false;
      modalSmallShow.value = false;
      modalBigShow.value = true;
      
      const modalDom = await getDom()
      modalDom.left = `${props.position.maxX }px`;
      modalDom.top = `${props.position.maxY }px`;
      modalDom.width = `${modalSizes.maxW}px`;
      modalDom.height = `${modalSizes.maxH}px`;

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
      modalDom.width = modalSizes.defaultW = oldLocate.width;
      modalDom.height = oldLocate.height;
      (await getDom("m-modal-body")).height  = oldLocate.height
        // ? `${Number(oldLocate.height.split("p")[0]) - 24}px`.......?
        ? `${Number(oldLocate.height) - 24}px`
        : "auto";
      modalNormalShow.value = true;
      modalSmallShow.value = false;
      modalBigShow.value = false;
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
      let defaultW = null
      let defaultH = null

      if( modalSizes.defaultDomId){
        let defaultDom = document.getElementById(modalSizes.defaultDomId)
        defaultW = Number(defaultDom?.offsetWidth) - 20
        defaultH = Number(defaultDom?.offsetHeight) - 20
      }

      const modalDom = await getDom()
      modalDom.width = `${modalSizes.defaultDomId ? defaultW: modalSizes.defaultW}px`;
      modalDom.height = `${modalSizes.defaultDomId ? defaultH : modalSizes.defaultH}px`;
      

      // 处理最大宽高
      let maxW = null
      let maxH = null

      if( modalSizes.maxDomId ){
        let maxDom = document.getElementById(modalSizes.maxDomId)
        maxW = Number(maxDom?.offsetWidth) - 20
        maxH = Number(maxDom?.offsetHeight) - 20
      }
      modalSizes.maxW = modalSizes.maxDomId ? maxW : modalSizes.maxW
      modalSizes.maxH = modalSizes.maxDomId ? maxH : modalSizes.maxH

      // 最小宽高不做出处理默认150*150

      getLocate();

    }
    // 初始化位置信息
    const computedLocate = async ()=> {
      const modalDom = await getDom()
      modalDom.left = `${props.position.defaultX }px`;
      modalDom.top= `${props.position.defaultY }px`;
    }
   
    return () => (
      modalShow.value && <div class="m-modal-wrap" ref={modalDom} >
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
              { modalBigShow.value ? <span onClick={modalNormal}>还原</span> : "" }
              <span onClick={modalClose}>关闭</span>
            </div>
            
            {/* body */}
            <div class="m-modal-body" ref={modalBody}>
              {ctx.slots.modalBody?.()}
            </div>  
            
            {/* footer */}
            
            <div class="modal-footer">
              {
                !modalBigShow.value ? 
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