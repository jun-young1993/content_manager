"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var WorkflowRule_1 = require("../../../../models/WorkflowRule");
var WorkflowService_1 = require("../../../../service/WorkflowService");
var CodeMapper_1 = require("../../../../lib/Mapper/CodeMapper");
var workflowService = new WorkflowService_1.WorkflowService();
var db = new WorkflowRule_1.WorkflowRule();
var codeMapper = new CodeMapper_1["default"]();
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
    WorkFlowRule._insert = function (event, args) {
        console.log('[WorkflowRule Insert]', args);
        db.db().insert(Object.assign(args[0], {
            'deleted_at': null
        }), function (err, data) {
            console.log('[WorkflowRule Insert after]', data);
            if (data) {
                return event.autoReply({
                    success: true,
                    data: data
                });
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
    WorkFlowRule._getByWorkflowId = function (event, args) {
        codeMapper.getModuleCodeMap()
            .then(function (moduleCodes) {
            console.log('moduleCodes', moduleCodes);
            workflowService.getWorkflowRuleByWorkflowId(args[0].workflow_id)
                .then(function (result) {
                console.log('get By workflow Idresult', result.data[1].module_info);
                result.data.map(function (rule) {
                    rule.source_media_nm = moduleCodes['media'][rule.source_media];
                    rule.target_media_nm = moduleCodes['media'][rule.target_media];
                    rule.source_storage_nm = moduleCodes['storage'][rule.source_storage];
                    rule.target_storage_nm = moduleCodes['storage'][rule.target_storage];
                    rule.task_type_nm = moduleCodes['task'][rule.task_type];
                    return rule;
                });
                event.autoReply(result);
            })["catch"](function (err) {
                console.log('get By workflow Idresult', err);
                event.autoReply(err);
            });
        });
    };
    return WorkFlowRule;
}());
new BaseController_1.BaseController(WorkFlowRule);
