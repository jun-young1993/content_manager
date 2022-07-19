
class baseService{
	private model:any = [];
	
	constructor(property:any){
		// const {Field} = require('../../../public/models/Field')
		property.models.forEach((model) => {
			
			this.model[model] = require('../../../public/models/'+model)
		})

	}
	
	getModel(modelName){
		return new this.model[modelName][modelName]().db();
	}
}

class mediaService extends baseService{
	constructor(){
		super({
			models : [
				'Content',
				'Media'
			]
		});
	}

	findOriginalByContentId(contentId){
		this.getModel('Media').findOne({content_id : contentId, type : 'original'},(err,media)=>{
			return {
				success : true,
				data : media
			}
		})
	}

	findOutByContentId(contentId:any){
		return new Promise((resolve, reject) => {
			this.getModel('Media').findOne({content_id : contentId, type : 'out'},(err:any,media:any)=>{
				resolve({
					success : true,
					data : media
				})
			})
		})
	}
}

const media = new mediaService();


