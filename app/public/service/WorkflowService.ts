

const {BaseService} = require('../service/BaseService');
const { createTreeHierarchy } = require('hierarchy-js');
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class WorkflowService extends BaseService{
	constructor(){
		super({
			models : [
				'Workflow',
				'WorkflowRule'
			]
		});
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
				data.map((child) => {
					child.id = child._id;
					child.name = child.module_name
					child.parentId = child.parent_id;
					return child;
				});
				console.log('getWorkflowRuleByWorkflowId',data);
				resolve(apiResolve(data));

			})
		})


	}
}