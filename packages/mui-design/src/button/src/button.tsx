import { defineComponent, getCurrentInstance } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
import './button.scss'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  emits: [],
  setup(props: ButtonProps, ctx) {
    const _mLang  = getCurrentInstance()?.appContext.config.globalProperties._mLang
    console.log(1111111,_mLang.fail)
    return () => {
      return (<div class="mui-button">{_mLang.fail}</div>)
    }
  }
})
