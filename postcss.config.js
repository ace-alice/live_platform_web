const autoprefixer = require('autoprefixer')

const px2rem = require('postcss-pxtorem')

const postcss = px2rem({ rootValue: 14.4, unitPrecision: 5, propList: ['*'] })

// noinspection JSValidateTypes
module.exports = {
  plugins: [autoprefixer(), postcss],
}
