import {BaseController} from "./BaseController";
const {TaskManager} = require("@task/TaskManager");
class WorkFlow{
	static ingest(event,args){
		new TaskManager()
		.initialize()
		.then((taskParse) => {
			console.log('taskParse');
			console.log(taskParse);
			return event.returnValue = {
				success : true,
				data : null
			}
		})
		.catch((error)=>{
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