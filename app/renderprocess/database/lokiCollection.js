'use strict';

module.exports = class LokiCollection{
	constructor(db, model){
		this._db = db;
		this._model = model;
	}

	initialize(){}

	init(){
		this._collection = this._db.getCollection(this.collectionName);
		if(this._collection) return;
		this._collection = this._db.addCollection(this.collectionName, this.collectionOptions);
		this.initialize();
	}

	get model(){ return this._model; }
	get collection(){ return this._collection; }

	get collectionName(){ return null; }
	get collectionOptions(){ return { }; }

	insert(doc){
		let newDoc = this._model.newDocument(doc);
		newDoc = this._collection.insert(newDoc);
		if(!newDoc) throw new Error('Error while inserting');
		this._db.saveDatabase();
		return newDoc;
	}

	update(doc){
		let lokiId = doc.$loki;
		let meta = doc.meta || {};
		let newDoc = this._model.newDocument(doc);
		newDoc.$loki = lokiId;
		newDoc.meta = meta;
		newDoc = this._collection.update(newDoc);
		if(!newDoc) throw new Error('Error while updating');
		this._db.saveDatabase();
		return newDoc;
	}

	remove(doc){
		return this._collection.remove(doc);
	}

	get(id){
		return this._collection.get(id);
	}

	find(query){
		return this._collection.find(query);
	}
}
