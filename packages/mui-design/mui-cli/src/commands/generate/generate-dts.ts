const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
import { red } from 'kolorist'
const entryDir = path.resolve(__dirname, '../../devui')
const outputDir = path.resolve(__dirname, '../../build')

export const generateDts = () => {

  fse.outputFileSync(path.resolve(buildDir, 'index.d.ts'), fileStr, 'utf8')
  generateIndexDts(outputDir)

  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })
  const srcDts = path.resolve(outputDir, 'index.d.ts')

  for(const name of components) {
    const destDts = path.resolve(outputDir, `${name}/index.d.ts`)
    fs.copyFile(srcDts, destDts, (err) => {
      if (err) {
        console.log(red(`拷贝组件${name}的ts类型文件失败！`))
      }
    })
  }
}