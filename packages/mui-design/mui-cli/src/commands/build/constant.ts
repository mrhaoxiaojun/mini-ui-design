/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-07 15:19:15 
 * @Details: 构建常量
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-24 10:13:47
 */
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

type BasePath = {
  src: string;
  dist: string;
};

const CWD = process.cwd()
const _path: BasePath = {
  src: CWD,
  dist: resolve(CWD, 'dist')
};

export const entryDir = resolve(__dirname, `${_path.src}/src`);
export const outputDir = resolve(__dirname, _path.dist);

export const copyFile = [
  {
    src: resolve(__dirname, `${_path.src}/package.json`),
    dist: resolve(__dirname, `${_path.dist}/package.json`),
  },
  {
    src: resolve(__dirname, `${_path.src}/README.md`),
    dist: resolve(__dirname, `${_path.dist}/README.md`),
  }
];

export const baseConfig = {
  publicDir: "",
  plugins: [vue(), vueJsx()],
  // 警告：vite2打包出现警告，"@charset" must be the first rule in the file }@charset "UTF-8";
  // 原因：sass编译的时候，因为被编译的文件里有中文，所以会这样，在vite.config.js里面，加一个sass的配置，把charset关掉就行了
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
};

// https://cn.vitejs.dev/guide/build.html#library-mode
export const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  }
};