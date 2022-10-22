

const {onIpc, sendIpc} = require('../../../../lib/helper/ElectronHelper')
import {ipcMain, IpcMainEvent, IpcMainInvokeEvent, ipcRenderer} from "electron";
import {TaskManager} from "../../../../lib/Task/TaskManager";

const log = require("../../../../lib/Logger");


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
                            sendIpc("#ShowMessageAlert/reply",{
                                severity : "success",
                                title : "작업이 성공적으로 요청되었습니다."
                            })
                            ipcRenderer.removeAllListeners("#start-workflow");
                            // resolve(taskParse);
                        })
                        .catch((exception) => {
                            log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
                            sendIpc("#ShowMessageAlert/reply",{
                                severity : "success",
                                title : `작업 생성에 실패했습니다. ${exception}`
                            })
                            ipcRenderer.removeAllListeners("#start-workflow");
                        })
                })
                .catch((taskException) => {
                    log.channel('ingest').info(`[START-WORKFLOW][EXCEPTION] ${taskException}`);
                    sendIpc("#ShowMessageAlert/reply",{
                        severity : "error",
                        title : `작업요청이 실패하였습니다. ${taskException}`
                    })
                    ipcRenderer.removeAllListeners("#start-workflow");
                });

})

ipcMain.handle('$start-workflow',(event:IpcMainInvokeEvent, options:startWorkflowOptions) => {
    log.channel('ingest').info('[START-WORKFLOW PARAMS ]');
    log.channel('ingest').info(options);
    return new Promise((resolve,reject) => {
        new TaskManager()
        .startWorkflow(options[0])
        .then((task:any) => {
            log.channel('ingest').info(`[START-WORKFLOW]`);
            log.channel('ingest').info(task);
            new TaskManager()
                .initialize()
                .then((taskParse:any) => {
                    log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);
                    sendIpc("#ShowMessageAlert/reply",{
                        severity : "success",
                        title : "작업이 성공적으로 요청되었습니다."
                    })

                    resolve(taskParse);
                })
                .catch((exception) => {
                    log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
                    reject(exception);
                })
        })
        .catch((taskException) => {
            log.channel('ingest').info(`[START-WORKFLOW][EXCEPTION] ${taskException}`);
            reject(taskException);
        });
    })

});