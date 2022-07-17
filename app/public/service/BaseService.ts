
export class BaseService{
	private model:any = [];
	
	constructor(property:any){
		// const {Field} = require('../../../public/models/Field')
		property.models.forEach((model) => {
			
			this.model[model] = require('@models/'+model)
		})

	}
	
	getModel(modelName){
		return new this.model[modelName][modelName]().db();
	}
}