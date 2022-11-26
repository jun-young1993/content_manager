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
exports.IngestService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var TaskManager_1 = require("../lib/Task/TaskManager");
var OptionParse_1 = require("../lib/Task/OptionParse");
var path = require("path");
var ContentService_1 = require("./ContentService");
var Store = require("electron-store");
var log = require("../lib/Logger");
var contentService = new ContentService_1.ContentService();
var store = new Store();
var IngestService = /** @class */ (function (_super) {
    __extends(IngestService, _super);
    function IngestService() {
        return _super.call(this, {
            models: [
                'Content',
                'Media',
                'Task',
                'WorkflowRule'
            ]
        }) || this;
    }
    IngestService.prototype.outIngestByContentId = function (contentId, source) {
        var _this = this;
        log.channel('ingest').info("[IngestService][ingestByContentId] content_id : ".concat(contentId));
        return new Promise(function (resolve, reject) {
            _this.getModel('Content').findOne({ _id: contentId }, function (contentError, content) {
                if ((0, lodash_1.isEmpty)(content)) {
                    reject((0, ApiHelper_1.apiReject)("[IngestService][ingestByContentId] not found content content_id : ".concat(contentId)));
                }
                log.channel('ingest').info("[IngestService][ingestByContentId] find content : ", content);
                var workflowId = content.workflow_id;
                log.channel('ingest').info("[IngestService][ingestByContentId] workflow_id : ".concat(workflowId));
                _this.getModel('WorkflowRule').findOne({ workflow_id: workflowId, parent_id: null }, function (workflowError, startWorkflowRule) {
                    _this.getModel('WorkflowRule').findOne({ parent_id: startWorkflowRule._id }, function (workflowError, workflowFirstRule) {
                        if ((0, lodash_1.isEmpty)(workflowFirstRule)) {
                            reject((0, ApiHelper_1.apiReject)("[IngestService][ingestByContentId] not found first workflow rule workflowId : ".concat(workflowId)));
                        }
                        log.channel('ingest').info("[IngestService][ingestByContentId] Find WorkflowRule : ", workflowFirstRule);
                        var insertTaskData = {
                            content_id: contentId,
                            workflow_id: workflowId,
                            module_id: workflowFirstRule.module_id,
                            rule_id: workflowFirstRule._id,
                            source: source,
                            target: null,
                            status: 'queue',
                            priority: 0
                        };
                        _this.getModel('Task').insert(insertTaskData, function (taskError, task) {
                            if ((0, lodash_1.isEmpty)(task)) {
                                reject((0, ApiHelper_1.apiReject)("[IngestService][ingestByContentId] not found task"));
                            }
                            log.channel('ingest').info("[IngestService][ingestByContentId] Insert Task : ", task);
                            new TaskManager_1.TaskManager()
                                .initialize()
                                .then(function (taskParse) {
                                log.channel('ingest').info("[IngestService][ingestByContentId] success Task : ".concat(taskParse.data));
                                resolve((0, ApiHelper_1.apiResolve)(taskParse));
                            })["catch"](function (taskParseError) {
                                reject((0, ApiHelper_1.apiReject)("[IngestService][ingestByContentId] Fail Task Manager : ".concat(taskParseError)));
                            });
                        });
                    });
                });
            });
            // _this.getModel('Content').insert(metadata,(contentError, content) => {
            //     if(isEmpty(content)){
            //         reject(apiReject("[ContentService][createContent] fail content insert"));
            //     }
            //     resolve(apiResolve(content));
            // })
        });
    };
    /**
     *
     * @param file
     * @param ingestType
     * @param defaultValues
     * @returns
     */
    IngestService.prototype.ingest = function (file, ingestType, defaultValues) {
        if (defaultValues === void 0) { defaultValues = {}; }
        return new Promise(function (resolve, reject) {
            var workflowId = store.get("default_values.ingest_workflow_".concat(ingestType));
            if ((0, lodash_1.isEmpty)(workflowId)) {
                reject('not found ingest workflow');
            }
            contentService.createContent(Object.assign({
                workflow_id: workflowId,
                title: defaultValues.title || path.basename(file),
                content_type: ingestType
            }, defaultValues))
                .then(function (content) {
                log.channel('ingest').info("[Ingest][Request][Create Content]");
                log.channel('ingest').info(content);
                new TaskManager_1.TaskManager()
                    .startWorkflow({
                    content_id: content.data._id,
                    workflow_id: workflowId,
                    source: file
                })
                    .then(function (task) {
                    resolve(task);
                });
            });
        });
    };
    IngestService.prototype.outIngestByFiles = function (files, defaultValues) {
        if (defaultValues === void 0) { defaultValues = {}; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            new OptionParse_1.OptionParse().getContentTypeByFiles(files)
                .then(function (result) {
                var ingestPromises = [];
                for (var ingestType in result) {
                    for (var fileIndex = 0; fileIndex < result[ingestType].length; fileIndex++) {
                        var filePath = result[ingestType][fileIndex];
                        log.channel('ingest').info("[Ingest][Request][BeforeParams]");
                        var normalizeFilePath = filePath.normalize("NFC");
                        log.channel('ingest').info({
                            file_path: normalizeFilePath,
                            ingest_type: ingestType
                        });
                        ingestPromises.push(_this.ingest(normalizeFilePath, ingestType, defaultValues));
                    }
                }
                Promise.all(ingestPromises)
                    .then(function (ingestes) {
                    new TaskManager_1.TaskManager()
                        .initialize()
                        .then(function (taskParse) {
                        log.channel('ingest').info("[Ingest] success Task : ".concat(taskParse.data));
                        resolve(ingestes);
                        // sendIpc("#ShowMessageAlert/reply",{
                        //     severity : "success",
                        //     title : `작업요청에 성공했습니다.`
                        // })
                        // resolve(taskParse);
                    })["catch"](function (exception) {
                        log.channel('ingest').info("[Ingest][Exception] : ".concat(exception));
                        reject(exception);
                        // sendIpc("#ShowMessageAlert/reply",{
                        //     severity : "error",
                        //     title : `작업요청에 실패했습니다.
                        //         ${exception}}`
                        // })
                    });
                })["catch"](function (ingestPromisesException) {
                    log.channel('ingest').info("[Ingest][Request][IngestPromisesException]");
                    log.channel('ingest').info(ingestPromisesException);
                    reject(ingestPromisesException);
                });
            })["catch"](function (getContentTypeByFilesException) {
                log.channel('ingest').info("[Ingest][Request][GetContentTypeByFilesException]");
                log.channel('ingest').info(getContentTypeByFilesException);
                reject(getContentTypeByFilesException);
            });
        });
    };
    return IngestService;
}(BaseService));
exports.IngestService = IngestService;
