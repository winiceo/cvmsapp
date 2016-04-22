var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('../../config/helpers');
var __f7Path =  helpers.root('bower_components'); 
var node_modules =  helpers.root('node_modules'); 

var mode = process.env.NODE_ENV;
var lessLoader;

if (mode === 'production') {
  lessLoader = ExtractTextPlugin.extract('css!less');
} else {
  lessLoader = 'style!css!less';
}

module.exports = {
  entry: {
    common: [
      "./src/app/utils/constant.js",
      "./src/app/utils/tool.js",
      "./src/app/utils/xhr.js",
      'framework7','jquery','angular','angular-ui-router'
      
    ],
    app: [ 
      "./src/index.js",
      "./src/app/controllers/base.js"
    ]
     
    //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
   
  },
  output: {
    path:  './dist/',
    contentBase: 'dist/',
    filename: '/[name].bundle.js'
  },
  resolve: {
    alias: {
      'framework7': __f7Path + '/framework7/dist/js/framework7.js',
      'framework7.material.css': __f7Path + '/framework7/dist/css/framework7.material.css',
      'framework7.material.color.css': __f7Path + '/framework7/dist/css/framework7.material.colors.css',
      'jquery': __f7Path + '/jquery/dist/jquery.min.js'
      //'angular':  node_modules + '/angular/angular.min.js',
      //'angular-ui-router': node_modules + '/angular-ui-router/release/angular-ui-router.min.js'
      //  //moment:  __f7Path+"/moment/min/moment-with-locales.min.js"
    }
  },
  externals: {
     
   // framework7:true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: false,
      inject: 'body'
    }),

    new CopyWebpackPlugin([

      { from: './src/page', to: 'page' },
      { from: './src/assets', to: 'assets' },
      //{ from: './bower_components', to: 'bower' }
    ]),
    new ExtractTextPlugin("/style.css", {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract( "style-loader", 'css-loader?sourceMap!less-loader!autoprefixer-loader')},
      {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/ },
      {test: /\.html$/, loader: 'html'},
      {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
      {test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg'},
      {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
    ]
  },
  // configure babel-loader.
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }

};
