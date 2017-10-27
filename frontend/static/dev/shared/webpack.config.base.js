
var webpack = require('webpack');
var path  = require('path');

module.exports = {

    context: path.resolve(__dirname, '..'),

    resolve: {
        root: [path.resolve(__dirname + '/../node_modules')],
    },

    resolveLoader: {
        modulesDirectories: [path.resolve(__dirname + '/../node_modules')]
    },

    module: {

        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ["babel-loader", "babel"],
                include: [
                    path.join(__dirname, './'),
                    path.join(__dirname, '/../components'),
                    path.join(__dirname, '/../actions'),
                    path.join(__dirname, '/../stores'),
                    path.join(__dirname, '/../index.js'),
                    path.join(__dirname, '/../shared'),

                    path.join(__dirname, '../../../../account/static/frontend/common'),
                    path.join(__dirname, '../../../../account/static/frontend/common/components'),
                    path.join(__dirname, '../../../../account/static/frontend/common/actions'),
                    path.join(__dirname, '../../../../account/static/frontend/common/stores'),
                    path.join(__dirname, '../../../../account/static/frontend/common/ui'),
                    
                    path.join(__dirname, '../../../../account/static/frontend/customer/components'),
                    // path.join(__dirname, '../../../../account/static/frontend/customer/components/PopupSuccessWithdraw.js'),
                    path.join(__dirname, '../../../../account/static/frontend/author/components/PopupSuccessWithdraw.js'),
                    // path.join(__dirname, '../../../../account/static/frontend/customer/components/BillPageOutdrawForms.js'),
                    path.join(__dirname, '../../../../account/static/frontend/author/components/PopupNoPurses.js'),
                    path.join(__dirname, '../../../../account/static/frontend/locale/ru_RU.js')
                ],

                exclude: [
                     path.resolve('../dev/node_modules'),
                     path.resolve('../../../../account/static/node_modules')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
