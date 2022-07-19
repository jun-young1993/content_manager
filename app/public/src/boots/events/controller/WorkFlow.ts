// @ts-nocheck

import {BaseController} from "./BaseController";
const {TaskManager} = require("../../../../lib/Task/TaskManager");
class WorkFlow{
	static ingest(event,args){
		new TaskManager()
		.initialize()
		.then((taskParse:any) => {
			console.log('taskParse');
			console.log(taskParse);
			taskParse.module.copy();
			return event.returnValue = {
				success : true,
				data : null
			}
		})
		.catch((error:any)=>{
			console.log('error');
			console.log(error);
			return event.returnValue = {
				success : false,
				data : null
			}
		})
	}
}
new BaseController(WorkFlow);