const {BaseService} = require('@service/BaseService');
export class MediaService extends BaseService{
	constructor(){
		super({
			models : [
				'Content',
				'Media'
			]
		});
	}

	findOriginalByContentId(contentId){
		return this.findTypeByContentId('original',contentId);
	}
	findTypeByContentId(type,contentId){
		return new Promise((resolve, reject) => {
			this.getModel('Media').findOne({content_id : contentId, type : type},(err,media)=>{
				resolve({
					success : true,
					data : media
				})
			})
		})
	}
	findOutByContentId(contentId){
		return this.findTypeByContentId('out',contentId);
	}
}