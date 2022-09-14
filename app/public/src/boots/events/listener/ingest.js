"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
var ContentService_1 = require("../../../../service/ContentService");
var WorkflowService_1 = require("../../../../service/WorkflowService");
var TaskService_1 = require("../../../../service/TaskService");
var TaskManager_1 = require("../../../../lib/Task/TaskManager");
var log = require("../../../../lib/Logger");
var contentService = new ContentService_1.ContentService();
var workflowService = new WorkflowService_1.WorkflowService();
var taskService = new TaskService_1.TaskService();
var path = require("path");
var ElectronHelper_1 = require("../../../../lib/helper/ElectronHelper");
var ingest = function (file, defaultValues) {
    return new Promise(function (resolve, reject) {
        var workflowId = "user_out_ingest";
        contentService.createContent(Object.assign({
            workflow_id: workflowId,
            title: path.basename(file)
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
var recuriveIngest = function (files, defaultValues, number) {
    if (number === void 0) { number = 0; }
    log.channel('ingest').info("[Ingest][Request] : ".concat(number));
    log.channel('ingest').info(files);
    ingest(files[number], defaultValues)
        .then(function (result) {
        log.channel('ingest').info("[Ingest][Request] : ".concat(number, "  ").concat(files.length - 1));
        log.channel('ingest').info(files);
        if (number < (files.length - 1)) {
            recuriveIngest(files, defaultValues, number + 1);
        }
        else {
            new TaskManager_1.TaskManager()
                .initialize()
                .then(function (taskParse) {
                log.channel('ingest').info("[Ingest] success Task : ".concat(taskParse.data));
                // resolve(taskParse);
            })["catch"](function (exception) {
                log.channel('ingest').info("[Ingest][Exception] : ".concat(exception));
                (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                    severity: "success",
                    title: "작업이 성공적으로 요청되었습니다."
                });
            });
        }
    });
};
onIpc("#ingest", function (event, defaultValues) {
    var dialog = getElectronModule('dialog');
    dialog.showOpenDialog(getBrowserWindow(), {
        properties: ['openFile', 'multiSelections']
    })
        .then(function (result) {
        event.reply("#ingest/reply");
        if (!result.canceled && result.filePaths) {
            console.log(result.filePaths);
            // result.filePaths.map((file:string) => {
            // })
            recuriveIngest(result.filePaths, defaultValues);
        }
        // event.reply("#ingest/reply",result);
    });
});
