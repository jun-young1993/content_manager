
const {Task} = require('../../models/Task');

const {getBrowserWindow} = require("../helper/ElectronHelper");
const {TaskParse} = require('./TaskParse');
const {FileManager} = require('./module/FileManager');
import MediaInterface from "../../interfaces/MediaInterface";
import { Media } from "../../models/Media";
import {apiReject,apiResolve} from "../helper/ApiHelper";
import {WorkflowService} from "../../service/WorkflowService";
import {ModuleService} from "../../service/ModuleService";
import {TaskService} from "../../service/TaskService";
const workflowService = new WorkflowService();
const taskService = new TaskService();
const moduleService = new ModuleService();

import TaskInterface from "../../interfaces/TaskInterface";
import { isEmpty } from "lodash";
import { resolve } from "path";
import { dialog } from "electron";
interface Property{
	TaskDb : typeof Task,
	MediaDb : typeof Media
}

/**
 * 워크플로우 실행 함수 파라미터
 * 
 * @params content_id - 콘텐츠 아이디
 * @params workflow_id - 워크플로우 아이디
 * @params source - 작업 소스파일 경로 
 */
interface StartWorkflowOptions {
	content_id:string
	workflow_id:string
	source ?: string
}
export class TaskManager implements Property{
	TaskDb
	MediaDb
	constructor(){
		this.TaskDb = new Task().db();
		this.MediaDb = new Media().db();
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
		const parallerTask :number = 1;
		const taskDb = new Task().db();
		return new Promise((resolve, reject) => {
			taskDb.count({status : 'processing'},(error:any,count:number) => {
				if(count >= parallerTask){
					resolve(null);
				}else{
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
				}
				
			});
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

	/**
	 * 워크플로우 아이디로 start_workflow 다음의 첫번째 룰 대기 작업 데이터 세팅
	 * 
	 * @param options - StartWorkflowOptions
	 * 
	 * @returns object TaskInterface
	 */
	settingInsertTask(options : StartWorkflowOptions)
	{	
		return new Promise((resolve, reject) => {
			workflowService.firstWorkflowRuleByWorkflowId(options.workflow_id)
			.then((firstWorkflowRule:any) => {
				const moduleId : string = firstWorkflowRule.data.module_id;
				console.log('moduleId',moduleId);
				moduleService.find(moduleId)
				.then((module:any) => {
					console.log('module',module);
					const sourceMedia : string = module.data.source_storage;
					
					const insertTask : TaskInterface = {
						content_id :options.content_id,
						workflow_id : options.workflow_id,
						module_id : firstWorkflowRule.data.module_id,
						rule_id : firstWorkflowRule.data._id,
						source : options.source ?? null,
						target : null,
						status : 'queue',
						priority : 0,
						progress : 0
					}
					console.log("sourceMedia",sourceMedia)
					console.log("options.source",options.source)
					 if(sourceMedia === "out" && isEmpty(options.source)){
						dialog.showOpenDialog(getBrowserWindow(),{
							properties:['openFile']
						})
						.then((result) => {
							if(!result.canceled && result.filePaths){
								const files : string[] = result.filePaths;
								insertTask.source = files[0];
								resolve(insertTask);
							}
						})
						
					 }else{
						resolve(insertTask);
					 }
					 
				})
			
			})
		})
		
	}

	/**
	 * 
	 * options.workflow_id(워크플로우) 첫번째 작업을 조회후 대기 상태로 작업 생성
	 * options.source가 없을경우 dialog 호출
	 * 
	 * @param options - StartWorkflowOptions
	 * @returns Promise
	 */
	startWorkflow(options : StartWorkflowOptions) : Promise<unknown>
	{
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.settingInsertTask(options)
			.then((result) => {
				console.log("result",result);
					taskService.create(result)
					.then((task) => {
						resolve(task);
					})
					.catch((taskCatch) => {
						reject(taskCatch);
					})
			});
			// workflowService.firstWorkflowRuleByWorkflowId(options.workflow_id)
			// .then((firstWorkflowRule:any) => {
				
					// const insertTask : TaskInterface = {
					// 	content_id :options.content_id,
					// 	workflow_id : options.workflow_id,
					// 	module_id : firstWorkflowRule.data.module_id,
					// 	rule_id : firstWorkflowRule.data._id,
					// 	source : options.source ?? null,
					// 	target : null,
					// 	status : 'queue',
					// 	priority : 0,
					// 	progress : 0
					// }
					// taskService.create(insertTask)
					// .then((task) => {
					// 	resolve(task);
					// })
					// .catch((taskCatch) => {
					// 	reject(taskCatch);
					// })
			// })
			// .catch((firstWorkflowRuleCatch) => {
			// 	reject(firstWorkflowRuleCatch);
			// })
		})
		
	}

	

	start(){
		
	}


	ingest(){
		
	}




}