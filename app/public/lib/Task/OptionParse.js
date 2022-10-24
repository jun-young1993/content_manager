"use strict";
exports.__esModule = true;
exports.OptionParse = void 0;
var CodeItemService = require("../../service/CodeItemService").CodeItemService;
var codeItemService = new CodeItemService();
var ApiHelper_1 = require("../helper/ApiHelper");
var path = require("path");
var OptionParse = /** @class */ (function () {
    function OptionParse() {
    }
    /**
     * 콘텐츠 타입별 허용 확장자
     *
     * @returns {Promise<AllowExtentionType>}
     * @memberof OptionParse
     */
    OptionParse.prototype.allowExtentions = function () {
        return new Promise(function (resolve) {
            codeItemService.findByParentCode("content_type")
                .then(function (result) {
                var contentTypes = (0, ApiHelper_1.convertArrayToKeyValue)(result.data, {
                    key: undefined,
                    value: 'code'
                });
                var allowExtenions = [];
                var allowExtentionParentCodeMap = {};
                contentTypes.map(function (ingestType) {
                    var allowExtentionCode = "".concat(ingestType, "_allow_extention");
                    allowExtentionParentCodeMap[allowExtentionCode] = ingestType;
                    allowExtenions.push(codeItemService.findByParentCode(allowExtentionCode));
                });
                Promise.all(allowExtenions)
                    .then(function (resolves) {
                    var allowExtention = {};
                    resolves.map(function (result) {
                        if (result.success === true) {
                            result.data.map(function (allowExtentionCodeItem) {
                                var ingestType = allowExtentionParentCodeMap[allowExtentionCodeItem.parent_code];
                                if (allowExtention[ingestType] === undefined) {
                                    allowExtention[ingestType] = [allowExtentionCodeItem.code];
                                }
                                else {
                                    allowExtention[ingestType].push(allowExtentionCodeItem.code);
                                }
                            });
                        }
                    });
                    resolve(allowExtention);
                });
            });
        });
    };
    OptionParse.prototype.getContentTypeByFiles = function (files) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.allowExtentions().then(function (result) {
                var ingestTypeByFiles = {};
                var extentionByMap = {};
                for (var ingestType in result) {
                    for (var extentionIndex = 0; extentionIndex < result[ingestType].length; extentionIndex++) {
                        extentionByMap[".".concat(result[ingestType][extentionIndex])] = ingestType;
                    }
                }
                for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    var fileName = files[fileIndex];
                    var extentionName = path.extname(fileName);
                    var ingestTypeByExtname = extentionByMap[extentionName];
                    if (ingestTypeByExtname === undefined) {
                        ingestTypeByExtname = 'other';
                    }
                    if (ingestTypeByFiles[ingestTypeByExtname] === undefined) {
                        ingestTypeByFiles[ingestTypeByExtname] = [fileName];
                    }
                    else {
                        ingestTypeByFiles[ingestTypeByExtname].push(fileName);
                    }
                }
                resolve(ingestTypeByFiles);
            });
        });
    };
    return OptionParse;
}());
exports.OptionParse = OptionParse;
