/*
 * @Author: haoxiaojun 
 * @Date: 2022-01-14 20:12:20 
 * @Details: vite配置文件，这个配置文件是为vitepress服务的用于构建docs下的markdown文件
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-01-23 15:17:31
 */
import { defineConfig } from 'vite'
// 同样我们希望他支持tsx语法
import vueJsx from '@vitejs/plugin-vue-jsx'

// 根据对各大组件库的做法来看，tsx更适合写较为复杂强的组件库，all in ts，将内容return要比SFC更加灵活
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx()]
})