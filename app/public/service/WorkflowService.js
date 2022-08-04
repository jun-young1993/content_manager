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
var WorkflowService = /** @class */ (function (_super) {
    __extends(WorkflowService, _super);
    function WorkflowService() {
        return _super.call(this, {
            models: [
                'Workflow',
                'WorkflowRule'
            ]
        }) || this;
    }
    WorkflowService.prototype.hierarchyRuleByWorkflowId = function (workflowId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('WorkflowRule').find({ workflow_id: workflowId }, function (err, data) {
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Media').findOne({ content_id: contentId, type: type }, function (err, media) {
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
    return WorkflowService;
}(BaseService));
exports.WorkflowService = WorkflowService;
