

const {BaseService} = require('../service/BaseService');
const { createTreeHierarchy } = require('hierarchy-js');
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class WorkflowService extends BaseService{
	constructor(){
		super({
			models : [
				'Workflow',
				'WorkflowRule',
				'Module'
			]
		});
	}

	indexByWorkflow(){
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.getModel('Workflow').find({},(err,datas) => {
				resolve(apiResolve(datas));
			})
		})
	}
	indexByWorkflowRule(){
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.getModel('WorkflowRule').find({},(err,datas) => {
				resolve(apiResolve(datas));
			})
		})
	}

	hierarchyRuleByWorkflowId(workflowId : any){
		return new Promise((resolve, reject) => {
			this.getModel('WorkflowRule').find({workflow_id : workflowId},(err:any,data:any) => {
				data.map((child:any) => {
					child.id = child._id;
					child.name = child.module_name
					child.parentId = child.parent_id;
					return child;
				});
				resolve(createTreeHierarchy(data));
			})
		})
	}
	findOriginalByContentId(contentId:any){
		return this.findTypeByContentId('original',contentId);
	}
	findTypeByContentId(type:any,contentId:any){
		return new Promise((resolve, reject) => {
			this.getModel('Media').findOne({content_id : contentId, type : type},(err:any,media:any)=>{
				resolve({
					success : true,
					data : media
				})
			})
		})
	}
	findOutByContentId(contentId:any){
		return this.findTypeByContentId('out',contentId);
	}

	create(data:{}){
		const _this = this;
		return  new Promise((resolve, reject) => {
			_this.getModel('Workflow').insert(data,(err,result:any) => {
				if(isEmpty(result)){
					reject(apiReject("[WorklfowService][create] insert fail workflow"))
				}




					_this.getModel('WorkflowRule').insert({
						workflow_id : result._id,
						module_id : null,
						module_name : 'start workflow',
						parent_id : null
					},(workflowRuleErr, workflowRuleResult) => {


							resolve(apiResolve(workflowRuleResult));



					})


			})
		})

	}

	getWorkflowRuleByWorkflowId(workflowId:string){
		const _this = this;
		return new Promise((resolve, reject) => {
			
	
			
		_this.getModel('WorkflowRule').find({workflow_id : workflowId},(err,data) => {
				if(isEmpty(data)){

				}
				
				
				data.map((child:any) => {
					child.id = child._id;
					child.name = child.module_name
					child.parentId = child.parent_id;
					// const ruleModule = moduleList[child.module_id]
					// if(!isEmpty(ruleModule)){
					// 	child.
					// }
				
					
					
					return child;
				});
		
				
				const orderRule = this.workflowRuleOrder(data)
				this.mergeModuleInfo(orderRule)
				.then((workflowRuleDetail) => {
					resolve(apiResolve(workflowRuleDetail));
				})

				

			})
		})
	


	}


	workflowRuleOrder(data){
		const ruleOrderObj = {};
		data.map((child) => {
			let key = child.parent_id;
			if(child.parent_id === null){
				key = 'start';
			}
			ruleOrderObj[key] = child;
			
		});
		
		let orderParentWorkflowId = ruleOrderObj['start']._id; 
		const ruleOrder = [ruleOrderObj['start']];
		for(let i = 1; i<data.length; i++){
			const childWorkflow = ruleOrderObj[orderParentWorkflowId];
			console.log(childWorkflow);
			if(!isEmpty(childWorkflow)){
				ruleOrder.push(childWorkflow);
				orderParentWorkflowId = childWorkflow._id;
			}
		}

		return ruleOrder;
	}
	mergeModuleInfo(data){
		const _this = this;
		return new Promise((resolve, reject) => {
			let moduleIds:string[] = [];
			data.map((child:any) => {
			
				const moduleId:string = child.module_id;
				moduleIds.push(moduleId);
				
				
				return child;
			});
			
			this.getModel('Module')
			.find({_id : { $in : moduleIds}},(error,modules) => {
				let keyByModule = {};
				modules.map((module) => {
					keyByModule[module._id] = module;
				})
				let worklfowRuleDetail:any = [];
				data.map((child:{module_id : string 
						source_media?:string
						target_media?:string
						source_storage?:string
						target_storage?:string
						module_name ?: string
						task_type?:string
					}) => {
			
					const moduleId:string = child.module_id;
					const moduleInfo:any = keyByModule[moduleId];
					
					if(!isEmpty(moduleInfo)){
						child.source_media = moduleInfo.source_media;
						child.target_media = moduleInfo.target_media;
						child.source_storage = moduleInfo.source_storage;
						child.target_storage = moduleInfo.target_storage;
						child.module_name = moduleInfo.name;
						child.task_type = moduleInfo.task_type;
					}
					worklfowRuleDetail.push(child);
					
					
					
				});
				resolve(worklfowRuleDetail);
			})
		})
	
	}
}