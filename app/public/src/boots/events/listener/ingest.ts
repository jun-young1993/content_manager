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
import { isEmpty, reject } from "lodash";
import { CodeItemService } from "../../../../service/CodeItemService";
const codeItemService = new CodeItemService;
const Store = require("electron-store");
const store = new Store();
const ingest = (file:string,defaultValues:any) => {
	return new Promise((resolve, reject) => {
		const workflowId : any = store.get(`default_values.ingest_workflow_${defaultValues.ingest_type}`);
		if(isEmpty(workflowId)){
			reject('not found ingest workflow');
		}
		contentService.createContent(Object.assign({
			workflow_id : workflowId,
			title : path.basename(file),
			content_type : defaultValues.ingest_type
		},defaultValues))
		.then((content:any) => {
			log.channel('ingest').info(`[Ingest][Request][Create Content]`);
			log.channel('ingest').info(content);
			new TaskManager()
			.startWorkflow({
				content_id : content.data._id,
				workflow_id : workflowId,
				source : file
			})
			.then((task:any) => {
				resolve(task);
			});
		});
	})
	
}


const recuriveIngest = (files:string[],defaultValues:{}, number:number=0) => {
	log.channel('ingest').info(`[Ingest][Request] : ${number}`);
	log.channel('ingest').info(files);
	
	ingest(files[number],defaultValues)
	.then((result) => {
		log.channel('ingest').info(`[Ingest][Request] : ${number}  ${files.length - 1}`);
		log.channel('ingest').info(files);
		if(number < (files.length - 1)){
			recuriveIngest(files,defaultValues,number+1);
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
					severity : "error",
					title : `작업이 실행에 실패했습니다.
						${exception}}`
				})
			})
		
		}
	})
	.catch((error) => {
		log.channel('ingest').error(`[Ingest][Request Exception] : ${error}`);
		sendIpc("#ShowMessageAlert/reply",{
			severity : "error",
			title : `작업요청에 실패했습니다. 
				${error}`
		})
	})
}
const extentionValid = (files:string[], ingestType : string) => {
	return new Promise((resolve,reject) => {
		codeItemService.findByParentCode(`${ingestType}_allow_extention`)
		.then((codes:any) => {
			let extentions:string[] = [];
			codes.data.map((code : {code : string}) => {
				extentions.push(code.code.toLowerCase());
			})
			
			
			return files.map((file:string,index:number) => {
				const ext:string = path.extname(file).slice(1);
				if(extentions.indexOf(ext.toLowerCase()) === -1){
					return	reject(`허용가능한 확장자(${extentions.join()})만 선택해 다시요청해주세요.`);
				}
				if((files.length -1) === index){
					return resolve(files);
				}
			})
		}) 
	})
}
onIpc("#ingest",(event:IpcMainEvent,defaultValues:{ingest_type : string}) => {
	
	const dialog = getElectronModule('dialog');
	dialog.showOpenDialog(getBrowserWindow(),{
		properties:['openFile','multiSelections']
	})
	.then((result) => {
		event.reply("#ingest/reply");
		if(!result.canceled && result.filePaths){
			const files : string[] = result.filePaths;
			extentionValid(files,defaultValues.ingest_type)		
			.then((valid) => {
				recuriveIngest(files,defaultValues)
			})
			.catch((validException) => {
				sendIpc("#ShowMessageAlert/reply",{
					severity : "error",
					title : `${validException}`
				})
			})
			// result.filePaths.map((file:string) => {
				
			// })
			
		
		}
		// event.reply("#ingest/reply",result);
	});
    
})


