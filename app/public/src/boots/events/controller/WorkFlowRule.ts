// @ts-nocheck

import {BaseController} from "./BaseController";
import {WorkflowRule as Model} from "../../../../models/WorkflowRule";
import {WorkflowService} from "../../../../service/WorkflowService";
const workflowService = new WorkflowService();
const db = new Model();
class WorkFlowRule{


	static all(event, args){

		db.db().find({},(err,data) => {
		    if(data){
			return event.returnValue = {
			    success : true,
			    data : data
			}
		    }
	
		})
	    }

	static getFirstRules(event, workflowId:any){
		console.log('get First rules worfklow id',workflowId);
			try{
				console.log('db',db)
				new Model().db().findOne({workflow_id : workflowId, parent_id : null},
					(err:any,data:any)=>{
					console.log('findOneerrr',err);
					console.log('get First rules',data);
					if(data){
						const rootId = data._id;
						new Model().db().find({parent_id : rootId},(err,data) => {
							console.log('get First rules find',data);
							if(data){
								return event.returnValue = {
									success : true,
									data : data
								}
							}else{
								return event.returnValue = {
									success : false,
									data : null,
									msg : err
								}
							}

						})
					}else{
						return event.returnValue = {
							success : false,
							data : null,
							msg : err
						}
					}


				})
			}catch(e){
				console.log('Exception get First rules',e);
			}

		}
	    static first(event,args){

		db.db().findOne(Object.assign(args,{
		    'deleted_at' : null,
		}),(err,data) => {
		    if(data){
			return event.returnValue = {
			    success : true,
			    data : data
			}
		    }else{
			return event.returnValue = {
			    success : false
			}
		    }
	
		})
	    }

	    static delete(event, ...args){

		if(args.length >= 1){
		    db.db().remove(args[0],(err,data) => {
			if(data){
			    return event.returnValue = {
				success : true,
				data : data
			    }
			}else{
			    return event.returnValue = {
				success : false
			    }
			}
	
		    });
		}
	
	    }
	static index(event, args){

		db.db().find({is_deleted : 'N'},(err,data) => {
		    if(data){
			return event.returnValue = {
			    success : true,
			    data : data
			}
		    }
	
		})
	    }
	    static _insert(event,args){
			console.log('[WorkflowRule Insert]',args)
			db.db().insert(Object.assign(args[0],{
				'deleted_at' : null,
			}),(err,data) => {

				console.log('[WorkflowRule Insert after]',data)
				if(data){
					return event.autoReply({
						success : true,
						data :data
					})

				}

			});
	    }
	
	    static update(event,...args){
		db.db().update(args[1],{$set : args[0]},(err,data) => {
		    return event.returnValue = {
			success : true,
			data : data
		    };
		})
	    }


	static _getByWorkflowId(event,args:[{workflow_id : string}]){

		console.log('args',args);
		workflowService.getWorkflowRuleByWorkflowId(args[0].workflow_id)
			.then((result) => {
				console.log('get By workflow Idresult',result)
				event.autoReply(result);
			})
			.catch((err) => {
				console.log('get By workflow Idresult',err)
				event.autoReply(err);
			})

	}
}
	 
	
new BaseController(WorkFlowRule);