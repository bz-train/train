/**
 * Created by chenlei on 2018/5/29.
 */
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const config = require('./basic.config');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports =_.defaultsDeep({
    mode: 'production',
    optimization: {
        minimizer: [
            //new OptimizeCSSAssetsPlugin({})
        ]
    }
},config);