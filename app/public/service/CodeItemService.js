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
exports.CodeItemService = void 0;
var BaseService_1 = require("./BaseService");
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var CodeItemService = /** @class */ (function (_super) {
    __extends(CodeItemService, _super);
    function CodeItemService() {
        return _super.call(this, {
            models: [
                'CodeItem'
            ]
        }) || this;
    }
    CodeItemService.prototype.findByParentCode = function (parentCode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('CodeItem').find({ parent_code: parentCode }).sort({ order: 1 }).exec(function (err, codes) {
                if ((0, lodash_1.isEmpty)(codes)) {
                    reject((0, ApiHelper_1.apiReject)('[CodeItemService][findByParentCode] not found codes'));
                }
                resolve((0, ApiHelper_1.apiResolve)(codes));
            });
        });
    };
    CodeItemService.prototype.findByParentCodeUsingArray = function (parentCode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.findByParentCode(parentCode).then(function (codes) {
                var codeArray = [];
                codes.data.map(function (code) {
                    codeArray[code.code] = code.name;
                });
                resolve((0, ApiHelper_1.apiResolve)(codeArray));
            });
        });
    };
    return CodeItemService;
}(BaseService_1.BaseService));
exports.CodeItemService = CodeItemService;
