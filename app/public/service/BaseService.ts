
export class BaseService{
	private model:any = [];
	
	constructor(property:any){
		
		property.models.forEach((model:any) => {
			
			// @ts-ignore
			const modelClass = require('../models/'+model)[model];
			// @ts-ignore
			this.model[model] = new modelClass().db();
		})

	}
	
	getModel(modelName:any){

			// @ts-ignore
		return this.model[modelName];
	}
}