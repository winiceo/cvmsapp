var webpack = require('webpack');
var path = require('path');
 
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var bower_dir = __dirname + '/bower_components';
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');


var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(path);
    },
    entry: {
        common: [
            "./src/app/utils/constant.js",
            "./src/app/utils/tool.js",
            "./src/app/utils/xhr.js" 
            //, 'angular', 'angular-ui-router'

        ],
        app: [
            "./src/index.js",
            "./src/app/controllers/base.js"
        ],
        vendors: ["jquery", "framework7"]
    },
    output: {
        path: './dist/',
        contentBase: 'dist/',
        filename: '/[name].bundle.js'
    },
    module: {
        noParse: [],
        loaders: [
            
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", 'css-loader?sourceMap!less-loader!autoprefixer-loader')
            },
            {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/},
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
    resolve: {
        alias: {}
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
        // This plugin makes a module available as variable in every module
        new webpack.ProvidePlugin({
            framework7: "framework7",
            $: "jquery",
            f7css: "f7css",
            f7colors: "f7colors"
            //,
            // angular1: "angular",
            // 'angular-ui-router': "angular-ui-router"
        }),
        // CommonsChunkPlugin will take the vendors chunk and create a commonly used js file
        new webpack.optimize.CommonsChunkPlugin('vendors', '/vendors.js'),
        new CopyWebpackPlugin([

            {from: './src/page', to: 'page'},
            {from: './src/assets', to: 'assets'},
            //{ from: './bower_components', to: 'bower' }
        ])
        ,new ExtractTextPlugin("/style.css", {
            allChunks: true
        })
   
         

    ],

    // configure babel-loader.
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }

};
 

config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('framework7', bower_dir + '/framework7/dist/js/framework7.js');
config.addVendor('f7css', bower_dir + '/framework7/dist/css/framework7.material.css');
config.addVendor('f7colors', bower_dir + '/framework7/dist/css/framework7.material.colors.css');
// config.addVendor('angular', bower_dir + '/angular/angular.min.js');
// config.addVendor('angular-ui-router', bower_dir + '/angular-ui-router/release/angular-ui-router.min.js');


module.exports = config;

 