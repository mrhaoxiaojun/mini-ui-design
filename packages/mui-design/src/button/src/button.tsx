import { defineComponent } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
import './button.scss'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  emits: [],
  setup(props: ButtonProps, ctx) {
    return () => {
      return (<div class="mui-button"></div>)
    }
  }
})
