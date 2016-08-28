'use strict';

const {ipcRenderer} = require('electron');

module.exports = class lokiAdapter{
	loadDatabase(dbname, callback) {

		ipcRenderer.once('lokiLoadDatabase-reply', (event, database) => {
			if(callback) callback(database);
		});

		ipcRenderer.send('lokiLoadDatabase', { dbName: dbname });
	}

	saveDatabase(dbname, dbstring, callback) {
		ipcRenderer.once('lokiStoreDatabase-reply', (event, database) => {
			if(callback) callback(null);
		});

		ipcRenderer.send('lokiStoreDatabase', { dbName: dbname, dbString: dbstring });
	}
}
