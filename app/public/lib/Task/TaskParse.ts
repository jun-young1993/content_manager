const {Storage} = require("../../models/Storage");
const {Media} = require("../../models/Media");
const {Task} = require("../../models/Task");
const {Module} = require("../../models/Module");
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
	private moduleInfo : any = null;

	private task : any = null;

	constructor(task:any) {
		console.log('before start task parse');

		this.task = task;
		
		
		// task.module_id;

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











	async getModuleInfo(){

		const _this = this;

		const module = await new Promise((resolve,reject) =>{
			console.log('getModuleInfo', _this.task.module_id);
			if(_this.task.module_id){
				new Module().db().findOne({_id : _this.task.module_id},
					(err:any,module:any) => {
						
						if(module){

							resolve(module);
						}else{
							resolve(null);
						}

					})
			}else{
				resolve(null);
			}

		})
		return module;
	};

	async setMedia(org){

		const media = await new Promise((resolve,reject) =>{
			
			new Media().db().insert(Object.assign({
				is_media : true
			},org),(err:any, data:any) => {
				resolve(data);
			})
		})
		return media;
		
	}
	async updateTask(){
		const _this = this;
		const task = await new Promise((resolve,reject) =>{
			
			new Task().db().update({_id : _this.task._id},{
				$set : {
					source_media_id : _this.sourceMedia._id,
					target_media_id : _this.targetMedia._id,
					source : _this.sourceMedia.full_path,
					target : _this.targetMedia.full_path
				}
			},(err:any, data:any) => {
				if(data){
					new Task().db().findOne({_id : _this.task._id},(err:any , taskData:any) => {
						resolve(taskData);
					})
				}
				
				
			})
		});
		return task;
		
	}
	getModule(type){

		const modules: any = {
			fs : FileManager
		};

		return modules[type];
	}
	async getTaskParse(){
		const task = this.task;

		// base parsing
		this.moduleInfo = await this.getModuleInfo();
		console.log('moduleInfo',this.moduleInfo);
		if(this.moduleInfo){
			const targetStorage:any = await this.getStorage(this.moduleInfo.target_storage)
			const sourceStorage:any = await this.getStorage(this.moduleInfo.source_storage)
			let sourceStoragePath = sourceStorage.path;
			const targetStoragePath = targetStorage.path;
			if(this.moduleInfo.source_media){
				sourceStoragePath = '';
			}
			this.sourceMedia = await this.setMedia({
				content_id : this.task.content_id,
				type : this.moduleInfo.source_media,
				storage : this.moduleInfo.source_storage,
				path : this.task.source,
				full_path : path.resolve(sourceStoragePath,this.task.source)
			})
			console.log('after source media',this.sourceMedia);
			this.targetMedia = await this.setMedia({
				content_id : this.task.content_id,
				type : this.moduleInfo.target_media,
				storage : this.moduleInfo.target_storage,
				path : this.task._id+path.extname(this.task.source),
				full_path : path.resolve(targetStoragePath,this.task._id+path.extname(this.task.source))
			})
			console.log('after source media',this.targetMedia);
			const newTask = await this.updateTask();
			console.log('new Task',newTask);
			
			
			const taskType = this.moduleInfo.task_type;
			const [moduleTypeCode , moduleTypeMethod] = taskType.split('_');
			
			const module = this.getModule(moduleTypeCode.toLowerCase());
			
			
			this.module = new module(newTask);
			this.module[moduleTypeMethod.toLowerCase()]();
			
			return Promise.resolve(this);
		}

		return Promise.reject(null);
		
	}

}