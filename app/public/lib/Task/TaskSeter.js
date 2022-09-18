"use strict";
exports.__esModule = true;
exports.TaskSeter = void 0;
var lodash_1 = require("lodash");
var Task_1 = require("../../models/Task");
var ApiHelper_1 = require("../helper/ApiHelper");
var TaskManager_1 = require("./TaskManager");
var TaskSeter = /** @class */ (function () {
    function TaskSeter(sourceMedia) {
        this.sourceMedia = sourceMedia;
    }
    TaskSeter.prototype.download = function (target) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sourceMedia = _this.sourceMedia;
            var insertTaskData = {
                content_id: sourceMedia.content_id,
                workflow_id: '',
                module_id: '',
                rule_id: '',
                source: sourceMedia.full_path,
                target: target,
                status: 'queue',
                priority: 0,
                progress: 0
            };
            if (!sourceMedia.is_media) {
            }
            new Task_1.Task().db().insert(insertTaskData, function (error, task) {
                if ((0, lodash_1.isEmpty)(task)) {
                    reject((0, ApiHelper_1.apiReject)('[TaskSeter][download] fail insert task'));
                }
                new TaskManager_1.TaskManager().initialize();
                resolve((0, ApiHelper_1.apiResolve)(task));
            });
        });
    };
    return TaskSeter;
}());
exports.TaskSeter = TaskSeter;
