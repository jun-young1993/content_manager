// @ts-nocheck

import {BaseController} from "./BaseController";
import {Task as Model} from "../../../../models/Task";
import {TaskService} from "../../../../service/TaskService";

import convert = require("lodash/fp/convert");
import {ModuleService} from "../../../../service/ModuleService";
import {convertArrayToKeyValue} from "../../../../lib/helper/ApiHelper";
import {WorkflowService} from "../../../../service/WorkflowService";
import { isEmpty } from "lodash";
// import {User} from "@model/User";
const db = new Model();
const taskService = new TaskService();
const moduleService = new ModuleService();
const workflowService = new WorkflowService();
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.reply('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.returnValue = 'pong'
// })

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')
class Task {
    static _index(event, args){
        moduleService.index()
            .then((modules) => {
                const moduleCodes = convertArrayToKeyValue(modules.data,{
                    key : '_id',
                    value : 'name'
                });
                workflowService.indexByWorkflow()
                    .then((workflows) => {
                        const workflowCodes = convertArrayToKeyValue(workflows.data,{
                            key : '_id',
                            value : 'name'
                        })

                        taskService.index(args[0],args[1])
                            .then((tasks) => {
                                tasks.data.map((task) => {
                                    task.module_nm = moduleCodes[task.module_id];
                                    task.workflow_nm = workflowCodes[task.workflow_id];
                                })
                                event.autoReply(tasks);
                            })
                    })

            })

    }

    static _getStatus(event, args){
        taskService.find(args[0])
        .then((task) => {
            let progress = 0;
            if(!isEmpty(task)){
                if(!isEmpty(task.progress)){
                    progress = task.progress;
                }
                
            }

            event.autoReply(progress);
        })
    }

    static index(event, args){

        new Model().db().find({is_deleted : 'N'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static insert(event,args){

        new Model().db().insert(Object.assign(args,{
            'is_deleted' : "N",
            'deleted_at' : null,
        }),(err,data) => {


            if(data){


                return event.returnValue = {
                    success : true,
                    data :data
                }
            }

        });
    }

    static update(event,args){
        new Model().db().update(args,(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }
}


new BaseController(Task);

