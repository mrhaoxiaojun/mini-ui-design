#!/usr/bin/env node

/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-13 14:20:00 
 * @Details:  生成命令
 * @Last Modified by: haoxiaojun
 * @Last Modified time: 2022-03-03 15:27:10
 */

import { Command } from 'commander'
import { generate } from './generate/generate'
// import { generateDts } from './generate/generate-dts'

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  // 注册 generate 命令
  .command('generate')
  // 添加命令描述
  .description('生成一个组件模板或入口文件')
  // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
  .option('-t --type <type>', `生成类型，可选值：component, lib-entry`)
  // 注册命令回调
  .action(generate)

// program
//   .command('build')
//   .description('打包组件库')
//   .hook('postAction', generateDts)
//   // .action(build)

// 执行命令行参数解析
program.parse()
