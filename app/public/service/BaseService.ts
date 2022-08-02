import {BaseModel} from "../models/BaseModel";
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
}