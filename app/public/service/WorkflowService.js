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
    WorkflowService.prototype.indexByWorkflowRule = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('WorkflowRule').find({}, function (err, datas) {
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
    WorkflowService.prototype.workflowRuleOrder = function (data) {
        var ruleOrderObj = {};
        data.map(function (child) {
            var key = child.parent_id;
            if (child.parent_id === null) {
                key = 'start';
            }
            ruleOrderObj[key] = child;
        });
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
    WorkflowService.prototype.workflowRulesOrderChange = function (datas) {
        var _this = this;
        var sortedRuleChangePromise = [];
        console.log('workflowRuleOrderChange', datas);
        return new Promise(function (resolve, reject) {
            datas.map(function (sortRule, index) {
                if (index >= 1) {
                    var parentId = datas[index - 1]._id;
                    var updateRule = {
                        parent_id: parentId,
                        rule_id: sortRule._id
                    };
                    sortedRuleChangePromise.push(_this.workflowRuleOrderChange(updateRule));
                }
            });
            Promise.all(sortedRuleChangePromise)
                .then(function (changed) {
                resolve(changed);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return WorkflowService;
}(BaseService));
exports.WorkflowService = WorkflowService;
