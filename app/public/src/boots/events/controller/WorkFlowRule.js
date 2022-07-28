"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var WorkflowRule_1 = require("../../../../models/WorkflowRule");
var db = new WorkflowRule_1.WorkflowRule();
var WorkFlowRule = /** @class */ (function () {
    function WorkFlowRule() {
    }
    WorkFlowRule.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    WorkFlowRule.getFirstRules = function (event, workflowId) {
        console.log('get First rules worfklow id', workflowId);
        try {
            console.log('db', db);
            new WorkflowRule_1.WorkflowRule().db().findOne({ workflow_id: workflowId, parent_id: null }, function (err, data) {
                console.log('findOneerrr', err);
                console.log('get First rules', data);
                if (data) {
                    var rootId = data._id;
                    new WorkflowRule_1.WorkflowRule().db().find({ parent_id: rootId }, function (err, data) {
                        console.log('get First rules find', data);
                        if (data) {
                            return event.returnValue = {
                                success: true,
                                data: data
                            };
                        }
                        else {
                            return event.returnValue = {
                                success: false,
                                data: null,
                                msg: err
                            };
                        }
                    });
                }
                else {
                    return event.returnValue = {
                        success: false,
                        data: null,
                        msg: err
                    };
                }
            });
        }
        catch (e) {
            console.log('Exception get First rules', e);
        }
    };
    WorkFlowRule.first = function (event, args) {
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
    WorkFlowRule["delete"] = function (event) {
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
    WorkFlowRule.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    WorkFlowRule.insert = function (event, args) {
        console.log('[WorkflowRule Insert]', args);
        db.db().insert(Object.assign(args, {
            'deleted_at': null
        }), function (err, data) {
            console.log('[WorkflowRule Insert after]', data);
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    WorkFlowRule.update = function (event) {
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
    WorkFlowRule.getByWorkflowId = function (event, args) {
        new WorkflowRule_1.WorkflowRule().db().find(args, function (err, data) {
            console.log('args', args);
            console.log('data', data);
            data.map(function (child) {
                child.id = child._id;
                child.name = child.module_name;
                child.parentId = child.parent_id;
                return child;
            });
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    return WorkFlowRule;
}());
new BaseController_1.BaseController(WorkFlowRule);
