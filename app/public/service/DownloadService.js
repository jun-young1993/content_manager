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
exports.DownloadService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var log = require('../lib/Logger');
var TaskManager_1 = require("../lib/Task/TaskManager");
var DownloadService = /** @class */ (function (_super) {
    __extends(DownloadService, _super);
    function DownloadService() {
        return _super.call(this, {
            models: [
                'Media',
                'Content'
            ]
        }) || this;
    }
    DownloadService.prototype.findMedia = function (mediaId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Media')
                .findOne({ _id: mediaId }, function (error, media) {
                if ((0, lodash_1.isEmpty)(media)) {
                    reject((0, ApiHelper_1.apiReject)("not found media by media_id : ".concat(mediaId)));
                }
                resolve((0, ApiHelper_1.apiResolve)(media));
            });
        });
    };
    DownloadService.prototype.downloadByMediaId = function (mediaId) {
        log.channel("download").info("[DownloadService][downloadByMediaId][START DOWNLOAD] MEDIA_ID : ".concat(mediaId));
        this.findMedia(mediaId)
            .then(function (resolve) {
            log.channel("download").info("[DownloadService][downloadByMediaId][DATA]", resolve);
            new TaskManager_1.TaskManager();
            // .onlineDownload();
        })["catch"](function (reject) {
            log.channel("download").info("[DownloadService][downloadByMediaId][reject]:", reject);
        });
    };
    return DownloadService;
}(BaseService));
exports.DownloadService = DownloadService;
