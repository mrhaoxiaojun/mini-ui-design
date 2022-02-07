/*
 * @Author: haoxiaojun
 * @Date: 2022-01-29 15:29:21
 * @Details:  构建组件库
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-07 14:39:33
 */

import { resolve } from "path";
import fs from "fs";
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import fsExtra from "fs-extra";

type BasePath = {
  src: string;
  dist: string;
};

const _path: BasePath = {
  src: "../../../",
  dist: "../../../dist",
};
const entryDir = resolve(__dirname, `${_path.src}/src`);
const outputDir = resolve(__dirname, _path.dist);
const copyFile = [
  {
    src: resolve(__dirname, `${_path.src}/package.json`),
    dist: resolve(__dirname, `${_path.dist}/package.json`),
  },
  {
    src: resolve(__dirname, `${_path.src}/README.md`),
    dist: resolve(__dirname, `${_path.dist}/README.md`),
  },
];

// 打包基础配置
const baseConfig = {
  publicDir: "",
  plugins: [vue(), vueJsx()],
};

// 排除额外公用的依赖
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

// 生成组件的 package.json 文件
const createPackageJson = (name: string): void => {
  const fileStr = `{
    "name": "${name}",
    "version": "0.0.0",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }`;
  fsExtra.outputFile(
    resolve(outputDir, `${name}/package.json`),
    fileStr,
    "utf-8"
  );
};

// https://cn.vitejs.dev/config/#optimizedeps-entries
// 单组件按需构建
const buildSingle = async (name: string): Promise<void> => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions: {
        ...rollupOptions,
        ...{
          optimizeDeps: {
            entries: resolve(entryDir, name),
          },
        },
      },
      cssCodeSplit: false,
      lib: {
        entry: resolve(entryDir, name),
        name: "muiDesign" + name.replace(/^\S/, (s) => s.toUpperCase()),
        fileName: "index",
        formats: ["es", "umd"],
      },
      outDir: resolve(outputDir, name),
    },
  });
};

//全量构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions: {
        ...rollupOptions,
        ...{
          optimizeDeps: {
            entries: resolve(entryDir, "mui.ts"),
          },
        },
      },
      cssCodeSplit: true,
      lib: {
        entry: resolve(entryDir, "mui.ts"),
        name: "muiDesign",
        fileName: "mui-design",
        formats: ["es", "umd"],
      },
      outDir: outputDir,
    },
  });
};

const buildLib = async () => {
  // 全量打包
  await buildAll();
  // 拷贝描述文件
  copyFile.map((v) => {
    fsExtra.copySync(v.src, v.dist);
  });

  // 打包单个组件，获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes("index.ts");
  });

  // 循环一个一个组件构建
  for (const name of components) {
    // 构建单组件
    await buildSingle(name);

    // 生成组件的 package.json 文件
    createPackageJson(name);
  }
};

buildLib();
