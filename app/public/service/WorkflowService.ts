
const {BaseService} = require('../service/BaseService');
const { createTreeHierarchy } = require('hierarchy-js');
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
				data.map((child) => {
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
}