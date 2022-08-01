const {Storage} = require("../../models/Storage");
const {Media} = require("../../models/Media");
const {Task} = require("../../models/Task");
const {Module} = require("../../models/Module");
const {FileManager} = require("./module/FileManager");
const {Transcoder} = require("./module/Transcoder");
const log = require('../Logger');
import {isEmpty} from 'lodash';
// const {isEmpty} = require('lodash');
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
						if(!isEmpty(storage)){
							resolve(storage);
						}else{
							reject('[getStorage] not found storage code'+code);
						}

					})
			}else{
				reject('[getStorage] not found code');
			}

		})
		return storage;
	};



	// getSourceDir(){

	// 	return path.dirname(this.sourceMedia.path);


	// }
	// getSourceBasenaem(){
	// 	return path.basename(this.sourceMedia.path);
	// }
	// getSourceExtention(){
	// 	return path.extname(this.sourceMedia.path);
	// }
	// getSource(){
	// 	if(this.sourceMedia){
	// 		if(this.sourceMedia.type === 'out'){
	// 			// 밖에서 들어온 미디어는 풆경로
	// 			return this.sourceMedia.path;
	// 		}
	// 	}

	// 	return path.resolve(this.getSourceDir(),this.getSourceBasenaem()+this.getSourceExtention())
	// }











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
				reject('[getModuleInfo] not found _this.task.module_id ');
			}

		})
		return module;
	};
	async getMedia(org:any) {
		const mediaDb = new Media().db();
		const _this = this;
		const media = await new Promise((resolve,reject) => {
			mediaDb.findOne({content_id : org.content_id , type : org.type.toLowerCase()},(err:any,data:any) => {
				if(!isEmpty(data)){

					
					resolve(data);
				}else{
					
					if(this.moduleInfo.source_media.toLowerCase() == 'out'){
						_this.sourceStorage = {
							path : ''
						};
						_this.moduleInfo.source_storage = 'out';
						console.log('return resolve',_this.task);
						resolve({
							path : _this.task.source
						})
					}else{
						reject(`[TaskParse][getMedia] not found media by content_id ${org.content_id} and type ${org.type}`);
					}
					
				}
			})

		})
		return media;
	}
	async setMedia(org:any){
		const mediaDb = new Media().db();
		
		const media = await new Promise((resolve,reject) =>{
			if(isEmpty(org.type)){
				reject('[TaskParse][setMedia] not found org.type');
			}
			org.type = org.type.toLowerCase();
			new Media().db().findOne({content_id : org.content_id , type : org.type},(err:any,data:any) => {
				if(err){
					log.channel('task_parse').error('[SetMedia Find]',err);
					reject('[setMedia Err]');
				}
				if(!isEmpty(data)){
					const mediaId = data._id;
					new Media().db().update({_id : mediaId},{$set : org},(err:any, updateData:any) => {
						if(err){
							log.channel('task_parse').error('[setMedia Update Fail]',err);
							reject('[TaskParse][setMedia] media update fail');
						}
						if(updateData){
							new Media().db().findOne({_id : data._id},(err:any,media:any) => {
								if(!isEmpty(media)){
									resolve(media);
								}else{
									reject(`[setMedia] not found media by id ${data._id}`)
								}
								
							})
						}else{
							log.channel('task_parse').error('[setMedia Update Fail]',err);
						}
						
						
					})
				}else{
					new Media().db().insert(Object.assign({
						is_media : true
					},org),(err:any, insertData:any) => {
						if(err){
							log.channel('task_parse').error('[setMedia Insert Fail]',err);
						}
						new Media().db().findOne({_id : insertData._id},(err:any,media:any) => {
							if(!isEmpty(media)){
								resolve(media);
							}else{
								log.channel('task_parse').error(`[setMedia] not found media by _id ${insertData._id}`);
							}
							
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
				if(err){
					log.channel('task_parse').error('[UpdateTask] Update',err);
					reject('[UpdateTask] Update Err');
				}
				if(data){
					
					new Task().db().findOne({_id : _this.task._id},(err:any , taskData:any) => {
						if(err){
							log.channel('task_parse').error('[UpdateTask] FindOne',err);
						}
						if(taskData){
							resolve(taskData);
						}else{
							reject('[UpdateTask] not found taskData ');
						}
						
					})
				}else{
					reject('[UpdateTask] not found data');
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

	
	setting(){
		const _this = this;
		return new Promise((resolve , reject) => {
			_this.getModuleInfo()
			.then((moduleInfo :any) => {
				log.channel('task_parse').info('[setting][moduleInfo]',moduleInfo);	
				_this.moduleInfo = moduleInfo;

				_this.getStorage(_this.moduleInfo.target_storage)
				.then((targetStorage:any) => {
					log.channel('task_parse').info('[setting][targetStorage]',targetStorage);	
					_this.targetStorage = targetStorage;
					if(targetStorage){
						if(!targetStorage.path){
							reject('[sertting][targetStorage] not found targetStorage.path');
						}

						_this.getStorage(_this.moduleInfo.source_storage)
						.then((sourceStorage:any) => {
							log.channel('task_parse').info('[setting][sourceStorage]',sourceStorage);	
							if(sourceStorage){
								if(!sourceStorage.path){
									reject('[setting][sourceStorage] not found sourceStorage.path');
								}
								_this.sourceStorage = sourceStorage;
								
		
							
									_this.getMedia({content_id : _this.task.content_id, 
											type : _this.moduleInfo.source_media
									})
									.then((sourceMedia : any) => {
										
										if(sourceMedia){
											log.channel('task_parse').info('[setting][getSourceMedia]',sourceMedia);
											_this.task.source = sourceMedia.path;
											if(isEmpty(sourceStorage.path)){
												reject('[setting][sourceMedia] not found sourceMedia.path');
											}
											
										
											_this.setMedia({
												content_id : _this.task.content_id,
												type : _this.moduleInfo.source_media,
												storage : _this.moduleInfo.source_storage,
												path : _this.task.source,
												full_path : path.resolve(_this.sourceStorage.path,this.task.source)
											}).then((sourceMedia:any) => {
												log.channel('task_parse').info('[setting][seMedia] Insert Or Update',sourceMedia);
												_this.sourceMedia = sourceMedia;
												const taskType = _this.moduleInfo.task_type;
												const [moduleTypeCode , moduleTypeMethod] = taskType.split('_');
	
												log.channel('task_parse').info('[setting][Module Type]',moduleTypeCode);
												log.channel('task_parse').info('[setting][Module Task]',moduleTypeMethod);
	
												let ext = path.extname(this.task.source);
												if(moduleTypeMethod.toLowerCase() == 'thumbnail'){
													ext = '.png';
												}else if(moduleTypeMethod.toLowerCase() == 'proxy'){
													ext = '.mp4'
												}
												
												const setTargetOptions = {
													content_id : _this.task.content_id,
													type : _this.moduleInfo.target_media,
													storage : _this.moduleInfo.target_storage,
													path : _this.task._id+ext,
													full_path : path.resolve(_this.targetStorage.path,_this.task._id+ext)
												};
												
												_this.setMedia(setTargetOptions)
												.then((setTargetMedia : any) => {
													log.channel('task_parse').info('[setting][setTargetMedia]',setTargetMedia);
													if(setTargetMedia){
														_this.targetMedia = setTargetMedia;

														_this.updateTask()
														.then((updateTask:any) => {
															log.channel('task_parse').info('[setting][updateTask]',updateTask);
															const module = _this.getModule(moduleTypeCode.toLowerCase())
															_this.module = new module({
																task : updateTask,
																sourceMedia : _this.sourceMedia,
																targetMedia : _this.targetMedia
															});
															log.channel('task_parse').info(`[setting][Start Task Workflow] ${moduleTypeCode.toLowerCase()} => ${moduleTypeMethod.toLowerCase()}`);
															_this.module[moduleTypeMethod.toLowerCase()]();
															
															resolve(_this);
														})
														.catch((updateTaskError:string) => {
															reject(updateTaskError);
														})

													}else{
														reject('[setting][setTargetMedia] not found setTargetMedia');
													}
												})
												.catch((setTargetMediaError : string) => {
													reject(setTargetMediaError);	
												})
											})
											.catch((setSourceMediaError:string) => {
												reject(setSourceMediaError);
											})
										}else{
											reject(`[setting][sourceMedia] not found sourceMedia`)
										}
									})
									.catch((sourceMediaErr:string) => {
										reject(sourceMediaErr);	
									})
									
									
								
							}else{
								reject('[setting][sourceStorage] not found sourceStorage');	
							}
							
	
						})
						.catch((sourceStorageErr:string) => {
							reject(sourceStorageErr);	
						})
					}else{
						reject('[targetStorage] not found target storage');
					}
				
				})
				.catch((targetStorageErr:string) => {
					
					reject(targetStorageErr);	
				})
				
			})
			.catch((moduleInfoErr:string) => {
				reject(moduleInfoErr);
			})
		})
		
	}
	
	async getTaskParse(){
		return new Promise((resolve , reject) => {
			this.setting()
			.then((complete:any) => {
				resolve(complete);
			})
			.catch((error:string) => {
				log.channel('task_parse').error(error);
			})
		})
		
	}
	async getTaskParse_(){
		log.channel('task_parse').info('[Start Task Parse]',this);
		const task = this.task;

		// base parsing
		this.moduleInfo = await this.getModuleInfo();
		
		
		log.channel('task_parse').info('[Module Info]',this.moduleInfo);
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
				log.channel('task_parse').info('[Get Source Media]',sourceMedia);
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
			}else if(moduleTypeMethod.toLowerCase() == 'proxy'){
				ext = '.mp4'
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