const {Storage} = require("../../models/Storage");
const {Media} = require("../../models/Media");
const {FileManager} = require("./module/FileManager");
import * as path from "path";
export class TaskParse {
	private sourceMediaId : any = null;
	private targetMediaId : any = null;
	private sourceStoragePath : any = null;
	private targetStoragePath : any = null;
	private sourceStorageType : any = null;
	private targetStorageType : any = null;
	private sourceStorage : any = null;
	private targetStorage : any = null;
	private sourceMedia : any = null;
	private targetMedia : any = null;
	private module : any = null;

	private task : any = null;

	constructor(task:any) {
		console.log('before start task parse');
		this.task = task;
		console.log('start task parse');
		console.log(this);
		// this.storageDb = new Storage();
	}
	async getStorage(code:any){
		const _this = this;


		const storage = await new Promise((resolve,reject) =>{
			if(code){
				new Storage().db().findOne({code : code},
					(err:any,storage:any) => {
						console.log(code)
						console.log(err);
						console.log(storage);
						if(storage){
							console.log('get storage',storage);
							resolve(storage);
						}else{
							resolve(null);
						}

					})
			}else{
				resolve(null);
			}

		})
		return storage;
	};
	async getMedia(mediaId:any){



		const media = await new Promise((resolve,reject) =>{
			if(mediaId){
				new Media().db().findOne({_id : mediaId},
					(err:any,media:any) => {

						if(media){

							resolve(media);
						}else{
							resolve(null);
						}

					})
			}else{
				resolve(null);
			}

		})
		return media;
	};
	async getSourceStorage(){

		const result = await this.getStorage(this.task.source_storage);
		return result;

	}
	async getTargetStorage(){

		const result = await this.getStorage(this.task.target_storage);
		return result;

	}
	async getSourceMedia(){

		const result = await this.getMedia(this.task.source_media_id);
		return result;

	}
	async getTargetMedia(){

		const result = await this.getMedia(this.task.target_media_id);
		return result;

	}
	getModule(){
		const type = this.task.type;
		const modules: any = {
			fs : FileManager
		};

		return modules[type]
	}
	getSourceDir(){

		return path.dirname(this.sourceMedia.path);


	}
	getSourceBasenaem(){
		return path.basename(this.sourceMedia.path);
	}
	getSourceExtention(){
		return path.extname(this.sourceMedia.path);
	}
	getSource(){
		if(this.sourceMedia){
			if(this.sourceMedia.type === 'out'){
				// 밖에서 들어온 미디어는 풆경로
				return this.sourceMedia.path;
			}
		}

		return path.resolve(this.getSourceDir(),this.getSourceBasenaem()+this.getSourceExtention())
	}




	async getTaskParse(){
		const task = this.task;

		// base parsing

		this.sourceMedia = await this.getSourceMedia();
		this.targetMedia = await this.getTargetMedia();

		this.sourceStorage = await this.getSourceStorage();
		this.targetStorage = await this.getTargetStorage();
		this.sourceStoragePath = this.sourceStorage ? this.sourceStorage.path : null;
		this.sourceStorageType = this.sourceStorage ? this.sourceStorage.type : null;
		this.targetStoragePath = this.targetStorage ? this.targetStorage.path : null;
		this.targetStorageType = this.targetStorage ? this.targetStorage.type : null;

		// console.log('last dis',this);
		const moduleParams:any = {
			source : this.getSource(),
			target : this.targetStoragePath+'/'+path.basename(this.getSource())
		}

		const module = this.getModule();
		this.module = new module(moduleParams);

		return Promise.resolve(this);
	}

}