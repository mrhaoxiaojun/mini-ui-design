/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-07 15:19:51 
 * @Details:  构建执行函数
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-23 15:37:43
 */
import { resolve } from "path";
import { build } from "vite";
import fsExtra from "fs-extra";
import { baseConfig, entryDir, outputDir, rollupOptions } from "./constant";
import { COMPONENT_LIBRARY_MAIN_FILE_NAME, COMPONENT_LIBRARY_PREFIX } from "../../_config/common";

// 生成组件的 package.json 文件
export const createPackageJson = (name: string): void => {
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

// 单组件构建
// 打包入口无法按照lib的entry进行打包，因此参考官网：https://cn.vitejs.dev/config/#optimizedeps-entries
export const buildSingle = async (name: string): Promise<void> => {
  let entries =resolve(entryDir, name)
  await build({
    ...baseConfig,
    build: {
      rollupOptions: {
        ...rollupOptions,
        ...{
          optimizeDeps: {
            entries
          },
        },
      },
      cssCodeSplit: false,
      lib: {
        entry: entries,
        name: `${COMPONENT_LIBRARY_PREFIX}Design` + name.replace(/^\S/, (s) => s.toUpperCase()),
        fileName: "index",
        formats: ["es", "umd"],
      },
      outDir: resolve(outputDir, name),
    },
  });
};

//全量构建
export const buildAll = async () => {
  let entries = resolve(entryDir, COMPONENT_LIBRARY_MAIN_FILE_NAME)
  await build({
    ...baseConfig,
    build: {
      rollupOptions: {
        ...rollupOptions,
        ...{
          optimizeDeps: {
            entries
          },
        }
      },
      cssCodeSplit: true,
      lib: {
        entry: entries,
        name: `${COMPONENT_LIBRARY_PREFIX}Design`,
        fileName: `${COMPONENT_LIBRARY_PREFIX}-design`,
        formats: ["es", "umd"],
      },
      outDir: outputDir,
    }
  });
};