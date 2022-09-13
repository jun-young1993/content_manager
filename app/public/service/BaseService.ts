import {BaseModel} from "../models/BaseModel";
import {isEmpty} from "lodash";
type modelClassName = string;
type models = typeof BaseModel;
interface Models{
	models : modelClassName[]
}
interface Property{
	 model : models[]
}

export class BaseService implements Property{
	model = [];
	
	constructor(property:Models){
		
		property.models.forEach((model:modelClassName) => {
			
			// @ts-ignore
			const modelClass = require('../models/'+model)[model];
			// @ts-ignore
			this.model[model] = new modelClass().db();
		})

	}
	
	getModel(modelName:modelClassName){

			// @ts-ignore
		return this.model[modelName];
	}

	pagenation(model:{skip:Function, limit : Function, count: Function ,query : any, db : any}, page:{size : number , page : number}){
		const size:number = page.size;
		let currentPage:number = page.page * size;
		return new Promise((resolve ,reject) => {
			model.db.count(model.query,(error:any , count:number ) => {
				
				resolve({
					model : model.skip(currentPage).limit(size),
					count : count
				});
			})
			
		})
		

	}

}