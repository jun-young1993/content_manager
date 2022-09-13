import { isEmpty } from "lodash";
import MediaInterface from "../../interfaces/MediaInterface";
import TaskInterface from "../../interfaces/TaskInterface";
interface Property{
	sourceMedia : MediaInterface
}
import {Task} from "../../models/Task";
import { apiReject, apiResolve } from "../helper/ApiHelper";
import { TaskManager } from "./TaskManager";
export class TaskSeter implements Property{
	sourceMedia 
	constructor(sourceMedia:MediaInterface){
		this.sourceMedia = sourceMedia;
		
	}

	download(target:string){
		return new Promise((resolve , reject) => {
			const sourceMedia = this.sourceMedia;
		
			let insertTaskData:TaskInterface = {
				content_id : sourceMedia.content_id,
				workflow_id : '',
				module_id : '',
				rule_id : '',
				source : sourceMedia.full_path,
				target : target,
				status : 'queue',
				priority : 0,
				progress : 0
			}
			if(!sourceMedia.is_media){

			}
			
			new Task().db().insert(insertTaskData,(error:any, task:TaskInterface) => {
				if(isEmpty(task)){
					reject(apiReject('[TaskSeter][download] fail insert task'));
				}
				new TaskManager().initialize()
				resolve(apiResolve(task));
			});
		})
		
	}
}