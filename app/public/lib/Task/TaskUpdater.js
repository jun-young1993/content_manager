"use strict";
exports.__esModule = true;
exports.TaskUpdater = void 0;
var Task = require('../../models/Task').Task;
var WorkflowRule = require('../../models/WorkflowRule').WorkflowRule;
var TaskManager_1 = require("./TaskManager");
var log = require('../Logger');
var TaskUpdater = /** @class */ (function () {
    function TaskUpdater(taskId) {
        this.taskId = null;
        this.taskModel = null;
        this.workflowRuleModel = null;
        this.taskManager = null;
        this.progressNumber = 0;
        this.taskId = taskId;
        this.taskModel = new Task().db();
        this.workflowRuleModel = new WorkflowRule().db();
        this.taskManager = new TaskManager_1.TaskManager();
    }
    TaskUpdater.prototype.nextTaskRule = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.taskModel.findOne({ _id: _this_1.taskId }, function (err, taskData) {
                if (taskData) {
                    var ruleId = taskData.rule_id;
                    _this_1.workflowRuleModel.find({ parent_id: ruleId }, function (err, workflowRuleDatas) {
                        var insertTaskDatas = [];
                        if (workflowRuleDatas.length != 0) {
                            workflowRuleDatas.map(function (rule) {
                                log.channel('task_update').info('[Next Workflow Rule]', rule.module_name);
                                var insertTaskData = {
                                    content_id: taskData.content_id,
                                    workflow_id: taskData.workflow_id,
                                    module_id: rule.module_id,
                                    rule_id: rule._id,
                                    source: null,
                                    target: null,
                                    status: 'queue',
                                    priority: 0
                                };
                                _this_1.taskModel.insert(insertTaskData, function (err, data) {
                                    insertTaskDatas.push(data);
                                    if (insertTaskDatas.length == workflowRuleDatas.length) {
                                        resolve(insertTaskDatas);
                                    }
                                });
                            });
                        }
                        else {
                            resolve(insertTaskDatas);
                        }
                    });
                }
            });
        });
    };
    TaskUpdater.prototype.nextTask = function () {
        var _this = this;
        _this.nextTaskRule().then(function (resolve) {
            _this.taskManager.initialize()
                .then(function (taskParse) {
                // console.log('update next module start')
                // taskParse.start();
            })["catch"](function (reject) {
            });
        });
    };
    TaskUpdater.prototype.complete = function () {
        var _this = this;
        _this.updateTaskStatus('complete', function () {
            _this.taskModel.update({ _id: _this.taskId }, { $set: { progress: 100 } }, function (err, update) {
            });
        });
    };
    TaskUpdater.prototype.error = function () {
        this.updateTaskStatus('error');
    };
    TaskUpdater.prototype.progress = function (progress) {
        var _this_1 = this;
        //         Processing: undefined% done
        // [1] progress undefined
        // [1] Processing: undefined% done
        // [1] progress undefined
        // [1] Processing: undefined% done
        // [1] progress undefined
        // [1] Processing: 2.066415313225058% done
        // [1] progress 2.066415313225058
        // [1] Processing: 2.6283352668213458% done
        // [1] progress 2.6283352668213458
        // [1] Processing: 3.199318445475638% done
        var _this = this;
        if (progress) {
            var currentProgress_1 = parseInt(progress);
            if (currentProgress_1 != this.progressNumber) {
                this.taskModel.update({ _id: _this.taskId }, { $set: { progress: progress } }, function (err, update) {
                    console.log('update progress');
                    _this_1.progressNumber = currentProgress_1;
                });
            }
        }
    };
    TaskUpdater.prototype.updateTaskStatus = function (status, callback) {
        var _this_1 = this;
        var _this = this;
        log.channel('task_update').info("[TaskUpdater][".concat(status, "] ").concat(_this.taskId));
        this.taskModel.update({ _id: _this.taskId }, { $set: { status: status } }, function (err, update) {
            log.channel('task_update').info("[TaskUpdater][".concat(status, "] ").concat(_this.taskId));
            if (update) {
                log.channel('task_update').info("[TaskUpdater][".concat(status, "] Update Status  \"").concat(status, " ").concat(_this.taskId, "\""));
                _this_1.taskModel.findOne({ _id: _this_1.taskId }, function (error, task) {
                    console.log('after update task info', task);
                    _this.nextTask();
                    if (callback) {
                        callback();
                    }
                });
            }
            else {
                log.channel('task_update').info("[TaskUpdater][".concat(status, "] Update Status  \"").concat(status, " ").concat(_this.taskId, "\""), err);
            }
        });
    };
    return TaskUpdater;
}());
exports.TaskUpdater = TaskUpdater;
