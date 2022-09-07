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
onIpc("#ingest", function (event, args) {
    var dialog = getElectronModule('dialog');
    dialog.showOpenDialog(getBrowserWindow(), {
        properties: ['openFile', 'multiSelections']
    })
        .then(function (result) {
        if (!result.canceled && result.filePaths) {
            console.log(result.filePaths);
            var workflowId_1 = "YMxc6i1EeoDhTKgY";
            result.filePaths.map(function (file) {
                contentService.createContent({
                    workflow_id: workflowId_1,
                    title: path.basename(file)
                })
                    .then(function (content) {
                    workflowService.firstWorkflowRuleByWorkflowId(workflowId_1)
                        .then(function (firstWorkflowRule) {
                        var contentId = content.data._id;
                        var insertTask = {
                            content_id: contentId,
                            workflow_id: workflowId_1,
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
                            });
                        });
                    });
                });
            });
        }
        // event.reply("#ingest/reply",result);
    });
});
