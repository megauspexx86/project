
var webpack = require('webpack');
var path  = require('path');
var _  = require('lodash');

var base = require('./webpack.config.base');

module.exports = _.merge(base, {

    entry: ['./index.js'], // Файл - входная точка браузерного клиента

    output: {
        path: __dirname + "/../../assets",
        filename: "/bundle.partner.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})
    ]

});
