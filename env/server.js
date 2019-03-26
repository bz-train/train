/**
 * Created by chenlei on 2018/5/29.
 */
const express = require('express');
const webpack = require('webpack');
const DevMiddleware = require('webpack-dev-middleware');
const HotMiddleware = require('webpack-hot-middleware');
const ProxyMiddleware = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const app = express();
const config = require('./webpack/webpack.dev');
const pkg = require('../package.json');
const proxyOptions = {
    target: pkg.proxy,
    ws: true,
    pathRewrite: {
        '^/rest' : '/api',     // rewrite path
    },
    router: {
        'localhost:8080' : 'http://localhost:3030'
    }
};

const compiler = webpack(config);

app.use(DevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
        writeToDisk:true
    }
}));

app.use(HotMiddleware(compiler, {
    heartbeat: 2000
}));

app.use(history());

app.use('/rest',ProxyMiddleware(proxyOptions));

app.get('*', (req, res) => {
    res.writeHead(302, {
        Location: `//localhost:8080/`
    });
    res.end();
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!\n');
});
