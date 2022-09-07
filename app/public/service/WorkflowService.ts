

const {BaseService} = require('../service/BaseService');
const { createTreeHierarchy } = require('hierarchy-js');
import {isEmpty, reject} from "lodash";
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
	indexByWorkflowRule(args = {}){
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.getModel('WorkflowRule').find(args,(err,datas) => {
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
			
			console.log('[getWorkflowRuleByWorkflowId]',workflowId);
			
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

	/**
	 * 
	 * w
	 * 
	 * @param workflowId
	 * @returns 
	 */
	getWorkflowRuleIdsByWorkflowId(workflowId:string){
		const _this = this;
		return new Promise((resolve ,reject) => {
			_this.getWorkflowRuleByWorkflowId(workflowId)
			.then((result:any) => {
				let ids : string[] = [];
				result.data.map((rule:{_id : string}) => {
					ids.push(rule._id);
				})
				resolve(apiResolve(ids));
			})
		})
	}

	firstWorkflowRuleByWorkflowId(workflowId:string){
		const _this = this;
		return new Promise((resolve, reject) => {
			
			console.log('[getWorkflowRuleByWorkflowId]',workflowId);
			
		_this.getModel('WorkflowRule').findOne({workflow_id : workflowId, parent_id : null},(err,startWorkflowRule) => {
				
				const startWorkflowId = startWorkflowRule._id;
				_this.getModel('WorkflowRule').findOne({parent_id : startWorkflowId},(error, firstWorkflowRule:any) => {
					resolve(apiResolve(firstWorkflowRule));
				})
				
					
				

				

			})
		})
	}


	workflowRuleOrder(data){
		const ruleOrderObj = {};
		console.log('workflowRuleORder data',data)
		data.map((child) => {
			let key = child.parent_id;
			if(child.parent_id === null){
				key = 'start';
			}
			ruleOrderObj[key] = child;
			
		});
		if(isEmpty(ruleOrderObj)){
			return data;
		}
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

	workflowRuleOrderChange(data:{ parent_id : string  , rule_id : string}){
		const _this = this;
		console.log('workflowRuleOrderChange',data);
		return new Promise((resolve,reject) => {
			_this.getModel("WorkflowRule").update({_id : data.rule_id},{$set : {parent_id : data.parent_id}},(error , result:number) => {
				if(result){
					resolve(apiResolve(result))
				}else{
					reject(apiReject(result))
				}
			})
		})
		
	
	}

	insert(data){
		const _this = this;
		return new Promise((resolve ,reject) => {
			_this.getModel("WorkflowRule").insert(data,(error,data) => {
				resolve(apiResolve(data));
			})
		})
	}

	workflowRuleRemove(ruleId:string){
		const _this = this;
		return new Promise((resolve, reject) => {
			console.log('REMOVE PROMISE',ruleId);
			_this.getModel("WorkflowRule").findOne({_id : ruleId},(err, rule) => {
				console.log('remove ',rule);
				if(isEmpty(rule.parent_id)){
					console.log('rule.parent_id else',rule.parent_id)
					resolve(apiResolve("start workflow"));
				}else{
					console.log('rule.parent_id',rule.parent_id)
					_this.getModel("WorkflowRule").remove({_id : ruleId},(error,remove) => {
						console.log('removed',rule._id);
						resolve(apiResolve(remove));
					})
					
				}
				
			})
			
		})
		
	}

	removeWorkflow(workflowId:string){
		const _this = this;
		return new Promise((resolve , reject) => {
			_this.getModel("Workflow").remove({_id : workflowId},(error, workflowRemoved) =>{
				if(workflowRemoved){
					_this.getModel("WorkflowRule").remove({workflow_id :workflowId},(error,workflowRuleRemoved)=>{
						if(workflowRuleRemoved){
							resolve(apiResolve());
						}
					});
				}
			});
		});
	}

	workflowRulesOrderChange(datas:[{_id : string, workflow_id ?: string, parent_id ?: string, module_id : string, module_name : string}]){
		const _this = this;
		let sortedRuleChangePromise : any = [];
		console.log('workflowRuleOrderChange',datas);
		return  new Promise((resolve , reject) => {
			
			const startWorkflowModule:any = datas[0];
			_this.getWorkflowRuleIdsByWorkflowId(startWorkflowModule.workflow_id)
			.then((ruleIds:any) => {
				const workflowRuleIds = ruleIds.data;
				datas.map((sortRule:{_id : string, workflow_id ?: string, parent_id ?: string, module_id : string, module_name : string},index:number) => {
					if(index >= 1){
						
						const parentRule:{_id : string} = datas[index-1];
						const parentId : string = parentRule._id;
						const updateRule : {parent_id : string, rule_id : string, workflow_id ?: string} = {
							parent_id : parentId,
							rule_id : sortRule._id
						};

						const noDeleteRule = workflowRuleIds.indexOf(sortRule._id);
						if(noDeleteRule > -1){
							console.log('cancel ',sortRule._id)
							workflowRuleIds.splice(noDeleteRule,1);
						}


						if(isEmpty(sortRule.workflow_id)){
							
							const insertData = {
								workflow_id  : startWorkflowModule.workflow_id,
								_id : sortRule._id,
								module_id : sortRule.module_id,
								module_name : sortRule.module_name,
								parent_id : parentId,
	
							}
							
							sortedRuleChangePromise.push(_this.insert(insertData));
						}else{
							sortedRuleChangePromise.push(_this.workflowRuleOrderChange(updateRule));
						}
						
					
					}
				})
				console.log('workflowRuleIds',workflowRuleIds)
				workflowRuleIds.map((deleteRuleId) => {

					sortedRuleChangePromise.push(_this.workflowRuleRemove(deleteRuleId))
				})
				Promise.all(sortedRuleChangePromise)
				.then((changed) => {
					resolve(changed);
				})
				.catch((error) => {
					reject(error);
				})
			})
			
		})
		

	}
}