const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    path: buildPath,
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: path.join(srcPath, 'index.html')
     })
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.jsx?/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000
  }
}
