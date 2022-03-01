# Mini UI Design

Mini UI Design 是 Vue3 版本的 UI 组件库，基于各家开源项目的思想而实现，`灵活`、`至简`

> 设计价值在于，可以开源给有需要组件库的小伙伴进行二次开发，同样也希望小伙伴参与进来，欢迎pr


## 项目状态

该项目还处于孵化和演进阶段，欢迎大家参与到 Mini UI Design 项目的建设中来！

通过参与你可以学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术

* 基于Vue 3 + Typescript + Vite + Sass技术的基础组件库工程
* 基于Vitepress + vitepress-theme-demoblock技术的文档系统
* 基于jest + @vue/test-utils的单元测试

[贡献指南](https://github.com/mrhaoxiaojun/mini-ui-design/blob/master/packages/mui-design/mui-docs/CONTRIBUTING.md)

## 项目实现

* 实现可视化文档系统
* 实现可按需加载的组件库系统
* 实现Mini Cli工具进行自动化拉取

## 项目支持

* 支持命令自动化创建md格式文档入口
* 支持命令自动化创建md格式带有模板的组件文档
* 支持命令自动化创建组件入口文件
* 支持命令自动化创建一个新增组件的模板，并为其完成注册

## 目录结构

```
--mui-cli   // 命令工具包，提供自动化生成入口及打包等脚本工具
  --...
--mui-docs  // 组件库的可视化Demo演示系统
  --...
--src 
  --_config   // 全局配置
  --_i18n     // 国际化
  --_style    // 全局style
  --_utils    // 工具类
  --main.ts   // 组件入口文件
  --......    // 若干组件
--dist        // 将会是生成的组件库
tsconfig.json      // ts语法的配置文件
.eslintrc          // es语法检查配置
.npmignore         // npm发布忽略文件
.jest.config.js    // 单元测试配置文件
LICENSE            //License文件
package.json       // 配置文件
README.md          // 项目说明
```
## 技术栈

* 编程语言：TypeScript 4.x + JavaScript
* 构建工具：Vite 2.x
* 前端框架：Vue 3.x
* CSS 预编译：Sass
* Git Hook 工具：husky + lint-staged(待实现)
* 代码规范：EditorConfig + Prettier + ESLint + Airbnb JavaScript Style Guide (待实现)
* 提交规范：Commitizen + Commitlint (待实现)
* 单元测试：vue-test-utils + jest
* 自动部署：GitHub Actions(待实现)

## Usage Mini UI Design

[Mini UI Design 快速开始](https://github.com/mrhaoxiaojun/mini-ui-design/blob/master/packages/mui-design/mui-docs/start.md)

## License
[MIT](https://github.com/mrhaoxiaojun/mini-ui-design/blob/master/LICENSE)