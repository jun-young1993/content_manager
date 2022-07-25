
const {Task} = require('../../models/Task');


const {TaskParse} = require('./TaskParse');

export class TaskManager{
	private TaskDb:any;
	constructor(){
		this.TaskDb = new Task().db();
		
		/*
		{
			status : 'queue'
		}
		*/
	}
	get(params : any){
		
		return new Promise((resolve, reject) => {
			this.TaskDb.find({status : params.status})
			.sort({priority : params.priority})
			.limit(params.limit)
			.exec((error:any,tasks:any) => {
				if(tasks){
					resolve(tasks);
				}

				
				reject(error);
				
				
			});
		})
	}
	getQueued(params : any = {}){
		const options: any = {
			status : 'queue',
			priority : -1,
			limit : 1
		};
		Object.assign(options,params);
		return this.get(options);
	}

	findQueued(){

		const taskDb = new Task().db();
		return new Promise((resolve, reject) => {
			taskDb.findOne({status : 'queue'},(error:any,task:any) => {
				
				if(task){
					console.log('[in findQueued]',task);
					taskDb.findOne({_id : task._id},(error : any, taskInfo:any)=> {
						console.log('findQueued',taskInfo);
						resolve(taskInfo);
					})
					
				}else{
					reject(error);
				}

				
				
			})
			// .sort({priority : -1})
			// .exec((error:any,tasks:any) => {
			// 	if(tasks){
			// 		resolve(tasks);
			// 	}

				
			// 	reject(error);
				
				
			// });
		})
		
	}

	initialize(){
		return new Promise((resolve, reject) => {
			
				this.findQueued()
				.then((task:any) => {
					if(task){
						new TaskParse(task)
						.getTaskParse()
						.then((parse:any) => {
							// const module = parse.module;
							// module.copy();
							resolve(parse);
						})
					}
				
				})
				.catch((err:any) => {
					reject(err)	;
				})
			
			
			
		})
		
	}

	start(){
		
	}


	ingest(){
		
	}

}