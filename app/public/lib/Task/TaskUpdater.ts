import {Workflow} from "../../models/Workflow";

const {Task} = require('../../models/Task');
const {WorkflowRule} = require('../../models/WorkflowRule')
import {TaskManager} from "./TaskManager";

export class TaskUpdater {
    private taskId:any = null;
    private taskModel : any = null;
    private workflowRuleModel : any = null
    private taskManager : any = null;
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

    complete(){
        const _this = this;
        this.taskModel.update({_id : this.taskId},{$set : {status : 'complete'}},(err:any,update : any) => {
            console.log('update complete task id ',this.taskId)
            this.taskModel.findOne({_id : this.taskId},(error:any , task : any)=> {
                console.log('after update task info',task);
                if(update){
       
                    _this.nextTaskRule().then((resolve) => {
                        console.log('next Tassk rule',resolve);
                    _this.taskManager.initialize()
                        .then((taskParse:any) => {
                            // console.log('update next module start')
                            // taskParse.start();
                        })
                        .catch((reject:any) => {
                            
                        })

                    })
     
              
            }
            })
     
        })
    }
}