"use strict";
exports.__esModule = true;
exports.TaskManager = void 0;
var Task = require('../../models/Task').Task;
var getBrowserWindow = require("../helper/ElectronHelper").getBrowserWindow;
var TaskParse = require('./TaskParse').TaskParse;
var FileManager = require('./module/FileManager').FileManager;
var Media_1 = require("../../models/Media");
var WorkflowService_1 = require("../../service/WorkflowService");
var ModuleService_1 = require("../../service/ModuleService");
var TaskService_1 = require("../../service/TaskService");
var workflowService = new WorkflowService_1.WorkflowService();
var taskService = new TaskService_1.TaskService();
var moduleService = new ModuleService_1.ModuleService();
var lodash_1 = require("lodash");
var electron_1 = require("electron");
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
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.TaskDb.find({ status: params.status })
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
        });
    };
    TaskManager.prototype.initialize = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.findQueued()
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
    /**
     * 워크플로우 아이디로 start_workflow 다음의 첫번째 룰 대기 작업 데이터 세팅
     *
     * @param options - StartWorkflowOptions
     *
     * @returns object TaskInterface
     */
    TaskManager.prototype.settingInsertTask = function (options) {
        return new Promise(function (resolve, reject) {
            workflowService.firstWorkflowRuleByWorkflowId(options.workflow_id)
                .then(function (firstWorkflowRule) {
                var moduleId = firstWorkflowRule.data.module_id;
                console.log('moduleId', moduleId);
                moduleService.find(moduleId)
                    .then(function (module) {
                    var _a;
                    console.log('module', module);
                    var sourceMedia = module.data.source_storage;
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
                    console.log("sourceMedia", sourceMedia);
                    console.log("options.source", options.source);
                    if (sourceMedia === "out" && (0, lodash_1.isEmpty)(options.source)) {
                        electron_1.dialog.showOpenDialog(getBrowserWindow(), {
                            properties: ['openFile']
                        })
                            .then(function (result) {
                            if (!result.canceled && result.filePaths) {
                                var files = result.filePaths;
                                insertTask.source = files[0];
                                resolve(insertTask);
                            }
                        });
                    }
                    else {
                        resolve(insertTask);
                    }
                });
            });
        });
    };
    /**
     *
     * options.workflow_id(워크플로우) 첫번째 작업을 조회후 대기 상태로 작업 생성
     * options.source가 없을경우 dialog 호출
     *
     * @param options - StartWorkflowOptions
     * @returns Promise
     */
    TaskManager.prototype.startWorkflow = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.settingInsertTask(options)
                .then(function (result) {
                console.log("result", result);
                taskService.create(result)
                    .then(function (task) {
                    resolve(task);
                })["catch"](function (taskCatch) {
                    reject(taskCatch);
                });
            });
            // workflowService.firstWorkflowRuleByWorkflowId(options.workflow_id)
            // .then((firstWorkflowRule:any) => {
            // const insertTask : TaskInterface = {
            // 	content_id :options.content_id,
            // 	workflow_id : options.workflow_id,
            // 	module_id : firstWorkflowRule.data.module_id,
            // 	rule_id : firstWorkflowRule.data._id,
            // 	source : options.source ?? null,
            // 	target : null,
            // 	status : 'queue',
            // 	priority : 0,
            // 	progress : 0
            // }
            // taskService.create(insertTask)
            // .then((task) => {
            // 	resolve(task);
            // })
            // .catch((taskCatch) => {
            // 	reject(taskCatch);
            // })
            // })
            // .catch((firstWorkflowRuleCatch) => {
            // 	reject(firstWorkflowRuleCatch);
            // })
        });
    };
    TaskManager.prototype.start = function () {
    };
    TaskManager.prototype.ingest = function () {
    };
    return TaskManager;
}());
exports.TaskManager = TaskManager;
