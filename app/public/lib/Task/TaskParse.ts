const {Storage} = require("../../models/Storage");
const {Media} = require("../../models/Media");
const {Task} = require("../../models/Task");
const {Module} = require("../../models/Module");
const {FileManager} = require("./module/FileManager");
const {Transcoder} = require("./module/Transcoder");
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
		

		this.task = task;
		
		
	}
	async getStorage(code:any){
		const _this = this;
	

		const storage = await new Promise((resolve,reject) =>{
			if(code){
				new Storage().db().findOne({code : code},
					(err:any,storage:any) => {
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
	async getMedia2(mediaId:any){



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
	async getMedia(org:any) {
		const mediaDb = new Media().db();
		const media = await new Promise((resolve,reject) => {
			mediaDb.findOne({content_id : org.content_id , type : org.type},(err:any,data:any) => {
				resolve(data);
			})

		})
		return media;
	}
	async setMedia(org:any){
		const mediaDb = new Media().db();
		const media = await new Promise((resolve,reject) =>{
			new Media().db().findOne({content_id : org.content_id , type : org.type},(err:any,data:any) => {
				
				if(data){
					const mediaId = data._id;
					new Media().db().update({_id : mediaId},{$set : org},(err:any, updateData:any) => {
						
						new Media().db().findOne({_id : data._id},(err:any,media:any) => {
							resolve(media);
						})
						
					})
				}else{
					new Media().db().insert(Object.assign({
						is_media : true
					},org),(err:any, insertData:any) => {
						
						new Media().db().findOne({_id : insertData._id},(err:any,media:any) => {
							resolve(media);
						})
					})
				}
			})

		})
		return media;
		
	}
	async updateTask(){
		const _this = this;
		console.log('[update before task]',this.task)
		const task = await new Promise((resolve,reject) =>{
			
			new Task().db().update({_id : _this.task._id},{
				$set : Object.assign(_this.task,{
					source_media_id : _this.sourceMedia._id,
					target_media_id : _this.targetMedia._id,
					source : _this.sourceMedia.path,
					target : _this.targetMedia.path
				})
			},(err:any, data:any) => {
				if(data){
					
					new Task().db().findOne({_id : _this.task._id},(err:any , taskData:any) => {
						console.log('[update after task]',this.task)
						resolve(taskData);
					})
				}
				
				
			})
		});
		return task;
		
	}
	getModule(type:any){

		const modules: any = {
			fs : FileManager,
			transcoder : Transcoder
		};

		return modules[type];
	}

	

	async getTaskParse(){
		const task = this.task;

		// base parsing
		this.moduleInfo = await this.getModuleInfo();
		
		
		if(this.moduleInfo){
			const targetStorage:any = await this.getStorage(this.moduleInfo.target_storage)
			const sourceStorage:any = await this.getStorage(this.moduleInfo.source_storage)
			let sourceStoragePath = sourceStorage.path;
			const targetStoragePath = targetStorage.path;
			
			if(this.moduleInfo.source_media.toLowerCase() == 'out'){
				sourceStoragePath = '';
				this.moduleInfo.source_storage = null;
			}else{
				const sourceMedia:any = await this.getMedia({content_id : this.task.content_id, type : this.moduleInfo.source_media})
				
				if(sourceMedia){
					this.task.source = sourceMedia.path;
					
				}
			}
	
			
			
			this.sourceMedia = await this.setMedia({
				content_id : this.task.content_id,
				type : this.moduleInfo.source_media,
				storage : this.moduleInfo.source_storage,
				path : this.task.source,
				full_path : path.resolve(sourceStoragePath,this.task.source)
			})

			const taskType = this.moduleInfo.task_type;
			const [moduleTypeCode , moduleTypeMethod] = taskType.split('_');
			console.log('[moduleTypeCode]',moduleTypeCode)
			console.log('[moduleTypeMethod]',moduleTypeMethod)

			let ext = path.extname(this.task.source);
			if(moduleTypeMethod.toLowerCase() == 'thumbnail'){
				ext = '.png';
			}
			
			this.targetMedia = await this.setMedia({
				content_id : this.task.content_id,
				type : this.moduleInfo.target_media,
				storage : this.moduleInfo.target_storage,
				path : this.task._id+path.extname(this.task.source),
				full_path : path.resolve(targetStoragePath,this.task._id+ext)
			})

			
			
			
			const newTask = await this.updateTask();
			
			
			
	
			const module = this.getModule(moduleTypeCode.toLowerCase());
			
			console.log('[this.module]',this.module);
			this.module = new module({
				task : newTask,
				sourceMedia : this.sourceMedia,
				targetMedia : this.targetMedia
			});
			
			

			this.module[moduleTypeMethod.toLowerCase()]();
			
				
			
			
			
			return Promise.resolve(this);
		}

		return Promise.reject(null);
		
	}

}