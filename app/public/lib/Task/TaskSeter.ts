import { isEmpty } from "lodash";
import MediaInterface from "../../interfaces/MediaInterface";
interface Property{
	jobName : string
	sourceMedia : MediaInterface
}
import {Task} from "../../models/Task";
import { apiReject, apiResolve } from "../helper/ApiHelper";
import { TaskManager } from "./TaskManager";
export class TaskSeter implements Property{
	jobName
	sourceMedia
	constructor(sourceMedia:MediaInterface){
		this.sourceMedia = sourceMedia;
		
	}

	download(target:string){
		return new Promise((resolve , reject) => {
			const sourceMedia = this.sourceMedia;
		
			let insertTaskData = {
				content_id : sourceMedia.content_id,
				workflow_id : '',
				module_id : '',
				rule_id : '',
				source : sourceMedia.full_path,
				target : target,
				status : 'queue',
				priority : 0
			}
			if(!sourceMedia.is_media){

			}
			
			new Task().db().insert(insertTaskData,(error, task) => {
				if(isEmpty(task)){
					reject(apiReject('[TaskSeter][download] fail insert task'));
				}
				new TaskManager().initialize()
				resolve(apiResolve(task));
			});
		})
		
	}
}