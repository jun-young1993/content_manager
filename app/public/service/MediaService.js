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
var BaseService = require('@service/BaseService').BaseService;
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
    MediaService.prototype.findOutByContentId = function (contentId) {
        return this.findTypeByContentId('out', contentId);
    };
    return MediaService;
}(BaseService));
exports.MediaService = MediaService;
