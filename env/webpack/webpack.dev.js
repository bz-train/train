/**
 * Created by chenlei on 2018/5/27.
 */
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = require('./basic.config');
module.exports = _.defaultsDeep({
    mode: 'development',
    watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin(),
    ]
},config);
