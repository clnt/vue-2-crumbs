path = require('path')

module.exports = {
  entry: './src/breadcrumbComponent.js',
  output: {
    library: 'Vue2Crumbs',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
