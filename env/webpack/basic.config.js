/**
 * Created by chenlei on 2018/5/29.
 */
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'


function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [path.resolve(__dirname, '../../')].concat(args));
}

module.exports = {
    entry: {
        commons: [
            'react',
            'react-dom',
            'antd',
            'redux',
            'react-redux',
            'react-router-dom',
            'react-router',
            'react-router-redux',
            'redux-logger'
        ],
        app: [root('src/index.tsx'),'webpack-hot-middleware/client'],
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'js/[name].[hash].chunk.js',
        path: root('dist'),
        publicPath:'/'
    },
    devtool: 'inline-source-map',
    resolve: {
        modules: [root('src'),root('node_modules')],
        extensions: ['.tsx', '.ts', '.js', 'json','.css','.less'],
        plugins: [new TsconfigPathsPlugin({configFile: root('tsconfig.json')})]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    getCustomTransformers: () => ({
                        before: [ tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: 'css'
                        }) ]
                    })
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },'css-loader']
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [{
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                     }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks:'async'
        },
        runtimeChunk: {
            name: "main",
        },
    },
    plugins: [
        new CleanWebpackPlugin([root('dist')]),
        new webpack.ProvidePlugin({}),
        new HtmLWebpackPlugin({
            template: root('env/templete/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CheckerPlugin(),
        new webpack.HashedModuleIdsPlugin() // 优化缓存
    ]
}
