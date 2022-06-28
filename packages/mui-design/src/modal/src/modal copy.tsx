import { defineComponent, ref, reactive ,watch,onMounted,nextTick} from 'vue';
import { modalProps, ModalProps } from './modal-types'
import { on, off } from "./dom";
import './modal.scss'

export default defineComponent({
  name: 'Modal',
  props: modalProps,
  // emits: ["widgetClose","widgetSmall","widgetResize"],
  setup(props: ModalProps, ctx) {

    let widgetSmallShow = ref(false)
    let widgetBigShow = ref(false)
    let widgetNormalShow = ref(true)
    let is_moving = ref(false)
    let is_showMask = ref(false)
    let dragging = ref(false)
    let widgetShow = ref(props.widgetShowProps)
    let widgetSizes = reactive(props.widgetSize)
    let oldLocate = reactive({
      left: 0,
      top: 0,
      width: 0,
      height: 0
    })

    const modalDom = ref()
    const modalDomInner = ref()
    const modalHeader = ref()
    const modalBody = ref()
    const maskDom = ref()

    let moveStartX = ref()
    let moveStartY = ref()
    let startX = ref()
    let startY = ref()
    let targetDiv = ref()
    let frameDiv = ref()
    let headerHeight = ref()
    let targetDivWidth = ref()
    let targetDivHeight = ref()
    
    // 获取content
    const getDom = async (className = "h-modal-widget", attr = "style") : Promise<any> => {
      await nextTick()
      return modalDom.value.getElementsByClassName(className)[0][attr];
    }
    // 记录上一次位置
    const getLocate = async ()=> {
      oldLocate = {
        left: (await getDom()).left,
        top: (await getDom()).top,
        width: (await getDom()).width,
        height: (await getDom()).height
      };
    }
    onMounted(async () => {
      // DOM 元素将在初始渲染后分配给 ref
      console.log(modalDom.value.getElementsByClassName("h-modal-widget")[0]["style"]) // <div>This is a root element</div>
      
      computedSize()
      computedLocate()
    })
    
    
    watch(() => props.widgetShowProps, (newValue, oldValue) => {
      widgetShow.value = newValue
      console.log("widgetShow",widgetShow.value);
    })


    // 关闭
    const widgetClose = () => {
      widgetSmallShow.value = false;
      widgetBigShow.value = false;
      widgetNormalShow.value = false;
      widgetShow.value = false;
      ctx.emit("widgetClose");
    }
    // 最小化
    const widgetSmall= (event:Event)=> {
      getLocate();
      widgetNormalShow.value = false;
      widgetSmallShow.value = true;
      widgetBigShow.value = false;
      ctx.emit("widgetSmall");
    }
    // 最大化
    const widgetBig = async (event:Event)=> {
      getLocate();
      widgetNormalShow.value = false;
      widgetSmallShow.value = false;
      widgetBigShow.value = true;

      let left = null;
      let top = null;
      await nextTick(()=>{
        left = `${Number(document.getElementById(props.getDocLeftdomid)?.offsetWidth) + 10}px`;
        top = `${Number(document.getElementById(props.getDocTopdomid)?.offsetHeight) + 10}px`;
      });

      (await getDom()).left = `${left}px`;
      (await getDom()).top = `${top}px`;
      (await getDom()).width = `${widgetSizes.maxW}px`;
      (await getDom()).height = `${widgetSizes.maxH}px`;
      // h-modal-body 重置最大
      (await getDom("h-modal-body")).height = `${widgetSizes.maxH - 24}px`;
      ctx.emit("widgetResize", {
        event: event,
        data: props.data,
        size: {
          width: (await getDom()).width,
          height: (await getDom()).height
        }
      });
    }
    // 正常化
    const widgetNormal = async (event:Event)=> {
      (await getDom()).left = oldLocate.left;
      (await getDom()).top = oldLocate.top;
      (await getDom()).width = widgetSizes.defaultW = oldLocate.width;
      (await getDom()).height = oldLocate.height;
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
          width: (await getDom()).width,
          height: (await getDom()).height
        }
      });
    }
    
    const handleMoveStart = (event:any)=>{
      dragging.value = true;
      // 鼠标的位置,参照modal左上角
      moveStartX.value = event.clientX - modalDomInner.value.offsetLeft ;
      moveStartY.value = event.clientY - modalDomInner.value.offsetTop;
      on(window, "mousemove", handleMoveMove);
      on(window, "mouseup", handleMoveEnd);
    }
    const handleMoveMove = async (event:any)=> {
      if (!dragging.value) return false;
      maskDom.value.style["pointer-events"] = "all";
      event.preventDefault();
      // 得到鼠标拖动的x,y距离
      let distX = event.clientX - moveStartX.value;
      let distY = event.clientY - moveStartY.value;
      (await getDom()).left = distX + "px";
      (await getDom()).top = distY + "px";
    }
    const handleMoveEnd = async  ()=> {
      dragging.value = false;
      maskDom.value.style["pointer-events"] = "none";
      // 处理上下边界
      if (Number((await getDom()).top.split("p")[0]) <= 0) {
        (await getDom()).top = 0;
      }
      if (Number((await getDom()).top.split("p")[0]) >= document.body.clientHeight) {
        (await getDom()).top = `${document.body.clientHeight - 50}px`;
      }
      off(window, "mousemove", handleMoveMove);
      off(window, "mouseup", handleMoveEnd);
    }
    
    const mousedownResize = async (event:any)=> {
      // await nextTick(async () => {
        targetDiv.value = modalDomInner.value;
        frameDiv.value = event.target.nextElementSibling; // 线框dom
        headerHeight.value = modalHeader.value.offsetHeight; // modal header height
        is_moving.value = true;
        // 配置靠底部，拖拽需要设置top默认值
        if (props.stopDocBottom) {
          (await getDom()).top = `${(await getDom("h-modal-widget","offsetTop"))}px`;
        }
        // 得到点击时该地图容器的宽高：
        targetDivWidth.value = targetDiv.value.offsetWidth;
        targetDivHeight.value = targetDiv.value.offsetHeight;
        // 鼠标的位置
        startX.value = event.clientX;
        startY.value = event.clientY;
        on(window, "mousemove", mousemoveResize);
        on(window, "mouseup", mouseupResize);
      // });
    }
    const mousemoveResize = (event:any)=> {
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
      if (parseInt(frameDiv.value.style.width) <= widgetSizes.minW) {
        frameDiv.value.style.width = widgetSizes.minW + "px";
      }
      if (parseInt(frameDiv.value.style.height) <= widgetSizes.minH) {
        frameDiv.value.style.height = widgetSizes.minH + "px";
      }

      // 最大范围
      // if (parseInt(frameDiv.value.style.width) >= widgetSizes.maxW) {
      //   frameDiv.value.style.width = widgetSizes.maxW + 'px'
      // }
      // if (parseInt(frameDiv.value.style.height) >= widgetSizes.maxH) {
      //   frameDiv.value.style.height = widgetSizes.maxH + 'px'
      // }
    }
    const mouseupResize = (e:Event)=> {
      targetDiv.value.style.width = frameDiv.value.style.width;
      targetDiv.value.style.height = frameDiv.value.style.height;
      modalBody.value.style.height = `${frameDiv.value.offsetHeight - headerHeight.value}px`;

      // resize 事件回调
      ctx.emit("widgetResize", {
        event: event,
        data: props.data,
        size: {
          width: frameDiv.value.style.width,
          height: frameDiv.value.style.height
        }
      });
      is_moving.value = false;
      if (maskDom.value)
        maskDom.value.style["pointer-events"] = "none";
      off(window, "mousemove", mousemoveResize);
      off(window, "mouseup", mouseupResize);
    }
   
    // 初始化计算尺寸
    const computedSize= async ()=> {


      widgetSizes = props.widgetSize;
      widgetSizes.defaultW = widgetSizes.defaultW 
        ? widgetSizes.defaultW 
        : Number(document.getElementById(props.getDocRightdomid)?.offsetWidth) - 20;
      
      (await getDom()).width = `${widgetSizes.defaultW}px`;

      if (widgetSizes.defaultH)
        (await getDom()).height = `${widgetSizes.defaultH}px`;
      widgetSizes.maxW = widgetSizes.maxW
        ? widgetSizes.maxW
        : Number(document.getElementById(props.getDocRightdomid)?.offsetWidth) - 20;
      widgetSizes.maxH = widgetSizes.maxH
        ? widgetSizes.maxH
        : Number(document.getElementById(props.getDocRightdomid)?.offsetHeight) - 60;
      widgetSizes.minW = widgetSizes.minW
        ? widgetSizes.minW
        : 150;
      widgetSizes.minH = widgetSizes.minH
        ? widgetSizes.minH
        : 150;
      getLocate();

    }
    // 初始化位置信息
    const computedLocate = async ()=> {
      if (props.stopWorkspaceLeft) {
        (await getDom()).left = `${Number(document.getElementById(props.getDocLeftdomid)?.offsetWidth) + 5}px`;
      } else {
        (await getDom()).left =
          (Number(document.getElementById(props.getDocRightdomid)?.offsetWidth) - widgetSizes.defaultW) / 2 
            +
            Number(document.getElementById(props.getDocLeftdomid)?.offsetWidth) 
            + "px";
      }
      if (props.stopDocBottom) {
        (await getDom()).bottom = "5px";
      } else {
        (await getDom()).top = `${props.stopDocTop}px`;
      }
    }
   
    // console.log(ctx.slots);
    // ctx.expose({ handleMoveStart });
    return () => (
      // <div class="h-modal-widget-wrap" ref={modalDom} v-show={!widgetSmallShow.value}>
      <div class="h-modal-widget-wrap" ref={modalDom} v-show={widgetShow.value}>
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
                  onMousedown ={mousedownResize}
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