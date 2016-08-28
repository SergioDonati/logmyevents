'use strict';

const loki = require('lokijs');
const myAdapter = require('./lokiAdapter');

module.exports = new loki('sandbox.db', {
	autosave: true,
    autosaveInterval: 10000,
    adapter: new myAdapter()
});
