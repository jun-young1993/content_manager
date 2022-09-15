const Store = require("electron-store");

const {config} = require('../../../config/migration');

const store = new Store();
const {isEmpty} = require('lodash');
if(config){
	const migration = config;
	for(let migrationIndex=0; migrationIndex<migration.length; migrationIndex++){
		const current = migration[migrationIndex];
		const type = current["type"];
		const items = current.items;
		for(let itemIndex=0; itemIndex<items.length; itemIndex++){
			const itemData = items[itemIndex];
			const itemKey = itemData["key"];
			const itemValue = itemData["value"];
			const key = `${type}.${itemKey}`;
			if(isEmpty(store.get(key))){
				store.set(key,itemValue);
			};
		}
	}
}