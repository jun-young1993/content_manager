"use strict";
exports.__esModule = true;
exports.TaskManager = void 0;
var Task = require('@models/Task').Task;
var FileManager = require('@task/module/FileManager').FileManager;
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.TaskDb = new Task().db();
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
    TaskManager.prototype.findQueued = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var options = {
            status: 'queue',
            priority: -1,
            limit: 1
        };
        Object.assign(options, params);
        return new Promise(function (resolve, reject) {
            _this.getQueued(options).then(function (tasks) {
                if (tasks) {
                    resolve(tasks[0]);
                }
                reject(tasks);
            })["catch"](reject);
        });
    };
    TaskManager.prototype.ingest = function () {
        this.findQueued()
            .then(function (task) {
            console.log(task);
            new FileManager(task).copy();
        })["catch"](function (err) {
        });
    };
    return TaskManager;
}());
exports.TaskManager = TaskManager;
