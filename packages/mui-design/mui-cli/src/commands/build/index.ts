/*
 * @Author: haoxiaojun
 * @Date: 2022-01-29 15:29:21
 * @Details:  构建组件库
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-07 16:31:28
 */

import fsExtra from "fs-extra";
import { buildAll, buildSingle, createPackageJson } from "./build";
import { copyFile, entryDir } from "./constant";
import { components } from "../../utils";

const buildLib = async () => {
  // 全量打包
  await buildAll();
  // 拷贝描述文件
  copyFile.map( v => {fsExtra.copySync(v.src, v.dist)});
  // 循环一个一个组件构建
  for (const name of components(entryDir)) {
    // 构建单组件
    await buildSingle(name);
    // 生成组件的 package.json 文件
    createPackageJson(name);
  }
};

buildLib();
