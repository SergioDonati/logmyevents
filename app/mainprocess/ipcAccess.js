'use strict';

const {ipcMain} = require('electron');

module.exports = function(appManager){

	ipcMain.on('login', function(event, user){
		if(!user) return;
		appManager.user = user;
		let oldWindow = appManager.mainWindow;
		appManager.createMainWindow(function(){
			oldWindow.close();
		});
	});

	ipcMain.on('logout', function(event, arg){
		appManager.user = null;
		let oldWindow = appManager.mainWindow;
		appManager.createAccessWindow();
		oldWindow.close();
	});

}
