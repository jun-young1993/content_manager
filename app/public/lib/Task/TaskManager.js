"use strict";
exports.__esModule = true;
exports.TaskManager = void 0;
var Task = require('../../models/Task').Task;
var TaskParse = require('./TaskParse').TaskParse;
var FileManager = require('./module/FileManager').FileManager;
var Media_1 = require("../../models/Media");
var WorkflowService_1 = require("../../service/WorkflowService");
var TaskService_1 = require("../../service/TaskService");
var workflowService = new WorkflowService_1.WorkflowService();
var taskService = new TaskService_1.TaskService();
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.TaskDb = new Task().db();
        this.MediaDb = new Media_1.Media().db();
        /*
        {
            status : 'queue'
        }
        */
    }
    TaskManager.prototype.get = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.TaskDb.find({ status: params.status })
                .sort({ priority: params.priority })
                .limit(params.limit)
                .exec(function (error, tasks) {
                if (tasks) {
                    resolve(tasks);
                }
                reject(error);
            });
        });
    };
    TaskManager.prototype.getQueued = function (params) {
        if (params === void 0) { params = {}; }
        var options = {
            status: 'queue',
            priority: -1,
            limit: 1
        };
        Object.assign(options, params);
        return this.get(options);
    };
    TaskManager.prototype.findQueued = function () {
        var parallerTask = 1;
        var taskDb = new Task().db();
        return new Promise(function (resolve, reject) {
            taskDb.count({ status: 'processing' }, function (error, count) {
                if (count >= parallerTask) {
                    resolve(null);
                }
                else {
                    taskDb.findOne({ status: 'queue' }, function (error, task) {
                        if (task) {
                            console.log('[in findQueued]', task);
                            taskDb.findOne({ _id: task._id }, function (error, taskInfo) {
                                console.log('findQueued', taskInfo);
                                resolve(taskInfo);
                            });
                        }
                        else {
                            reject(error);
                        }
                    });
                }
            });
            // .sort({priority : -1})
            // .exec((error:any,tasks:any) => {
            // 	if(tasks){
            // 		resolve(tasks);
            // 	}
            // 	reject(error);
            // });
        });
    };
    TaskManager.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.findQueued()
                .then(function (task) {
                if (task) {
                    new TaskParse(task)
                        .getTaskParse()
                        .then(function (parse) {
                        // const module = parse.module;
                        // module.copy();
                        resolve(parse);
                    });
                }
            })["catch"](function (err) {
                reject(err);
            });
        });
    };
    TaskManager.prototype.startWorkflow = function (options) {
        return new Promise(function (resolve, reject) {
            workflowService.firstWorkflowRuleByWorkflowId(options.workflow_id)
                .then(function (firstWorkflowRule) {
                var _a;
                var insertTask = {
                    content_id: options.content_id,
                    workflow_id: options.workflow_id,
                    module_id: firstWorkflowRule.data.module_id,
                    rule_id: firstWorkflowRule.data._id,
                    source: (_a = options.source) !== null && _a !== void 0 ? _a : null,
                    target: null,
                    status: 'queue',
                    priority: 0,
                    progress: 0
                };
                taskService.create(insertTask)
                    .then(function (task) {
                    resolve(task);
                })["catch"](function (taskCatch) {
                    reject(taskCatch);
                });
            })["catch"](function (firstWorkflowRuleCatch) {
                reject(firstWorkflowRuleCatch);
            });
        });
    };
    TaskManager.prototype.start = function () {
    };
    TaskManager.prototype.ingest = function () {
    };
    return TaskManager;
}());
exports.TaskManager = TaskManager;
