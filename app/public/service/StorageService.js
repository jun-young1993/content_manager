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
exports.StorageService = void 0;
var BaseService_1 = require("./BaseService");
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var StorageService = /** @class */ (function (_super) {
    __extends(StorageService, _super);
    function StorageService() {
        return _super.call(this, {
            models: [
                'Storage'
            ]
        }) || this;
    }
    StorageService.prototype.getUsingArray = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Storage').find({}, function (err, storage) {
                if ((0, lodash_1.isEmpty)(storage)) {
                    reject((0, ApiHelper_1.apiReject)("[StorageService][getUsingArray] not found storage"));
                }
                var storageArray = [];
                storage.map(function (storageElement) {
                    storageArray[storageElement.code] = storageElement.name;
                });
                resolve((0, ApiHelper_1.apiResolve)(storageArray));
            });
        });
    };
    return StorageService;
}(BaseService_1.BaseService));
exports.StorageService = StorageService;
