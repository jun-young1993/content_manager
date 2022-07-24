
const {Task} = require('../../models/Task');


const {TaskParse} = require('./TaskParse');

export class TaskManager{
	private TaskDb:any;
	constructor(){
		this.TaskDb = new Task().db();
		console.log('[start taskManger]')
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

	findQueued(params : any = {}){
		const options: any = {
			status : 'queue',
			priority : -1,
			limit : 1
		};
		Object.assign(options,params);
		return new Promise((resolve, reject) => {
			this.getQueued(options).then((tasks:any) => {
				console.log('get Queued',tasks);
				if(tasks){
					resolve(tasks[0]);
				}
				reject(tasks);
			}).catch(reject);
		})
	}

	initialize(){
		return new Promise((resolve, reject) => {
			this.findQueued()
			.then((task:any) => {
				new TaskParse(task)
					.getTaskParse()
					.then((parse:any) => {
						// const module = parse.module;
						// module.copy();
						resolve(parse);
					})
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