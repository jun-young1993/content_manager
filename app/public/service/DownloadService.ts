
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import PromiseInterface from "../interfaces/PromiseInterface";
import {isEmpty} from "lodash";
import {apiReject, apiResolve} from "../lib/helper/ApiHelper"
const log = require('../lib/Logger');
import {TaskManager} from '../lib/Task/TaskManager';

export class DownloadService extends BaseService{
	constructor(){
		super({
			models : [
				'Media',
				'Content'
			]
		});
	}
	
	
	findMedia(mediaId:string){
		return  new Promise((resolve, reject) => {
			this.getModel('Media')
			.findOne({_id : mediaId},(error:any,media:MediaInterface|null) => {
				if(isEmpty(media)){
					reject(apiReject(`not found media by media_id : ${mediaId}`))
				}
				resolve(apiResolve(media));
			})
		})
		
		
	}
	downloadByMediaId(mediaId:string){
		log.channel("download").info(`[DownloadService][downloadByMediaId][START DOWNLOAD] MEDIA_ID : ${mediaId}`)
		this.findMedia(mediaId)
		.then((resolve) => {
			log.channel("download").info(`[DownloadService][downloadByMediaId][DATA]`,resolve);
			new TaskManager()
			.onlineDownload();
		})
		.catch((reject)=>{
			log.channel("download").info(`[DownloadService][downloadByMediaId][reject]:`,reject)
		})

	}

}