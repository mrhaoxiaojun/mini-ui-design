/*
 * @Author: haoxiaojun 
 * @Date: 2022-03-07 11:51:18 
 * @Details:  生成类型文件，弥补tsc对tsx文件解析问题导致类型应用错误问题
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 15:21:20
 */
import { resolve } from "path";
import fsExtra from "fs-extra";
import { bgBlue, lightBlue, lightYellow } from 'kolorist'
import { generateIndexDts } from './templates'
import { components } from "../../utils";

const CWD = process.cwd()
export const entryDir = resolve(__dirname, `${CWD}/src`);
export const outputDir = resolve(__dirname, `${CWD}/types`);

export const generateDts = () => {
  console.log(lightBlue('Generate "types" folder'))
  console.log("---------------------------")
  
  for(const name of components(entryDir)) {
    const destDts = resolve(outputDir, `${name}/src/${name}.d.ts`)
    fsExtra.outputFileSync(destDts, generateIndexDts(), 'utf8')
  }
  console.log(bgBlue(`已生成类型文件：`) + lightYellow(outputDir))
}