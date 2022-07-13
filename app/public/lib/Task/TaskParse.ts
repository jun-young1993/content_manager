const {Storage} = require("@models/Storage");
const {Media} = require("@models/Media");
const {FileManager} = require("@task/module/FileManager");
import * as path from "path";
export class TaskParse {
	private sourceMediaId;
	private targetMediaId;
	private sourceStoragePath;
	private targetStoragePath;
	private sourceStorageType;
	private targetStorageType;
	private sourceStorage;
	private targetStorage;
	private sourceMedia;
	private targetMedia;
	private module;

	private task;

	constructor(task) {
		console.log('before start task parse');
		this.task = task;
		console.log('start task parse');
		console.log(this);
		// this.storageDb = new Storage();
	}
	async getStorage(code){
		const _this = this;


		const storage = await new Promise((resolve,reject) =>{
			if(code){
				new Storage().db().findOne({code : code},
					(err,storage) => {
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
	async getMedia(mediaId){



		const media = await new Promise((resolve,reject) =>{
			if(mediaId){
				new Media().db().findOne({_id : mediaId},
					(err,media) => {

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
		const modules = {
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
		const moduleParams = {
			source : this.getSource(),
			target : this.targetStoragePath+'/test.png'
		}

		const module = this.getModule();
		this.module = new module(moduleParams);

		return Promise.resolve(this);
	}

}