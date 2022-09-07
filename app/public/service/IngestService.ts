
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
const log = require("../lib/Logger");
import { WorkflowRuleInterface } from "../interfaces/WorkflowRuleInterface";
import { TaskManager } from "../lib/Task/TaskManager";
export interface outIngestFirstTask{
    content_id : string,
    workflow_id : string,
    module_id : string,
    rule_id : string,
    source : string,
    target : null,
    status : 'queue',
    priority : number
}

export class IngestService extends BaseService{
    constructor(){
        super({
            models : [
                'Content',
                'Media',
                'Task',
                'WorkflowRule'
            ]
        });
    }

   outIngestByContentId(contentId:string,source:string){
        const _this = this;
        log.channel('ingest').info(`[IngestService][ingestByContentId] content_id : ${contentId}`)
        return new Promise((resolve,reject) => {
            _this.getModel('Content').findOne({_id : contentId},(contentError,content: {_id : string,workflow_id : string}) => {
                if(isEmpty(content)){
                    reject(apiReject(`[IngestService][ingestByContentId] not found content content_id : ${contentId}`))
                }
                log.channel('ingest').info(`[IngestService][ingestByContentId] find content : `,content)
                const workflowId:string = content.workflow_id;
                
                log.channel('ingest').info(`[IngestService][ingestByContentId] workflow_id : ${workflowId}`);
                _this.getModel('WorkflowRule').findOne({workflow_id : workflowId , parent_id : null}
                    ,(workflowError, startWorkflowRule: WorkflowRuleInterface) => {
                        _this.getModel('WorkflowRule').findOne({parent_id : startWorkflowRule._id}
                            ,(workflowError, workflowFirstRule:WorkflowRuleInterface) => {
                                if(isEmpty(workflowFirstRule)){
                                    reject(apiReject(`[IngestService][ingestByContentId] not found first workflow rule workflowId : ${workflowId}`))
                                }   
                                log.channel('ingest').info(`[IngestService][ingestByContentId] Find WorkflowRule : `,workflowFirstRule)
                                const insertTaskData : outIngestFirstTask = {
                                    content_id : contentId,
                                    workflow_id : workflowId,
                                    module_id : workflowFirstRule.module_id,
                                    rule_id : workflowFirstRule._id,
                                    source : source,
                                    target : null,
                                    status : 'queue',
                                    priority : 0
                                }
                                _this.getModel('Task').insert(insertTaskData,(taskError,task) => {
                                    if(isEmpty(task)){
                                        reject(apiReject(`[IngestService][ingestByContentId] not found task`))
                                    }
                                    log.channel('ingest').info(`[IngestService][ingestByContentId] Insert Task : `,task)
                                    new TaskManager()
                                    .initialize()
                                    .then((taskParse:any) => {
                                        log.channel('ingest').info(`[IngestService][ingestByContentId] success Task : ${taskParse.data}`)
                                        resolve(apiResolve(taskParse));
                                    })
                                    .catch((taskParseError) => {
                                        reject(apiReject(`[IngestService][ingestByContentId] Fail Task Manager : ${taskParseError}`))
                                    })
                                })
                            })

                   
                })
            })
            
            // _this.getModel('Content').insert(metadata,(contentError, content) => {
            //     if(isEmpty(content)){
            //         reject(apiReject("[ContentService][createContent] fail content insert"));
            //     }

            //     resolve(apiResolve(content));
            // })
        })
   }

   

}