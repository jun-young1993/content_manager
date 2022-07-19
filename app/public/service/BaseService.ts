
export class BaseService{
	private model:any = [];
	
	constructor(property:any){
		
		property.models.forEach((model:any) => {
			
			// @ts-ignore
			
			this.model[model] = require('../models/'+model)
		})

	}
	
	getModel(modelName:any){
			// @ts-ignore
		return new this.model[modelName][modelName]().db();
	}
}