'use strict';
const {app} = require('easyone-electron');
const {DB, Collections, onReady} = require('../../database');
const {ipcRenderer} = require('electron');

app.on('ready', function(app){
    app.setOptions({
        controllersPath: __dirname+'/controllers',
        modalsPath: __dirname+'/modals'
    });
    app.getDB = function(){
        return DB;
    }
    app.getCollections = function(name){
        if(name) return Collections[name];
        return Collections;
    }
    app.loadStyle('mainStyle', __dirname+'/../../style/main.less');
    app.login = function(user){
        ipcRenderer.send('login', user);
    };
    onReady(function(){
        app.start();
    });
});
