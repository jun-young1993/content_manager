const {Task} = require('@models/Task');

const {FileManager} = require('@task/module/FileManager');
const {TaskParse} = require('@task/TaskParse');

export class TaskManager{
	private TaskDb = new Task().db();
	constructor(){
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
			.exec((error,tasks) => {
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
				
				if(tasks){
					resolve(tasks[0]);
				}
				reject(tasks);
			}).catch(reject);
		})
	}




	ingest(){
		this.findQueued()
		.then((task) => {
			new TaskParse(task)
				.getTaskParse()
				.then((parse) => {
					// console.log(parse);
				})
		})
		.catch((err) => {

		})
	}

}