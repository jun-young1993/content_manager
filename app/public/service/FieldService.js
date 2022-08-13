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
exports.FieldService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var FieldService = /** @class */ (function (_super) {
    __extends(FieldService, _super);
    function FieldService() {
        return _super.call(this, {
            models: [
                'Field'
            ]
        }) || this;
    }
    FieldService.prototype.getSearchFields = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Field').find({ search_yn: "Y" }, function (err, data) {
                resolve((0, ApiHelper_1.apiResolve)(data));
            });
        });
    };
    return FieldService;
}(BaseService));
exports.FieldService = FieldService;
