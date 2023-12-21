
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 

module.exports = {
  mode:'development',
  devtool: 'inline-source-map',
  // entry: {
  //   main: './src/main.ts',
  //   html: './src/html.ts',
  //   css: './src/css.ts',
  // },
  entry: ['./src/mymodule.ts',],
  output: {
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'myModule',
    libraryTarget: 'amd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // plugins: [
  //   new webpack.DllReferencePlugin({
  //     manifest: require('./dist/vendor_library-manifest.json'),
  //   }),
  // ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     chunks: ['main'],
  //     filename: 'index.html',
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './src/html.html',
  //     chunks: ['html'],
  //     filename: 'html.html',
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './src/css.html',
  //     chunks: ['css'],
  //     filename: 'css.html',
  //   }),
  // ],
};