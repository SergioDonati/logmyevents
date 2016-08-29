'use strict';

const DB = require('../lokiDb');
const Model = require('../lokiModel');
const Collection = require('../lokiCollection');

let userModel = new Model({
	username:{
		type: String,
		trim: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	creationTime:{
		type: Date,
		default: 'now'
	},
	img_url: String,
	gender: String,
	birthday: Date
});

class UsersCollection extends Collection{

	get collectionName(){ return 'users'; }
	get collectionOptions(){ return { unique:['username'], /*autoupdate: true*/ }; }

	initialize(){
		this.insert({
			username: 'sergio',
			password: 'prova'
		});
	}

	login(username, password, callback){
		return this.collection.findOne({ '$and': [{username: username}, {password: password}] });
	}
}

module.exports = new UsersCollection(DB, userModel);
