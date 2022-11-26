
const {BaseService} = require('../service/BaseService');
import {isEmpty} from "lodash";
import {apiReject, apiResolve} from "../lib/helper/ApiHelper";
import {WorkflowRuleInterface} from "../interfaces/WorkflowRuleInterface";
import {TaskManager} from "../lib/Task/TaskManager";
import {AllowExtentionType, OptionParse} from "../lib/Task/OptionParse";
import * as path from "path";
import {ContentService} from "./ContentService";
import * as Store from "electron-store";

const log = require("../lib/Logger");
const contentService = new ContentService();
const store = new Store();

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

    /**
     * 
     * @param file 
     * @param ingestType 
     * @param defaultValues 
     * @returns 
     */
   ingest(file:string,ingestType : string , defaultValues:any = {}){
	return new Promise((resolve, reject) => {
		const workflowId : any = store.get(`default_values.ingest_workflow_${ingestType}`);
		if(isEmpty(workflowId)){
			reject('not found ingest workflow');
		}
		contentService.createContent(Object.assign({
			workflow_id : workflowId,
			title : defaultValues.title || path.basename(file),
			content_type : ingestType
		},defaultValues))
		.then((content:any) => {
			log.channel('ingest').info(`[Ingest][Request][Create Content]`);
			log.channel('ingest').info(content);
			new TaskManager()
			.startWorkflow({
				content_id : content.data._id,
				workflow_id : workflowId,
				source : file
			})
			.then((task:any) => {
				resolve(task);
			});
		});
	})
   }

   outIngestByFiles(files:string[], defaultValues:any = {}){
    const _this = this;
    return new Promise((resolve,reject) => {        
        new OptionParse().getContentTypeByFiles(files)
            .then((result:AllowExtentionType) => {
                const ingestPromises: any = [];
            
                for(let ingestType in result){
                    for(let fileIndex = 0; fileIndex < result[ingestType].length; fileIndex++){
                        const filePath : string = result[ingestType][fileIndex];
                        log.channel('ingest').info(`[Ingest][Request][BeforeParams]`);
                        const normalizeFilePath :string = filePath.normalize("NFC");


                        
                        log.channel('ingest').info({
                            file_path : normalizeFilePath,
                            ingest_type : ingestType
                        });
                        ingestPromises.push(_this.ingest(normalizeFilePath,ingestType,defaultValues));
                        
                    }
                }

                Promise.all(ingestPromises)
                .then((ingestes) => {
                    new TaskManager()
                    .initialize()
                    .then((taskParse:any) => {
                        log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);
                        resolve(ingestes);
                        // sendIpc("#ShowMessageAlert/reply",{
                        //     severity : "success",
                        //     title : `작업요청에 성공했습니다.`
                        // })
                        // resolve(taskParse);
                    })
                    .catch((exception) => {
                        log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
                        reject(exception);
                        // sendIpc("#ShowMessageAlert/reply",{
                        //     severity : "error",
                        //     title : `작업요청에 실패했습니다.
                        //         ${exception}}`
                        // })
                    })
                    
                })
                .catch((ingestPromisesException) => {
                    log.channel('ingest').info(`[Ingest][Request][IngestPromisesException]`);
                    log.channel('ingest').info(ingestPromisesException);			
                    reject(ingestPromisesException);
                })
            })
            .catch((getContentTypeByFilesException) => {
                log.channel('ingest').info(`[Ingest][Request][GetContentTypeByFilesException]`);
                log.channel('ingest').info(getContentTypeByFilesException);		
                reject(getContentTypeByFilesException);
            })
        
        })
    }


   

}