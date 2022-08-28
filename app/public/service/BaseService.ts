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

	formatIndexParams(params = {}){
		const newParams = {};

		if(params['start_date'] && params['end_date']){
			const startDate = new Date(
				new Date(params['start_date']).getFullYear(),
				new Date(params['start_date']).getMonth(),
				new Date(params['start_date']).getDate(),
			);
			console.log('조건')
			const endDate = new Date(
				new Date(params['end_date']).getFullYear(),
				new Date(params['end_date']).getMonth(),
				new Date(params['end_date']).getDate(),
				23,59,59
			);
			newParams['createdAt'] = {$gt : startDate,$lt : endDate};

		}

		for (const property in params) {
			if(property == 'start_date' || property == 'end_date'){
				continue
			}


		}

		return newParams;
	}
}