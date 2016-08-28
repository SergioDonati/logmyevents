'use strict';

const {ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = function(appManager){

	let DB_PATH = appManager.getDataFolder();

	ipcMain.on('lokiLoadDatabase', function(event, arg){
		try{
			fs.readFile(path.resolve(DB_PATH, arg.dbName), (err, data) => {
				if(err){
					if (err.code === 'ENOENT') {
						event.sender.send('lokiLoadDatabase-reply', '');
						return;
					}else throw err;
				}
				console.log('Loki DB loaded, path : '+path.resolve(DB_PATH, arg.dbName));
				event.sender.send('lokiLoadDatabase-reply', data.toString());
			});
		}catch(e){
			console.log(e.stack);
		}
	});

	ipcMain.on('lokiStoreDatabase', function(event, arg){
		try{
			fs.writeFile(path.resolve(DB_PATH, arg.dbName), arg.dbString, (err, data) => {
	  			if (err) throw err;
				event.sender.send('lokiStoreDatabase-reply', true);
			});
		}catch(e){
			console.log(e.stack);
		}
	});
}
