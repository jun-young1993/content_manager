"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TaskService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var TaskService = /** @class */ (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        return _super.call(this, {
            models: [
                'Task'
            ]
        }) || this;
    }
    TaskService.prototype.index = function (search, page) {
        var _this = this;
        console.log('search', search);
        console.log('page', page);
        return new Promise(function (resolve, reject) {
            var tasks = _this.getModel('Task').find(search);
            console.log('tasks', tasks);
            _this.pagenation(tasks, page)
                .then(function (result) {
                result.model
                    .sort({ createdAt: -1 })
                    .exec(function (err, data) {
                    console.log('data', data);
                    console.log('data.length', data.length);
                    resolve((0, ApiHelper_1.apiCountResolve)(data, result.count));
                });
            });
        });
    };
    TaskService.prototype.find = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Task').find({ _id: taskId }, function (error, task) {
                resolve(task);
            });
        });
    };
    TaskService.prototype.create = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Task').insert(data, function (error, task) {
                resolve(task);
            });
        });
    };
    return TaskService;
}(BaseService));
exports.TaskService = TaskService;
