'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const WebpackBaseConfig = require('./Base')
const globalConfig = require('../global_config')

// let server = globalConfig.devServer
const distCdnServer = globalConfig.distCdnServer

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super()

    this.config = {
      cache: false,
      devtool: 'source-map',
      output: {
        path: __dirname + '/../../dist',
        filename: 'app.js',
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            drop_console: true,
          },
          output: {
            comments: false,
          }
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.ejs',
          jsfilesource: distCdnServer + '/app.js',
          hash: true,
          inject: false
        }),
        new ProgressBarPlugin()
      ],
    }
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist'
  }
}

module.exports = WebpackDistConfig
