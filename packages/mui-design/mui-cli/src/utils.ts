/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-07 15:46:09 
 * @Details: 工具类
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-07 15:46:57
 */
import fs from "fs";
import { resolve } from "path";

 /**
 * 遍历获取指定根目录下子目录，并要求子目录包含指定文件的名称
 *
 * @param {string} entryDir
 * @param {string} [fileName="index.ts"]
 * @return {*} 返回数组
 */
export const components = (entryDir: string, fileName:string = "index.ts") => {
  return fs.readdirSync(entryDir).filter((name:string) => {
    const componentDir = resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes(fileName);
  })
}