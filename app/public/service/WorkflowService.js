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
exports.WorkflowService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var createTreeHierarchy = require('hierarchy-js').createTreeHierarchy;
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var WorkflowService = /** @class */ (function (_super) {
    __extends(WorkflowService, _super);
    function WorkflowService() {
        return _super.call(this, {
            models: [
                'Workflow',
                'WorkflowRule',
                'Module'
            ]
        }) || this;
    }
    WorkflowService.prototype.indexByWorkflow = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Workflow').find({}, function (err, datas) {
                resolve((0, ApiHelper_1.apiResolve)(datas));
            });
        });
    };
    WorkflowService.prototype.indexByWorkflowRule = function (args) {
        if (args === void 0) { args = {}; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('WorkflowRule').find(args, function (err, datas) {
                resolve((0, ApiHelper_1.apiResolve)(datas));
            });
        });
    };
    WorkflowService.prototype.hierarchyRuleByWorkflowId = function (workflowId) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.getModel('WorkflowRule').find({ workflow_id: workflowId }, function (err, data) {
                data.map(function (child) {
                    child.id = child._id;
                    child.name = child.module_name;
                    child.parentId = child.parent_id;
                    return child;
                });
                resolve(createTreeHierarchy(data));
            });
        });
    };
    WorkflowService.prototype.findOriginalByContentId = function (contentId) {
        return this.findTypeByContentId('original', contentId);
    };
    WorkflowService.prototype.findTypeByContentId = function (type, contentId) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.getModel('Media').findOne({ content_id: contentId, type: type }, function (err, media) {
                resolve({
                    success: true,
                    data: media
                });
            });
        });
    };
    WorkflowService.prototype.findOutByContentId = function (contentId) {
        return this.findTypeByContentId('out', contentId);
    };
    WorkflowService.prototype.create = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Workflow').insert(data, function (err, result) {
                if ((0, lodash_1.isEmpty)(result)) {
                    reject((0, ApiHelper_1.apiReject)("[WorklfowService][create] insert fail workflow"));
                }
                _this.getModel('WorkflowRule').insert({
                    workflow_id: result._id,
                    module_id: null,
                    module_name: 'start workflow',
                    parent_id: null
                }, function (workflowRuleErr, workflowRuleResult) {
                    resolve((0, ApiHelper_1.apiResolve)(workflowRuleResult));
                });
            });
        });
    };
    WorkflowService.prototype.getWorkflowRuleByWorkflowId = function (workflowId) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[getWorkflowRuleByWorkflowId]', workflowId);
            _this.getModel('WorkflowRule').find({ workflow_id: workflowId }, function (err, data) {
                if ((0, lodash_1.isEmpty)(data)) {
                }
                data.map(function (child) {
                    child.id = child._id;
                    child.name = child.module_name;
                    child.parentId = child.parent_id;
                    // const ruleModule = moduleList[child.module_id]
                    // if(!isEmpty(ruleModule)){
                    // 	child.
                    // }
                    return child;
                });
                var orderRule = _this_1.workflowRuleOrder(data);
                _this_1.mergeModuleInfo(orderRule)
                    .then(function (workflowRuleDetail) {
                    resolve((0, ApiHelper_1.apiResolve)(workflowRuleDetail));
                });
            });
        });
    };
    /**
     *
     * w
     *
     * @param workflowId
     * @returns
     */
    WorkflowService.prototype.getWorkflowRuleIdsByWorkflowId = function (workflowId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getWorkflowRuleByWorkflowId(workflowId)
                .then(function (result) {
                var ids = [];
                result.data.map(function (rule) {
                    ids.push(rule._id);
                });
                resolve((0, ApiHelper_1.apiResolve)(ids));
            });
        });
    };
    WorkflowService.prototype.firstWorkflowRuleByWorkflowId = function (workflowId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[getWorkflowRuleByWorkflowId]', workflowId);
            _this.getModel('WorkflowRule').findOne({ workflow_id: workflowId, parent_id: null }, function (err, startWorkflowRule) {
                var startWorkflowId = startWorkflowRule._id;
                _this.getModel('WorkflowRule').findOne({ parent_id: startWorkflowId }, function (error, firstWorkflowRule) {
                    resolve((0, ApiHelper_1.apiResolve)(firstWorkflowRule));
                });
            });
        });
    };
    WorkflowService.prototype.workflowRuleOrder = function (data) {
        var ruleOrderObj = {};
        console.log('workflowRuleORder data', data);
        data.map(function (child) {
            var key = child.parent_id;
            if (child.parent_id === null) {
                key = 'start';
            }
            ruleOrderObj[key] = child;
        });
        if ((0, lodash_1.isEmpty)(ruleOrderObj)) {
            return data;
        }
        var orderParentWorkflowId = ruleOrderObj['start']._id;
        var ruleOrder = [ruleOrderObj['start']];
        for (var i = 1; i < data.length; i++) {
            var childWorkflow = ruleOrderObj[orderParentWorkflowId];
            console.log(childWorkflow);
            if (!(0, lodash_1.isEmpty)(childWorkflow)) {
                ruleOrder.push(childWorkflow);
                orderParentWorkflowId = childWorkflow._id;
            }
        }
        return ruleOrder;
    };
    WorkflowService.prototype.mergeModuleInfo = function (data) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            var moduleIds = [];
            data.map(function (child) {
                var moduleId = child.module_id;
                moduleIds.push(moduleId);
                return child;
            });
            _this_1.getModel('Module')
                .find({ _id: { $in: moduleIds } }, function (error, modules) {
                var keyByModule = {};
                modules.map(function (module) {
                    keyByModule[module._id] = module;
                });
                var worklfowRuleDetail = [];
                data.map(function (child) {
                    var moduleId = child.module_id;
                    var moduleInfo = keyByModule[moduleId];
                    if (!(0, lodash_1.isEmpty)(moduleInfo)) {
                        child.source_media = moduleInfo.source_media;
                        child.target_media = moduleInfo.target_media;
                        child.source_storage = moduleInfo.source_storage;
                        child.target_storage = moduleInfo.target_storage;
                        child.module_name = moduleInfo.name;
                        child.task_type = moduleInfo.task_type;
                    }
                    worklfowRuleDetail.push(child);
                });
                resolve(worklfowRuleDetail);
            });
        });
    };
    WorkflowService.prototype.workflowRuleOrderChange = function (data) {
        var _this = this;
        console.log('workflowRuleOrderChange', data);
        return new Promise(function (resolve, reject) {
            _this.getModel("WorkflowRule").update({ _id: data.rule_id }, { $set: { parent_id: data.parent_id } }, function (error, result) {
                if (result) {
                    resolve((0, ApiHelper_1.apiResolve)(result));
                }
                else {
                    reject((0, ApiHelper_1.apiReject)(result));
                }
            });
        });
    };
    WorkflowService.prototype.insert = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel("WorkflowRule").insert(data, function (error, data) {
                resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    WorkflowService.prototype.workflowRuleRemove = function (ruleId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('REMOVE PROMISE', ruleId);
            _this.getModel("WorkflowRule").findOne({ _id: ruleId }, function (err, rule) {
                console.log('remove ', rule);
                if ((0, lodash_1.isEmpty)(rule.parent_id)) {
                    console.log('rule.parent_id else', rule.parent_id);
                    resolve((0, ApiHelper_1.apiResolve)("start workflow"));
                }
                else {
                    console.log('rule.parent_id', rule.parent_id);
                    _this.getModel("WorkflowRule").remove({ _id: ruleId }, function (error, remove) {
                        console.log('removed', rule._id);
                        resolve((0, ApiHelper_1.apiResolve)(remove));
                    });
                }
            });
        });
    };
    WorkflowService.prototype.removeWorkflow = function (workflowId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel("Workflow").remove({ _id: workflowId }, function (error, workflowRemoved) {
                if (workflowRemoved) {
                    _this.getModel("WorkflowRule").remove({ workflow_id: workflowId }, function (error, workflowRuleRemoved) {
                        if (workflowRuleRemoved) {
                            resolve((0, ApiHelper_1.apiResolve)());
                        }
                    });
                }
            });
        });
    };
    WorkflowService.prototype.workflowRulesOrderChange = function (datas) {
        var _this = this;
        var sortedRuleChangePromise = [];
        console.log('workflowRuleOrderChange', datas);
        return new Promise(function (resolve, reject) {
            var startWorkflowModule = datas[0];
            _this.getWorkflowRuleIdsByWorkflowId(startWorkflowModule.workflow_id)
                .then(function (ruleIds) {
                var workflowRuleIds = ruleIds.data;
                datas.map(function (sortRule, index) {
                    if (index >= 1) {
                        var parentRule = datas[index - 1];
                        var parentId = parentRule._id;
                        var updateRule = {
                            parent_id: parentId,
                            rule_id: sortRule._id
                        };
                        var noDeleteRule = workflowRuleIds.indexOf(sortRule._id);
                        if (noDeleteRule > -1) {
                            console.log('cancel ', sortRule._id);
                            workflowRuleIds.splice(noDeleteRule, 1);
                        }
                        if ((0, lodash_1.isEmpty)(sortRule.workflow_id)) {
                            var insertData = {
                                workflow_id: startWorkflowModule.workflow_id,
                                _id: sortRule._id,
                                module_id: sortRule.module_id,
                                module_name: sortRule.module_name,
                                parent_id: parentId
                            };
                            sortedRuleChangePromise.push(_this.insert(insertData));
                        }
                        else {
                            sortedRuleChangePromise.push(_this.workflowRuleOrderChange(updateRule));
                        }
                    }
                });
                console.log('workflowRuleIds', workflowRuleIds);
                workflowRuleIds.map(function (deleteRuleId) {
                    sortedRuleChangePromise.push(_this.workflowRuleRemove(deleteRuleId));
                });
                Promise.all(sortedRuleChangePromise)
                    .then(function (changed) {
                    resolve(changed);
                })["catch"](function (error) {
                    reject(error);
                });
            });
        });
    };
    return WorkflowService;
}(BaseService));
exports.WorkflowService = WorkflowService;
