// @ts-nocheck

import {BaseController} from "./BaseController";
import {Workflow as Model} from "../../../../models/Workflow";
import {WorkflowService} from "../../../../service/WorkflowService";

const {TaskManager} = require("../../../../lib/Task/TaskManager");
const db = new Model();

const workflowService = new WorkflowService();
class WorkFlow{
	static ingest(event,args){
		new TaskManager()
		.initialize()
		.then((taskParse:any) => {
			console.log('taskParse');
			console.log(taskParse);
			// taskParse.module.copy();
			return event.returnValue = {
				success : true,
				data : null
			}
		})
		.catch((error:any)=>{
			console.log('error');
			console.log(error);
			return event.returnValue = {
				success : false,
				data : null
			}
		})
	}

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

	static _all(event,args = {}){

		db.db().find(args[0],(err,data) => {
			if(data){
				return event.autoReplay({
					success : true,
					data : data
				})
			}

		})
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

			workflowService.create(args[0])
				.then((result) => {
					event.autoReplay(result);
				})
				.catch((err) => {
					console.log('[err]',err);
				})
	    }
	
	    static update(event,...args){
		db.db().update(args[1],{$set : args[0]},(err,data) => {
		    return event.returnValue = {
			success : true,
			data : data
		    };
		})
	    }

		static _delete(event,workflowIds:[string]){
			workflowService.removeWorkflow(workflowIds[0])
				.then((resolve) =>{
					event.autoReply(resolve);
				});

		}
}
new BaseController(WorkFlow);