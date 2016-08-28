'use strict';

const DB = require('./lokiDb');

module.exports.DB = DB;

module.exports.Collections = {};
module.exports.Collections.Users = require('./collections/users');
module.exports.Collections.Events = require('./collections/events');
module.exports.Collections.Tags = require('./collections/tags');

let ready = false;
let listeners = new Set();

module.exports.onReady = function(listener){
	if (ready) listener(DB);
	else listeners.add(listener);
};

// Register user after login
module.exports.setUser = function(user){
    let set = function (){
        module.exports.Collections.Events.setUser(user);
		module.exports.Collections.Tags.setUser(user);
    }
    if (ready) set();
    else listeners.add(set);
}

DB.loadDatabase({}, function(result){
	module.exports.Collections.Users.init();
	module.exports.Collections.Events.init();
	module.exports.Collections.Tags.init();
	ready = true;
	for (let listener of listeners) listener(DB);
	listeners.clear();
});
