"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Task_1 = require("../../../../models/Task");
var TaskService_1 = require("../../../../service/TaskService");
var ModuleService_1 = require("../../../../service/ModuleService");
var ApiHelper_1 = require("../../../../lib/helper/ApiHelper");
var WorkflowService_1 = require("../../../../service/WorkflowService");
// import {User} from "@model/User";
var db = new Task_1.Task();
var taskService = new TaskService_1.TaskService();
var moduleService = new ModuleService_1.ModuleService();
var workflowService = new WorkflowService_1.WorkflowService();
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.reply('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.returnValue = 'pong'
// })
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')
var Task = /** @class */ (function () {
    function Task() {
    }
    Task._index = function (event, args) {
        moduleService.index()
            .then(function (modules) {
            var moduleCodes = (0, ApiHelper_1.convertArrayToKeyValue)(modules.data, {
                key: '_id',
                value: 'name'
            });
            workflowService.indexByWorkflow()
                .then(function (workflows) {
                var workflowCodes = (0, ApiHelper_1.convertArrayToKeyValue)(workflows.data, {
                    key: '_id',
                    value: 'name'
                });
                taskService.index(args[0])
                    .then(function (tasks) {
                    tasks.data.map(function (task) {
                        task.module_nm = moduleCodes[task.module_id];
                        task.workflow_nm = workflowCodes[task.workflow_id];
                    });
                    event.autoReply(tasks);
                });
            });
        });
    };
    Task.index = function (event, args) {
        new Task_1.Task().db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Task.insert = function (event, args) {
        new Task_1.Task().db().insert(Object.assign(args, {
            'is_deleted': "N",
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Task.update = function (event, args) {
        new Task_1.Task().db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return Task;
}());
new BaseController_1.BaseController(Task);
