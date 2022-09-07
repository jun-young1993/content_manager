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
var ingest = function (file) {
    return new Promise(function (resolve, reject) {
        var workflowId = "YMxc6i1EeoDhTKgY";
        contentService.createContent({
            workflow_id: workflowId,
            title: path.basename(file)
        })
            .then(function (content) {
            workflowService.firstWorkflowRuleByWorkflowId(workflowId)
                .then(function (firstWorkflowRule) {
                var contentId = content.data._id;
                var insertTask = {
                    content_id: contentId,
                    workflow_id: workflowId,
                    module_id: firstWorkflowRule.data.module_id,
                    rule_id: firstWorkflowRule.data._id,
                    source: file,
                    target: null,
                    status: 'queue',
                    priority: 0
                };
                taskService.create(insertTask)
                    .then(function (task) {
                    new TaskManager_1.TaskManager()
                        .initialize()
                        .then(function (taskParse) {
                        log.channel('ingest').info("[Ingest] success Task : ".concat(taskParse.data));
                        (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                            severity: "success",
                            title: "작업이 성공적으로 요청되었습니다."
                        });
                        resolve(taskParse);
                    });
                });
            });
        });
    });
};
var recuriveIngest = function (files, number) {
    if (number === void 0) { number = 0; }
    ingest(files[number])
        .then(function (result) {
        if (number <= (files.length - 1)) {
            recuriveIngest(files, number + 1);
        }
    });
};
onIpc("#ingest", function (event, args) {
    var dialog = getElectronModule('dialog');
    dialog.showOpenDialog(getBrowserWindow(), {
        properties: ['openFile', 'multiSelections']
    })
        .then(function (result) {
        if (!result.canceled && result.filePaths) {
            console.log(result.filePaths);
            var workflowId = "YMxc6i1EeoDhTKgY";
            // result.filePaths.map((file:string) => {
            // })
            recuriveIngest(result.filePaths);
        }
        // event.reply("#ingest/reply",result);
    });
});
