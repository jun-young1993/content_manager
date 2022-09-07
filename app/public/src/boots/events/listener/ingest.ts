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
onIpc("#ingest",(event:IpcMainEvent,args) => {
	const dialog = getElectronModule('dialog');
	dialog.showOpenDialog(getBrowserWindow(),{
		properties:['openFile','multiSelections']
	})
	.then((result) => {
		if(!result.canceled && result.filePaths){
			console.log(result.filePaths);
			const workflowId : string = "YMxc6i1EeoDhTKgY";
			result.filePaths.map((file:string) => {
				contentService.createContent({
					workflow_id : workflowId,
					title : path.basename(file)
				})
				.then((content:any) => {
					workflowService.firstWorkflowRuleByWorkflowId(workflowId)
					.then((firstWorkflowRule : any) => {
						const contentId = content.data._id;	
						const insertTask : {
							content_id : string,
							workflow_id : string,
							module_id : string,
							rule_id : string,
							source : string,
							target : null,
							status : 'queue',
							priority : number
						} = {
							content_id : contentId,
							workflow_id : workflowId,
							module_id : firstWorkflowRule.data.module_id,
							rule_id : firstWorkflowRule.data._id,
							source : file,
							target : null,
							status : 'queue',
							priority : 0
						}
						taskService.create(insertTask)
						.then((task) => {
							new TaskManager()
							.initialize()
							.then((taskParse:any) => {
								log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);
							})
						})

					})
				});
			})
		
		}
		// event.reply("#ingest/reply",result);
	});
    
})


