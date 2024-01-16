
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const StyleLintPlugin = require('stylelint-webpack-plugin');

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
    
      fallback: {
        "worker_threads": false ,
        "assert":false,
        "path": require.resolve("path-browserify"),
        "url":false,
        "os": require.resolve("os-browserify/browser"),
        "process": require.resolve("process/browser"),
        "fs": false ,// Set to false if you're not using it
        
          "stream": require.resolve("stream-browserify")
        
        // No need to include 'browserify-module' or 'util' unless specifically required by your project
      },
  
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
  plugins: [
		new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.css',
      failOnError: false,
      quiet: false,
      emitErrors: true // by default this is to true to check the CSS lint errors
  }),
	]
};