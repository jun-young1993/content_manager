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
exports.MediaInfoService = void 0;
var BaseService_1 = require("./BaseService");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var MediaInfoService = /** @class */ (function (_super) {
    __extends(MediaInfoService, _super);
    function MediaInfoService() {
        return _super.call(this, {
            models: [
                'MediaInfo'
            ]
        }) || this;
    }
    MediaInfoService.prototype.create = function (mediaInfo, contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            mediaInfo['content_id'] = contentId;
            _this.getModel('MediaInfo').insert(mediaInfo, function (err, data) {
                return resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    /**
     * 미디어 인포 정보 조회
     *
     * @param contentId
     */
    MediaInfoService.prototype.index = function (contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('MediaInfo').find({ content_id: contentId }, function (err, data) {
                return resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    return MediaInfoService;
}(BaseService_1.BaseService));
exports.MediaInfoService = MediaInfoService;
