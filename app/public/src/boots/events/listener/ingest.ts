const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";
import {ContentService} from '../../../../service/ContentService';
import {WorkflowService} from '../../../../service/WorkflowService';
import {TaskService} from '../../../../service/TaskService';
import { TaskManager } from "../../../../lib/Task/TaskManager";
const log = require("../../../../lib/Logger");
const contentService = new ContentService();
const workflowService  = new WorkflowService();
const taskService = new TaskService();
import * as path from "path";
import { sendIpc } from "../../../../lib/helper/ElectronHelper";
import TaskInterface from "../../../../interfaces/TaskInterface";
import { reject } from "lodash";
const ingest = (file:string) => {
	return new Promise((resolve, reject) => {
		
		const workflowId : string = "user_out_ingest";
		contentService.createContent({
			workflow_id : workflowId,
			title : path.basename(file)
		})
		.then((content:any) => {
			new TaskManager()
			.startWorkflow({
				content_id : content._id,
				workflow_id : workflowId,
				source : file
			})
			.then((task:any) => {
				resolve(task);
			});
		});
	})
	
}


const recuriveIngest = (files:string[], number:number=0) => {
	log.channel('ingest').info(`[Ingest][Request] : ${number}`);
	log.channel('ingest').info(files);
	
	ingest(files[number])
	.then((result) => {
		log.channel('ingest').info(`[Ingest][Request] : ${number}  ${files.length - 1}`);
		log.channel('ingest').info(files);
		if(number < (files.length - 1)){
			recuriveIngest(files,number+1);
		}else{
			new TaskManager()
			.initialize()
			.then((taskParse:any) => {
				log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);
			
				// resolve(taskParse);
			})
			.catch((exception) => {
				log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
				sendIpc("#ShowMessageAlert/reply",{
					severity : "success",
					title : "작업이 성공적으로 요청되었습니다."
				})
			})
		
		}
	})
}
onIpc("#ingest",(event:IpcMainEvent,args) => {
	const dialog = getElectronModule('dialog');
	dialog.showOpenDialog(getBrowserWindow(),{
		properties:['openFile','multiSelections']
	})
	.then((result) => {
		if(!result.canceled && result.filePaths){
			console.log(result.filePaths);
			const workflowId : string = "YMxc6i1EeoDhTKgY";
			// result.filePaths.map((file:string) => {
				
			// })
			recuriveIngest(result.filePaths)
		
		}
		// event.reply("#ingest/reply",result);
	});
    
})


