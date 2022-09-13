import {Workflow} from "../../models/Workflow";

const {Task} = require('../../models/Task');
const {WorkflowRule} = require('../../models/WorkflowRule')
import {TaskManager} from "./TaskManager";
const log = require('../Logger');
import { TaskStatus } from "../../interfaces/Types/TaskStatus";

export class TaskUpdater {
    private taskId:any = null;
    private taskModel : any = null;
    private workflowRuleModel : any = null
    private taskManager : any = null;
    private progressNumber : number = 0;
    constructor(taskId:any){
        this.taskId = taskId;
        this.taskModel = new Task().db();
        this.workflowRuleModel = new WorkflowRule().db();
        this.taskManager = new TaskManager();
    }

    nextTaskRule(){
        return new Promise((resolve , reject) => {
            this.taskModel.findOne({_id: this.taskId},(err:any, taskData:any)=>{
                if(taskData){
                    const ruleId = taskData.rule_id;
                    this.workflowRuleModel.find({parent_id : ruleId},(err:any , workflowRuleDatas:any)=> {
                        const insertTaskDatas:any = [];
                        
                        if(workflowRuleDatas.length != 0 ){
                            
                            workflowRuleDatas.map((rule:any) => {
                                log.channel('task_update').info('[Next Workflow Rule]',rule.module_name);
                                const insertTaskData = {
                                    content_id : taskData.content_id,
                                    workflow_id : taskData.workflow_id,
                                    module_id : rule.module_id,
                                    rule_id : rule._id,
                                    source : null,
                                    target : null,
                                    status : 'queue',
                                    priority : 0
                                }
                                
                                this.taskModel.insert(insertTaskData,(err:any,data:any)=> {
                                    
                                    insertTaskDatas.push(data);
                                    if(insertTaskDatas.length == workflowRuleDatas.length){
                                        resolve(insertTaskDatas);
                                    }
                                })
                            })
                        }else{
                            resolve(insertTaskDatas);
                        }


                    })
                }
            })
        })

    }
    nextTask(){
        const _this = this;
        _this.nextTaskRule().then((resolve) => {
            _this.taskManager.initialize()
            .then((taskParse:any) => {
                // console.log('update next module start')
                // taskParse.start();
            })
            .catch((reject:any) => {
                
            })
        })
    }
    complete(){
        const _this = this;
        _this.updateTaskStatus('complete',()=>{
            _this.taskModel.update({_id : _this.taskId},{$set : {progress : 100}},(err:any,update : any) => {
            });    
        });
    }

    error(){
        this.updateTaskStatus('error');
    }

    progress(progress:any){
        
//         Processing: undefined% done
            // [1] progress undefined
            // [1] Processing: undefined% done
            // [1] progress undefined
            // [1] Processing: undefined% done
            // [1] progress undefined
            // [1] Processing: 2.066415313225058% done
            // [1] progress 2.066415313225058
            // [1] Processing: 2.6283352668213458% done
            // [1] progress 2.6283352668213458
            // [1] Processing: 3.199318445475638% done
        const _this = this;
        if(progress){


            const currentProgress = parseInt(progress);
            if(currentProgress != this.progressNumber){
                this.taskModel.update({_id : _this.taskId},{$set : {progress : progress}},(err:any,update : any) => {
                    console.log('update progress');
                    this.progressNumber = currentProgress;
                });
            }
            

        }
        
    }


    updateTaskStatus(status:TaskStatus,callback ?: Function){
        const _this = this;
        log.channel('task_update').info(`[TaskUpdater][${status}] ${_this.taskId}`);
        this.taskModel.update({_id : _this.taskId},{$set : {status : status}},(err:any,update : any) => {
            
            log.channel('task_update').info(`[TaskUpdater][${status}] ${_this.taskId}`);
            
                if(update){
                    log.channel('task_update').info(`[TaskUpdater][${status}] Update Status  "${status} ${_this.taskId}"`);
                    this.taskModel.findOne({_id : this.taskId},(error:any , task : any)=> {
                        
                        log.channel('task_update').info(`[TaskUpdater][beforeNextTask][${_this.taskId}]`);
                        
                            _this.nextTask();

                            if(callback){
                                callback();
                            }
                   
     
                    })  
               }else{
                    log.channel('task_update').info(`[TaskUpdater][fail][${status}] Update Status  "${status} ${_this.taskId}"`,err);
               }
            
     
        })
    }
}