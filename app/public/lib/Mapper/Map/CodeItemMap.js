"use strict";
exports.__esModule = true;
exports.CodeItemMap = void 0;
var CodeItemService_1 = require("../../../service/CodeItemService");
var codeItemService = new CodeItemService_1.CodeItemService();
var CodeItemMap = /** @class */ (function () {
    function CodeItemMap() {
    }
    CodeItemMap.prototype.codeItemMapByParentCode = function (parentCode) {
        return new Promise(function (resolve, reject) {
            codeItemService
                .findByParentCodeUsingArray(parentCode)
                .then(function (codeArray) {
                resolve(codeArray['data']);
            });
        });
    };
    return CodeItemMap;
}());
exports.CodeItemMap = CodeItemMap;
