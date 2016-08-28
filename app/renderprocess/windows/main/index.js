'use strict';
const {app} = require('easyone-electron');
const {DB, Collections, onReady, setUser} = require('../../database');
const {ipcRenderer, remote} = require('electron');

if(process.env.NODE_ENV == 'development'){
	//require('devtron').install();
}

let user = remote.getCurrentWindow().user;
setUser(user);

app.on('ready', function(app){
    app.setOptions({
        controllersPath: __dirname+'/controllers',
        modalsPath: __dirname+'/modals',
		container_id: 'body'
    });
    app.setProperty('user', user);
    app.getDB = function(){
        return DB;
    }
    app.getCollections = function(name){
        if(name) return Collections[name];
        return Collections;
    }
    app.loadStyle('mainStyle', __dirname+'/../../style/main.less');
	app.loadStyle('templateStyle', __dirname+'/style.less');
    app.logout = function(){
        ipcRenderer.send('logout', user);
    };
    onReady(function(){
		app.start();
    });
});

function clearActiveLink(){
	try{
		let links = document.querySelectorAll('#main-header nav a');
		for (let l of links) {
			l.classList.remove('active');
		}
	}catch(e){
		console.error(e);
	}
}

function activateNavLink(link){
	clearActiveLink();
	link.classList.add('active');
}

function addNavListener(name, listener){
	try{
		let navLink = document.querySelector('#main-header nav a[href="#'+name+'"]');
		navLink.addEventListener('click', function(e){
			e.preventDefault();
			if(navLink.classList.contains('active')) return; // just active
			activateNavLink(navLink);
			listener();
		}, true);
	}catch(e){
		console.error(e.stack);
	}
}

addNavListener('dashboard', function(){
	app.controllerManager.startNew('dashboard');
});

app.controllerManager.on('changed', function(controllerManager, controller){
	clearActiveLink();
	if(controller.name == 'dashhome'){
		let dashLink = document.querySelector('#main-header nav a[href="#dashboard"]');
		if (dashLink) dashLink.classList.add('active');
	}
});

document.getElementById("window-min-btn").addEventListener("click", function (e) {
   var window = remote.getCurrentWindow();
   window.minimize();
});

document.getElementById("window-max-btn").addEventListener("click", function (e) {
   var window = remote.getCurrentWindow();
   if (!window.isMaximized()) {
       window.maximize();
   } else {
       window.unmaximize();
   }
});

document.getElementById("window-close-btn").addEventListener("click", function (e) {
   var window = remote.getCurrentWindow();
   window.close();
});
