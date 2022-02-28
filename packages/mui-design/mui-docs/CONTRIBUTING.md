# Mini Ui Design 贡献指南

你好！ 我们很高兴你有兴趣为 Mini Ui Design 做出贡献。 在提交你的贡献之前，请务必花点时间阅读以下指南：

## 快速上手

Mini Ui Design 使用 `lerna.json` + `yarn` 构建 `monorepo` 仓库，你应该使用 [yarn](https://yarn.bootcss.com/) 包管理器，以确保不会因为包管理器的不同而引发异常

如果你想参与 `Mini Ui Design` 的开发或者测试：

1、点击Github右上角的Fork按钮，将仓库Fork仓库到个人空间   
2、Clone个人空间项目到本地：`git clone https://github.com/mrhaoxiaojun/mini-ui-design.git`   
3、在 mini-ui-design 的根目录下运行`yarn i`, 安装node依赖    
4、进入 `packages/mui-design` 目录下，运行 `yarn dev`(运行前请先[生成入口文件](#生产入口文件))，这个脚本将会启动 `vitepress` 和组件库的开发环境下构建    
5、使用浏览器访问：http://localhost:3000    

```bash
git clone https://github.com/mrhaoxiaojun/mini-ui-design.git
cd mini-ui-design
yarn i
cd packages/mui-design && yarn dev
```

## 生产入口文件

::: warning 重要提示 
Mini Ui Design 为了避免高频修改文件冲突及代码的风格一致性,将入口文件进行自动化生成  
入口文件必须在执行提前生成，我们将以下2个入口文件通过.gitignore忽略了
:::

1、进入mui-design目录   
2、执行yarn cli:generate 命令  选择lib-entry类型

操作如下
```bash
$ cd packages/mui-design
$ yarn cli:generate
yarn run v1.22.17
$ node --loader ts-node/esm ./mui-cli/src/commands/generate/bin.ts generate
(node:11892) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
? （必填）请选择生成类型： lib-entry
Generate lib-entry file.
---------------------------
已生成菜单文件：E:\xxx-git\packages\mui-design\mui-docs\.vitepress\config\sidebar.ts
已生成入口文件：E:\xxx-git\packages\mui-design\src\mian.ts
Done in 24.90s.

```

生成结束，即可启动服务了
## 生产新组件模板

::: tip 重要提示 
Mini Ui Design 为了避免高频修改文件冲突及代码的风格和工程的一致性,将自动化生成符合标准的文件嵌套关系、命名等规范的新组建模板文件夹

如果需要开发新组件，请严格按照以下步骤进行生成

生成的新组件的同时生成入口，所以不需要再去生成入口了
:::

1、进入mui-design目录   
2、执行yarn cli:generate 命令  
> * 选择component类型  
> * 输入组件 name  
> * 输入组件中文名称  
> * 选择组件分类  

```bash
$ cd packages/mui-design
$ yarn cli:generate
yarn run v1.22.17
$ node --loader ts-node/esm ./mui-cli/src/commands/generate/bin.ts generate
(node:19396) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
? （必填）请选择生成类型： component
? （必填）请输入组件 name ，将用作目录及文件名(自动化驼峰转换名称)： button
? （必填）请输入组件中文名称，将用作文档列表显示： 测试按钮
? （必填）请选择组件分类，将用作文档列表分类： 通用
Generate new components.
---------------------------
已生成新组件：Button
组件文件地址：E:\xxx-git\packages\mui-design\src\button
markdown地址：E:\xxx-git\packages\mui-design\mui-docs\components\button
Generate lib-entry file.
---------------------------
已生成菜单文件：E:\xxx-git\packages\mui-design\mui-docs\.vitepress\config\sidebar.ts
已生成入口文件：E:\xxx-git\packages\mui-design\src\mian.ts
Done in 114.66s.
```
一个新的组件模板生成完毕，路由和入口等已经配置并生成完成，大家关注组件内部的UI设计和开发即可

## 参与贡献

Mini Ui Design 是一个多人合作的开源项目，为了避免多人同时开发同一个组件/功能，请先在 [issues 列表-待释放](https://github.com/mrhaoxiaojun/mini-ui-design/issues) 中选择自己感兴趣的任务，在评论区认领

1、请确保你已经完成快速上手中的步骤，并且正常访问 http://localhost:3000   
2、创建新分支 `git checkout -b username/feature1`，分支名字建议为`username/feat-xxx`/`username/fix-xxx`    
3、本地编码   
4、遵循 [Commit Message Format](xxx) 进行提交（**不符合规范的提交将不会被合并到dev分支**）---提交规则待开发更新     
5、提交到远程仓库，也就是Fork 后的仓库，`git push origin branchName`   
6、(可选) 同步上游仓库dev分支最新代码，`git pull upstream dev`    
7、打开上游仓库提交[PR](https://github.com/mrhaoxiaojun/mini-ui-design/pulls)

> 如果涉及新组件或组件的新特性，则需要：

9、完善组件中英文文档   
10、完善组件的单元测试    
11、完成组件   
12、仓库管理员进行Code Review，并提出意见   
13、PR 发起人根据意见调整代码（一个分支发起了PR后，后续的commit会自动同步，不需要重新PR）    
14、仓库管理员合并PR    
15、贡献流程结束，感谢你的贡献    
