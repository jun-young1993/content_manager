"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
var electron_1 = require("electron");
var ContentService_1 = require("../../../../service/ContentService");
var WorkflowService_1 = require("../../../../service/WorkflowService");
var TaskService_1 = require("../../../../service/TaskService");
var TaskManager_1 = require("../../../../lib/Task/TaskManager");
var OptionParse_1 = require("../../../../lib/Task/OptionParse");
var path = require("path");
var ElectronHelper_1 = require("../../../../lib/helper/ElectronHelper");
var lodash_1 = require("lodash");
var CodeItemService_1 = require("../../../../service/CodeItemService");
var log = require("../../../../lib/Logger");
var contentService = new ContentService_1.ContentService();
var workflowService = new WorkflowService_1.WorkflowService();
var taskService = new TaskService_1.TaskService();
var codeItemService = new CodeItemService_1.CodeItemService;
var Store = require("electron-store");
var store = new Store();
/**
 *
 * @param file
 * @param ingestType
 * @param defaultValues
 * @returns
 */
var ingest = function (file, ingestType, defaultValues) {
    if (defaultValues === void 0) { defaultValues = {}; }
    return new Promise(function (resolve, reject) {
        var workflowId = store.get("default_values.ingest_workflow_".concat(ingestType));
        if ((0, lodash_1.isEmpty)(workflowId)) {
            reject('not found ingest workflow');
        }
        contentService.createContent(Object.assign({
            workflow_id: workflowId,
            title: path.basename(file),
            content_type: ingestType
        }, defaultValues))
            .then(function (content) {
            log.channel('ingest').info("[Ingest][Request][Create Content]");
            log.channel('ingest').info(content);
            new TaskManager_1.TaskManager()
                .startWorkflow({
                content_id: content.data._id,
                workflow_id: workflowId,
                source: file
            })
                .then(function (task) {
                resolve(task);
            });
        });
    });
};
// const recuriveIngest = (files:string[],defaultValues:{}, number:number=0) => {
// 	log.channel('ingest').info(`[Ingest][Request] : ${number}`);
// 	log.channel('ingest').info(files);
// 	ingest(files[number],defaultValues)
// 	.then((result) => {
// 		log.channel('ingest').info(`[Ingest][Request] : ${number}  ${files.length - 1}`);
// 		log.channel('ingest').info(files);
// 		if(number < (files.length - 1)){
// 			recuriveIngest(files,defaultValues,number+1);
// 		}else{
// 			new TaskManager()
// 			.initialize()
// 			.then((taskParse:any) => {
// 				log.channel('ingest').info(`[Ingest] success Task : ${taskParse.data}`);
// 				// resolve(taskParse);
// 			})
// 			.catch((exception) => {
// 				log.channel('ingest').info(`[Ingest][Exception] : ${exception}`);
// 				sendIpc("#ShowMessageAlert/reply",{
// 					severity : "error",
// 					title : `작업이 실행에 실패했습니다.
// 						${exception}}`
// 				})
// 			})
// 		}
// 	})
// 	.catch((error) => {
// 		log.channel('ingest').error(`[Ingest][Request Exception] : ${error}`);
// 		sendIpc("#ShowMessageAlert/reply",{
// 			severity : "error",
// 			title : `작업요청에 실패했습니다. 
// 				${error}`
// 		})
// 	})
// }
// const extentionValid = (files:string[], ingestType : string) => {
// 	return new Promise((resolve,reject) => {
// 		codeItemService.findByParentCode(`${ingestType}_allow_extention`)
// 		.then((codes:any) => {
// 			let extentions:string[] = [];
// 			codes.data.map((code : {code : string}) => {
// 				extentions.push(code.code.toLowerCase());
// 			})
// 			return files.map((file:string,index:number) => {
// 				const ext:string = path.extname(file).slice(1);
// 				if(extentions.indexOf(ext.toLowerCase()) === -1){
// 					return	reject(`허용가능한 확장자(${extentions.join()})만 선택해 다시요청해주세요.`);
// 				}
// 				if((files.length -1) === index){
// 					return resolve(files);
// 				}
// 			})
// 		}) 
// 	})
// }
electron_1.ipcMain.handle("$ingest", function (event) {
    return new Promise(function (resolve) {
        var dialog = getElectronModule('dialog');
        dialog.showOpenDialog(getBrowserWindow(), {
            properties: ['openFile', 'multiSelections']
        })
            .then(function (result) {
            if (!result.canceled && result.filePaths) {
                log.channel('ingest').info("[Ingest][Request][SelectedFiles]");
                log.channel('ingest').info(result.filePaths);
                var files = result.filePaths;
                new OptionParse_1.OptionParse().getContentTypeByFiles(files)
                    .then(function (result) {
                    var ingestPromises = [];
                    for (var ingestType in result) {
                        for (var fileIndex = 0; fileIndex < result[ingestType].length; fileIndex++) {
                            var filePath = result[ingestType][fileIndex];
                            log.channel('ingest').info("[Ingest][Request][BeforeParams]");
                            log.channel('ingest').info({
                                file_path: filePath,
                                ingest_type: ingestType
                            });
                            ingestPromises.push(ingest(filePath, ingestType));
                        }
                    }
                    Promise.all(ingestPromises)
                        .then(function (ingestes) {
                        new TaskManager_1.TaskManager()
                            .initialize()
                            .then(function (taskParse) {
                            log.channel('ingest').info("[Ingest] success Task : ".concat(taskParse.data));
                            resolve(ingestes);
                            (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                                severity: "success",
                                title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4."
                            });
                            // resolve(taskParse);
                        })["catch"](function (exception) {
                            log.channel('ingest').info("[Ingest][Exception] : ".concat(exception));
                            (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                                severity: "error",
                                title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.\n\t\t\t\t\t\t\t\t\t".concat(exception, "}")
                            });
                        });
                    })["catch"](function (ingestPromisesException) {
                        log.channel('ingest').info("[Ingest][Request][IngestPromisesException]");
                        log.channel('ingest').info(ingestPromisesException);
                    });
                })["catch"](function (getContentTypeByFilesException) {
                    log.channel('ingest').info("[Ingest][Request][GetContentTypeByFilesException]");
                    log.channel('ingest').info(getContentTypeByFilesException);
                });
            }
        })["catch"](function (dialogException) {
            log.channel('ingest').info("[Ingest][Request][DialogException]");
            log.channel('ingest').info(dialogException);
        });
    });
    // recurciveIngest(result);
});
// onIpc("#ingest",(event:IpcMainEvent,defaultValues:{ingest_type : string}) => {
// 	const dialog = getElectronModule('dialog');
// 	dialog.showOpenDialog(getBrowserWindow(),{
// 		properties:['openFile','multiSelections']
// 	})
// 	.then((result) => {
// 		event.reply("#ingest/reply");
// 		if(!result.canceled && result.filePaths){
// 			const files : string[] = result.filePaths;
// 			extentionValid(files,defaultValues.ingest_type)		
// 			.then((valid) => {
// 				recuriveIngest(files,defaultValues)
// 			})
// 			.catch((validException) => {
// 				sendIpc("#ShowMessageAlert/reply",{
// 					severity : "error",
// 					title : `${validException}`
// 				})
// 			})
// 			// result.filePaths.map((file:string) => {
// 			// })
// 		}
// 		// event.reply("#ingest/reply",result);
// 	});
// })
