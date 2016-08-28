'use strict';
const path = require('path');
const {spawn} = require('child_process');
const {app} = require('electron');

const debug = function(str, ...args){
	console.log(str, ...args);
}

const run = function(args, done) {
	var updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
	debug('Spawning `%s` with args `%s`', updateExe, args);
	spawn(updateExe, args, {
		detached: true
	}).on('close', done);
};

const check = function() {
	if (process.platform === 'win32') {
		var cmd = process.argv[1];
		debug('processing squirrel command `%s`', cmd);
		var target = path.basename(process.execPath);

		if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
			run(['--createShortcut=' + target + ''], app.quit);
			return true;
		}
		if (cmd === '--squirrel-uninstall') {
			run(['--removeShortcut=' + target + ''], app.quit);
			return true;
		}
		if (cmd === '--squirrel-obsolete') {
			app.quit();
			return true;
		}
	}
	return false;
};

module.exports = check();
