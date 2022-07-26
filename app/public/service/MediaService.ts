
const {BaseService} = require('../service/BaseService');
export class MediaService extends BaseService{
	constructor(){
		super({
			models : [
				'Content',
				'Media'
			]
		});
	}

	findOriginalByContentId(contentId:any){
		return this.findTypeByContentId('original',contentId);
	}
	findTypeByContentId(type:any,contentId:any){
		return new Promise((resolve, reject) => {
			this.getModel('Media').findOne({content_id : contentId, type : type},(err:any,media:any)=>{
				resolve({
					success : true,
					data : media
				})
			})
		})
	}
	findOutByContentId(contentId:any){
		return this.findTypeByContentId('out',contentId);
	}
	findThumbnailByContentId(contentId:any){
		return this.findTypeByContentId('thumbnail',contentId);
	}
}