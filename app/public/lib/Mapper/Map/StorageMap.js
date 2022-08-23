"use strict";
exports.__esModule = true;
exports.StorageMap = void 0;
var StorageService_1 = require("../../../service/StorageService");
var storageService = new StorageService_1.StorageService();
var StorageMap = /** @class */ (function () {
    function StorageMap() {
    }
    StorageMap.prototype.codeMap = function () {
        return new Promise(function (resolve, reject) {
            storageService.getUsingArray()
                .then(function (storageArray) {
                resolve(storageArray['data']);
            });
        });
    };
    return StorageMap;
}());
exports.StorageMap = StorageMap;
