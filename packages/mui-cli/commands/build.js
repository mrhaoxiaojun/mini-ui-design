const path = require("path");
const fs = require("fs");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const fsExtra = require("fs-extra");

// 路径处理
const _path = {
  src:'../../mui-design',
  dist:'../../mui-design/dist-ui'
}
console.log(121)
const entryDir = path.resolve(__dirname, `${_path.src}/src-ui`);
const outputDir = path.resolve(__dirname, _path.dist);
const copyFile = [
  {
    src:path.resolve(__dirname, `${_path.src}/package.json`),
    dist:path.resolve(__dirname, `${_path.dist}/package.json`)
  },
  {
    src:path.resolve(__dirname, `${_path.src}/README.md`),
    dist:path.resolve(__dirname, `${_path.dist}/README.md`)
  },
]

// 打包基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

// 排除额外公用的依赖
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

// 生成组件的 package.json 文件
const createPackageJson = (name) => {
  const fileStr = `{
    "name": "${name}",
    "version": "0.0.0",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }`;
  fsExtra.outputFile(
    path.resolve(outputDir, `${name}/package.json`),
    fileStr,
    "utf-8"
  );
};


// 单组件按需构建
const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, name),
          name: "index",
          fileName: "index",
          formats: ["es", "umd"],
        },
        outDir: path.resolve(outputDir, name),
      },
    })
  );
};

//全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, "index.ts"),
          name: "mui-design",
          fileName: "mui-design",
          formats: ["es", "umd"],
        },
        outDir: outputDir,
      },
    })
  );
};

const buildLib = async () => {
  // 全量打包
  await buildAll();
  // 拷贝描述文件
  copyFile.map(v=>{
    fsExtra.copySync(v.src, v.dist)
  })
  
  // 打包单个组件
  // 获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes("index.ts");
  });

  // 循环一个一个组件构建
  for (const name of components) {
    // 构建单组件
    await buildSingle(name);

    // 生成组件的 package.json 文件
    createPackageJson(name);
  }
};

buildLib();

