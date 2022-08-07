"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var TaskManager = require("../../../../lib/Task/TaskManager").TaskManager;
var Workflow_1 = require("../../../../models/Workflow");
var db = new Workflow_1.Workflow();
var WorkflowService_1 = require("../../../../service/WorkflowService");
var workflowService = new WorkflowService_1.WorkflowService();
var WorkFlow = /** @class */ (function () {
    function WorkFlow() {
    }
    WorkFlow.ingest = function (event, args) {
        new TaskManager()
            .initialize()
            .then(function (taskParse) {
            console.log('taskParse');
            console.log(taskParse);
            // taskParse.module.copy();
            return event.returnValue = {
                success: true,
                data: null
            };
        })["catch"](function (error) {
            console.log('error');
            console.log(error);
            return event.returnValue = {
                success: false,
                data: null
            };
        });
    };
    WorkFlow.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    WorkFlow._all = function (event) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    WorkFlow.first = function (event, args) {
        db.db().findOne(Object.assign(args, {
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
            else {
                return event.returnValue = {
                    success: false
                };
            }
        });
    };
    WorkFlow["delete"] = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length >= 1) {
            db.db().remove(args[0], function (err, data) {
                if (data) {
                    return event.returnValue = {
                        success: true,
                        data: data
                    };
                }
                else {
                    return event.returnValue = {
                        success: false
                    };
                }
            });
        }
    };
    WorkFlow.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    WorkFlow._insert = function (event, args) {
        workflowService.create(args[0])
            .then(function (result) {
            event.autoReplay(result);
        })["catch"](function (err) {
            console.log('[err]', err);
        });
    };
    WorkFlow.update = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return WorkFlow;
}());
new BaseController_1.BaseController(WorkFlow);
