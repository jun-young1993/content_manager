

const {onIpc, sendIpc} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";
const log = require("../../../../lib/Logger");
import {TaskManager} from "../../../../lib/Task/TaskManager";


interface startWorkflowOptions {
    content_id : string
    workflow_id : string
}
onIpc("#start-workflow",(event:IpcMainEvent,options:startWorkflowOptions)=>{
            log.channel("start-workflow").info("[START-WORKFLOW]")
            log.channel("start-workflow").info(options);
            new TaskManager()
                .startWorkflow(options)
                .then((task:any) => {
                    log.channel('ingest').info(`[START-WORKFLOW]`);
                    log.channel('ingest').info(task);
                    new TaskManager()
                        .initialize()
                        .then((taskParse:any) => {
                            log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);

                            // resolve(taskParse);
                        })
                        .catch((exception) => {
                            log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
                            sendIpc("#ShowMessageAlert/reply",{
                                severity : "success",
                                title : "작업이 성공적으로 요청되었습니다."
                            })
                        })
                })
                .catch((taskException) => {
                    log.channel('ingest').info(`[START-WORKFLOW][EXCEPTION] ${taskException}`);
                    sendIpc("#ShowMessageAlert/reply",{
                        severity : "error",
                        title : "작업요청이 실패하였습니다."
                    })
                });

})