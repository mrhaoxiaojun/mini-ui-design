#!/usr/bin/env node

/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 14:20:00 
 * @Details:  生成命令
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-07 15:41:43
 */

import { Command } from 'commander'
import { generate } from './generate/generate'
import { generateDts } from './generate/generate-dts'
import { preBuild } from './preBuild'

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  // 注册 generate 命令
  .command('generate')
  // 添加命令描述
  .description('生成一个组件模板或入口文件')
  // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
  .option('-t --type <type>', `生成类型，可选值：component, lib-entry, dts`)
  // 注册命令回调
  .action(generate)

program
  .command('generateDts')
  .description('生成部分tsc生成有问题的.d.ts文件')
  .action(generateDts)

program
.command('preBuild')
.description('构建组件库之前询问')
.action(preBuild)

// 执行命令行参数解析
program.parse()
