import { defineComponent, ref, reactive ,watch} from 'vue';
import { modalProps, ModalProps } from './modal-types'
import { oldLocate, modalDom, getDom, getLocate } from "./dom";
import { useMoveable } from './use-moveable';
import './modal.scss'

export default defineComponent({
  name: 'Modal',
  props: modalProps,
  // emits: ["widgetClose","widgetSmall","widgetResize"],
  setup(props: ModalProps, ctx) {

    let widgetSmallShow = ref(false)
    let widgetBigShow = ref(false)
    let widgetNormalShow = ref(true)
    let is_showMask = ref(false)
    let widgetShow = ref(props.widgetShowProps)
    let widgetSizes = reactive(props.widgetSize)
    // onMounted(async () => {
    //   if(widgetShow.value){
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
    
    watch(() => props.widgetShowProps, (newValue, oldValue) => {
      widgetShow.value = newValue
      if(widgetShow.value){
        computedSize()
        computedLocate()
      }
    })

    /**
     * @description: 关闭
     * @return {*}
     */
    const widgetClose = () => {
      widgetSmallShow.value = false;
      widgetBigShow.value = false;
      widgetNormalShow.value = false;
      widgetShow.value = false;
      ctx.emit("widgetClose");
    }
    /**
     * @description: 最小化
     * @return {*}
     */
    const widgetSmall= ()=> {
      getLocate();
      widgetNormalShow.value = false;
      widgetSmallShow.value = true;
      widgetBigShow.value = false;
      ctx.emit("widgetSmall");
    }

    /**
     * @description: 最大化
     * @param {Event} event
     * @return {*}
     */
    const widgetBig = async (event:Event)=> {

      getLocate();

      widgetNormalShow.value = false;
      widgetSmallShow.value = false;
      widgetBigShow.value = true;
      
      const modalDom = await getDom()
      modalDom.left = `${props.position.maxX }px`;
      modalDom.top = `${props.position.maxY }px`;
      modalDom.width = `${widgetSizes.maxW}px`;
      modalDom.height = `${widgetSizes.maxH}px`;

      // h-modal-body 重置最大
      (await getDom("h-modal-body")).height = `${widgetSizes.maxH - 24}px`;
      ctx.emit("widgetResize", {
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
    const widgetNormal = async (event:Event)=> {
      const modalDom = await getDom()
        
      modalDom.left = oldLocate.left;
      modalDom.top = oldLocate.top;
      modalDom.width = widgetSizes.defaultW = oldLocate.width;
      modalDom.height = oldLocate.height;
      (await getDom("h-modal-body")).height  = oldLocate.height
        // ? `${Number(oldLocate.height.split("p")[0]) - 24}px`.......?
        ? `${Number(oldLocate.height) - 24}px`
        : "auto";
      widgetNormalShow.value = true;
      widgetSmallShow.value = false;
      widgetBigShow.value = false;
      ctx.emit("widgetResize", {
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

      if( widgetSizes.defaultDomId){
        let defaultDom = document.getElementById(widgetSizes.defaultDomId)
        defaultW = Number(defaultDom?.offsetWidth) - 20
        defaultH = Number(defaultDom?.offsetHeight) - 20
      }

      const modalDom = await getDom()
      modalDom.width = `${widgetSizes.defaultDomId ? defaultW: widgetSizes.defaultW}px`;
      modalDom.height = `${widgetSizes.defaultDomId ? defaultH : widgetSizes.defaultH}px`;
      

      // 处理最大宽高
      let maxW = null
      let maxH = null

      if( widgetSizes.maxDomId ){
        let maxDom = document.getElementById(widgetSizes.maxDomId)
        maxW = Number(maxDom?.offsetWidth) - 20
        maxH = Number(maxDom?.offsetHeight) - 20
      }
      widgetSizes.maxW = widgetSizes.maxDomId ? maxW : widgetSizes.maxW
      widgetSizes.maxH = widgetSizes.maxDomId ? maxH : widgetSizes.maxH

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
      widgetShow.value && <div class="h-modal-widget-wrap" ref={modalDom} >
          <div
            ref={modalDomInner}
            class={`h-modal-widget ${ widgetSmallShow.value ? 'widget-wrap widgetSmall':'widget-wrap'}`}
            style = { widgetBigShow.value ? `width = ${widgetSizes.maxW}` : `width = ${widgetSizes.defaultW}`}>


            {/* heander */}
            <div class="widgetHead" ref={modalHeader} onMousedown={handleMoveStart}>
              
              {/* icon */}
              { widgetSmallShow.value 
              ? <i
                class={props.widgetIconStyle.iconClass}
                onClick={widgetNormal}
              /> 
              : "" }

              <i  class={props.widgetIconStyle.iconClass} />
              
              {/* title */}
              {
                !widgetSmallShow.value 
                ? <span class="title">{props.widgetTitle}</span>
                : ""
              }
            
            </div>

            {/* header 操作按钮 */}
            <div class="handleDom">
              { props.widgetMinShow ? <span onClick={widgetSmall}>最小化</span> : "" }
              { widgetNormalShow.value ? <span onClick={widgetBig}>最大化</span> : "" }
              { widgetBigShow.value ? <span onClick={widgetNormal}>还原</span> : "" }
              <span onClick={widgetClose}>关闭</span>
            </div>
            
            {/* body */}
            <div class="h-modal-body" ref={modalBody}>
              {ctx.slots.widgetBody?.()}
            </div>  
            
            {/* footer */}
            
            <div class="widget-footer">
              {
                !widgetBigShow.value ? 
                <img
                  class="widget-resize"
                  onMousedown ={handleResizeStart}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAtUlEQVR42mL8//8/AyUAIICYGCgEAAFEtAFnz551AuKTQJyALA4QQKS4oA6IzYC4C1kQIIBIMWAZEP+F0nAAEECMlAYiQACx4PMzkGoH4unGxsYLZs2aBeenpaUtgKkDCCAmEvyMNQwAAoiJBD9jDQOAAKI4DAACiAlXPKenpzsB8UkgBvMZGRmdgPgkEKOkA4AAYiLBz1jDACCAmEjwM9YwAAggisMAIIAozkwAAUSxAQABBgCBl0L7jJdTdgAAAABJRU5ErkJggg=="
                /> : ""
              }
              <div class="frame" v-show={is_moving.value}></div>
            </div>

          </div>
          
          { is_showMask ? <div class="h-modal-mask" ref={maskDom} ></div> : ""}
          { props.widgetShowMask ? <div class="h-modal-bgMask" ></div> : ""}

      </div>
    )

  }
})