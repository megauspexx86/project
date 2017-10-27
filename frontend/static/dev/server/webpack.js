var env = require('../../../../common/env/env.json');

var config = require('../shared/env/' + env.env).webpack;

import webpackDevConfig from '../shared/webpack.dev.js';
import StartWebpack from 'napishem-frontend-utils/modules/WebpackLocalStart';

StartWebpack("Partner account", config, webpackDevConfig(config), config.port);
