var webpack = require('webpack');
var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

var entryPoint = './src/main.js';
var exportPath = path.resolve(__dirname, './build');
var plugins = [];

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css',
});

plugins.push(extractSass);
plugins.push(new HTMLWebpackPlugin({
    template: './index.html'
}));

// var env = process.env.NODE_ENV;
var env = process.env.WEBPACK_ENV;

if (env === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
          }
    }));
    // plugins.push(
    //   new SWPrecacheWebpackPlugin({
    //      cacheId: 'weather',
    //      dontCacheBustUrlsMatching: /\.\w{8}\./,
    //      filename: 'service-worker.js',
    //      minify: true,
    //      navigateFallback: '/index.html',
    //      staticFileGlobs: './build/**/*.{js,html,css}',
    //      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //    })
    // );

}

module.exports = {
    entry: {
        main: entryPoint,
    },
    output: {
        filename: '[name].js',
        path: exportPath
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: extractSass.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js',
            'vue-resource$': 'vue-resource/dist/vue-resource.es2015.js',
            'moment$': 'moment/moment.js'
        }
    },
    plugins
};
