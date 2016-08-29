'use strict';

const DB = require('../lokiDb');
const Model = require('../lokiModel');
const Collection = require('../lokiCollection');

let tagModel = new Model({
	ownerRef: {
		type: Number,
		require: true
	},
	name: {
		type: String,
		trim: true,
		require: true
	},
	description: String,
	creationTime: {
		type: Date,
		default: 'now'
	},
	color: String
});

class TagsCollection extends Collection{
	get collectionName(){ return 'events'; }
	get collectionOptions(){ return { /*autoupdate: true*/ }; }

	getAll(){
		return this.find({ownerRef: this.user.$loki});
	}

	count(){
		return this._collection.count({});
	}

	search(options){
		options = options || {};
		let limit = options.limit || 20;
		let page = options.page || 0;
		let simpleSort = options.simpleSort || 'name';
		let offset = options.offset || (limit * page);
		let countOption = options.count || false;
		let query = { '$and': [{ownerRef: this.user.$loki }] };
        if (options.name) query.$and.push({ 'name': { '$regex': [options.name, 'i'] } });
		let events = this._collection.chain().find(query).simplesort(simpleSort)
			.offset(offset)
          	.limit(limit).data();
		let count;
		if(countOption) count = this._collection.count(query);
		return {
			events: events,
			count: count,
			offset: offset,
			limit: limit
		}
	}

    setUser(user){
        this._user = user;
    }

    get user(){ return this._user; }
}

module.exports = new TagsCollection(DB, tagModel);
