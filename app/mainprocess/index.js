'use strict';

if(require('./squirrelStartup')) return;

const AppManager = require('./AppManager');
const easyone = require('easyone-electron');
const path = require('path');

easyone({stylePath: path.resolve('app', 'renderprocess/style')});
let appManager = new AppManager();
appManager.start();
