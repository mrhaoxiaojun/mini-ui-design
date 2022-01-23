#!/usr/bin/env node
/**
 * 
  命令
  commander 插件提供命令注册、参数解析、执行回调

  交互
  inquirer 插件用于命令行的交互（问答）

  逻辑处理
  fs-extra 插件是对 nodejs 文件 Api 的进一步封装，便于使用
  kolorist 插件用于输出颜色信息进行友好提示
 * **/ 


import { Command } from 'commander'
import { onCreate } from './commands/create'

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  // 注册 create 命令
  .command('create')
  // 添加命令描述
  .description('创建一个组件模板或配置文件')
  // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
  .option('-t --type <type>', `创建类型，可选值：component, lib-entry`)
  // 注册命令回调
  .action(onCreate)

// 执行命令行参数解析
program.parse()
