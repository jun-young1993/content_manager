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
exports.MediaService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var MediaService = /** @class */ (function (_super) {
    __extends(MediaService, _super);
    function MediaService() {
        return _super.call(this, {
            models: [
                'Content',
                'Media'
            ]
        }) || this;
    }
    MediaService.prototype.findOriginalByContentId = function (contentId) {
        return this.findTypeByContentId('original', contentId);
    };
    MediaService.prototype.findTypeByContentId = function (type, contentId) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.getModel('Media').findOne({ content_id: contentId, type: type }, function (err, media) {
                console.log('[find media by content id]', { content_id: contentId, type: type }, media);
                if (media) {
                    resolve({
                        success: true,
                        data: media
                    });
                }
                else {
                    reject({
                        success: false,
                        data: null,
                        err: err
                    });
                }
            });
        });
    };
    MediaService.prototype.findByMediaId = function (mediaId) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            _this_1.getModel('Media')
                .findOne({ _id: mediaId }, function (error, media) {
                if ((0, lodash_1.isEmpty)(media)) {
                    reject((0, ApiHelper_1.apiReject)("not found media by media_id : ".concat(mediaId)));
                }
                resolve((0, ApiHelper_1.apiResolve)(media));
            });
        });
    };
    MediaService.prototype.findOutByContentId = function (contentId) {
        return this.findTypeByContentId('out', contentId);
    };
    MediaService.prototype.findThumbnailByContentId = function (contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel("Content").findOne({ _id: contentId }, function (error, content) {
                if (content.content_type == 'image') {
                    resolve(_this.findTypeByContentId('original', contentId));
                }
                else {
                    resolve(_this.findTypeByContentId('thumbnail', contentId));
                }
            });
        });
    };
    MediaService.prototype.findProxyByContentId = function (contentId) {
        return this.findTypeByContentId('proxy', contentId);
    };
    return MediaService;
}(BaseService));
exports.MediaService = MediaService;
