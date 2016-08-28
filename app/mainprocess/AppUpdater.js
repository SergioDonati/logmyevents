'use strict';

const { app, autoUpdater, BrowserWindow } = require("electron");
const os = require("os");

const UPDATE_SERVER_HOST = "sertle.software"

module.exports = class AppUpdater {
	constructor(appManager) {

		if (os.platform() !== "darwin") return;

		const version = app.getVersion()
		autoUpdater.addListener("update-available", (event) => {
			console.log("A new update is available")
		});
		autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
			console.log("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`);
		});
		autoUpdater.addListener("error", (error) => {
			console.warn(error)
		});
		autoUpdater.addListener("checking-for-update", (event) => {
			console.log("checking-for-update")
		});
		autoUpdater.addListener("update-not-available", () => {
			console.log("update-not-available")
		});
		autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/${version}`);
	}

	checkForUpdates(){
		autoUpdater.checkForUpdates();
	}

	on(eventName, listener){
		autoUpdater.addListener(eventName, listener);
	}

}
