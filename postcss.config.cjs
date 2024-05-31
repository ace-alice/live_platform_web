/* eslint-disable no-undef */
// import px2rem from 'postcss-pxtorem'

// import postcssPresetEnv from 'postcss-preset-env'

// postcss-import 插件  合并代码
// import postcssImport from 'postcss-import'

// cssnano 插件 压缩，提高代码运行速度
// import cssnano from 'cssnano'

const px2rem = require('postcss-pxtorem')
const postcssImport = require('postcss-import')
const cssnano = require('cssnano')
const postcssPresetEnv = require('postcss-preset-env')

// 将px转化成rem
const postcssPx2rem = px2rem({ rootValue: 14.4, unitPrecision: 5, propList: ['*'] })

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [postcssPresetEnv, postcssPx2rem, postcssImport, cssnano]
}
