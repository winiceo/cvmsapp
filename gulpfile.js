/*
* @Author: dmyang
* @Date:   2015-06-16 15:19:59
* @Last Modified by:   dmyang
* @Last Modified time: 2016-03-28 10:27:11
*/

'use strict';

let gulp = require('gulp')
let manifest=require("gulp-manifest") 
 
let dist = process.cwd() + '/dist'

gulp.task('manifest', function(){
  gulp.src(['dist/*'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
     }))
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', () => {
    let sftp = require('gulp-sftp')

    return gulp.src(dist + '/**')
        .pipe(sftp({
            host: 'www.71an.com',
            remotePath: '/data/app/www/',
            user: 'leven',
            pass: '56os.com'
        }))
})
gulp.task('default', ['manifest','deploy']);

// var gulp = require('gulp'),  
//     argv = require('yargs').argv,
//     fs = require('fs'),
//     fse = require('fs-extra'),
//     path = require('path'),
//     util = require('util');
// var webpack = require("webpack"),  
//     ExtractTextPlugin = require("extract-text-webpack-plugin");

// var isWatch = true;  
// var isProduct = false;  
// var project = 'iwjw-pc';  
// //gulp --product
// gulp.task('default', function() {  
//     isProduct = argv.product;
//     isWatch = !isProduct;

//     console.log('正在处理：' + (isProduct ? '线上' : '本地') + '环境');

//     fse.emptydirSync('./dist');

//     gulp.start('webpack');
// });

// //webpack静态处理
// gulp.task('webpack', function(callback) {  
//     var minfy = [];
//     isProduct && minfy.push(new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         },
//         mangle: {
//             except: ['$', 'm', 'webpackJsonpCallback']
//         }
//     }));
//     //webpack配置文件
//     var config = {
//         watch: isWatch,
//         entry: {
//             index: './index.js'
//             common: [
//                 'jquery',
//                 'understore',
//                 'template',
//                 'store'
//             ]
//         },
//         debug: true,

//         devtool: (isProduct ? false : 'source-map'),

//         output: {
//             path: './dist/',
//             filename: '[name].js',
//             publicPath: ''
//         },

//         resolve: {
//             alias: {
//                 jquery: path.resolve('../global/lib/jquery.js'),
//                 template: path.resolve('../global/lib/template.js'),
//                 understore: path.resolve('../global/lib/underscore.js'),
//                 store: path.resolve('../global/lib/store.js')
//             }
//         },


//         plugins: [
//             new webpack.ProvidePlugin({
//                 $: 'jquery',
//                 jQuery: 'jquery',
//                 template: 'template',
//                 store: 'store',
//                 _: 'understore'
//             }),
//             new webpack.optimize.DedupePlugin(),
//             new ExtractTextPlugin("[name].css"),
//             new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
//         ].concat(minfy),
//         module: {
//             loaders: [{
//                 test: /\.js[x]?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     compact: false
//                 }
//             }, {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues')
//             }, {
//                 test: /\.less$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues!less-loader')
//             }, {
//                 test: /\.scss$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues!sass-loader')
//             }, {
//                 test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
//                 loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
//             }, {
//                 test: /\.html/,
//                 loader: "html-loader"
//             }]
//         }
//     }; 
//     webpack(config, function(err, stats) {
//         console.log(stats.toString());
//     });
// });
// gulp.task('sham', function(){  
//     gulp.src('../global/lib/es5-shim-sham.js').pipe(gulp.dest('./dist'));
// })
