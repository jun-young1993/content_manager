
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
				console.log('[find media by content id]',{content_id : contentId, type : type},media)
				if(media){
					resolve({
						success : true,
						data : media
					})
				}else{
					reject({
						success : false,
						data : null,
						err : err
					})
				}
				
			})
		})
	}
	findOutByContentId(contentId:any){
		return this.findTypeByContentId('out',contentId);
	}
	findThumbnailByContentId(contentId:any){
		return this.findTypeByContentId('thumbnail',contentId);
	}
	findProxyByContentId(contentId:any){
		return this.findTypeByContentId('proxy',contentId);
	}
}