
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

	findOutByContentId(contentId){
		return new Promise((resolve, reject) => {
			this.getModel('Media').findOne({content_id : contentId, type : 'out'},(err,media)=>{
				resolve({
					success : true,
					data : media
				})
			})
		})
	}
}

const media = new mediaService();


console.log(require('../../../public/models/'+'Content'))
console.log(media.findOutByContentId('qVci79SkN042Wqrn').then((resolve) => console.log(resolve)));