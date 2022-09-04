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
exports.CategoryService = void 0;
var BaseService_1 = require("./BaseService");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService() {
        return _super.call(this, {
            models: [
                'Category'
            ]
        }) || this;
    }
    CategoryService.prototype.create = function (mediaInfo, contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            mediaInfo['content_id'] = contentId;
            _this.getModel('MediaInfo').insert(mediaInfo, function (err, data) {
                return resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    /**
     * 카테고리 조회
     *
     * @param contentId
     */
    CategoryService.prototype.index = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Category').find({}, function (err, data) {
                return resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    return CategoryService;
}(BaseService_1.BaseService));
exports.CategoryService = CategoryService;
