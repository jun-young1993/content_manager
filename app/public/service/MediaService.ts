
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import {apiReject, apiResolve} from "../lib/helper/ApiHelper";

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
	findByMediaId(mediaId:string){
		return new Promise((resolve, reject) => {
			this.getModel('Media')
			.findOne({_id : mediaId},(error, media:MediaInterface | null) => {
				if(isEmpty(media)){
					reject(apiReject(`not found media by media_id : ${mediaId}`))
				}
				resolve(apiResolve(media));
			})
		})
	}
	findOutByContentId(contentId:any){
		return this.findTypeByContentId('out',contentId);
	}
	findThumbnailByContentId(contentId:any){
		const _this = this;
		return new Promise((resolve ,reject) => {
			_this.getModel("Content").findOne({_id : contentId},(error , content) => {
				if(content.content_type == 'image'){
					resolve(_this.findTypeByContentId('original',contentId));
				}else{
					resolve(_this.findTypeByContentId('thumbnail',contentId));
				}
			})
		})
		
		
	}
	findProxyByContentId(contentId:any){
		return this.findTypeByContentId('proxy',contentId);
	}

}