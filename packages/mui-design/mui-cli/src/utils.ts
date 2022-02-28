/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-07 15:46:09 
 * @Details: 工具类
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-02-22 15:15:39
 */
import fs from "fs";
import { resolve } from "path";
import { camelCase,upperFirst } from 'lodash'
import { INDEX_FILE_NAME } from "./commands/generate/constant";
import {parse }  from "@babel/parser"
import traverse from "@babel/traverse";


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

/**
 * 大驼峰处理
 * 
 * @param {string} str
 * @return {*} 
 */
 export const bigCamelCase = (str:string) => {
  return upperFirst(camelCase(str))
}

/**
 *  解析文件名及路径
 *
 * @param {*} targetDir
 * @param {*} [ignoreDirs=[]]
 * @return {*} 
 */

 export const resolveDirFilesInfo = (targetDir:string, ignoreDirs:string[] = []) => {
  return fs
    .readdirSync(targetDir)
    .filter(
      (dir) =>
        // 过滤：必须是目录，且不存在与忽略目录内，拥有 INDEX_FILE_NAME
        fs.statSync(resolve(targetDir, dir)).isDirectory() &&
        !ignoreDirs.includes(dir) &&
        fs.existsSync(resolve(targetDir, dir, INDEX_FILE_NAME))
    )
    .map((dir) => ({
      name: bigCamelCase(dir),
      dirname: dir,
      path: resolve(targetDir, dir, INDEX_FILE_NAME)
    }))
}

type ParseComponentInfoParams= {
  name: string;
  dirname: string;
  path: string;
}
type Pro = {
  type:string,
  start:number,
  end:number,
  key:{name:string},
  computed:boolean,
  shorthond:boolean,
  value:{value:string}
}
/**
 * 解析文件为AST格式，再读取AST
 *
 * @param {ParseComponentInfoParams} p
 */
export const parseComponentInfo = (p: ParseComponentInfoParams) => {
  const componentInfo:any = {dirName:p.dirname}
  const indexContent = fs.readFileSync(resolve(p?.path), { encoding: 'utf-8' })
  const ast = parse(indexContent, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  })
  traverse(ast, {
    ExportDefaultDeclaration({node}:{node:any}) {
      if (node.declaration && node.declaration.properties) {
        const properties = node.declaration.properties
        properties.forEach((pro:Pro) => {
          if (pro.type === 'ObjectProperty') {
            componentInfo[pro.key.name] = pro.value.value
          }
        })
      }
    }
  })
  return componentInfo
}