// @ts-nocheck

import {BaseController} from "./BaseController";
const {TaskManager} = require("../../../../lib/Task/TaskManager");
import {Workflow as Model} from "../../../../models/Workflow";
const db = new Model();
import {WorkflowRule as RuleModel} from "../../../../models/WorkflowRule";
const ruleModle = new RuleModel();
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
	    static insert(event,args){
	
		db.db().insert(Object.assign(args,{ 
		    'deleted_at' : null,
		}),(err,data) => {
	
	
		    if(data){
			ruleModle.db().insert({
				workflow_id : data._id,
				module_id : null,
				module_name : 'start workflow',
				parent_id : null
			},(err , data) => {
				return event.returnValue = {
					success : true,
					data :data
				}
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
}
new BaseController(WorkFlow);