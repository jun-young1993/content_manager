"use strict";
exports.__esModule = true;
exports.OptionParse = void 0;
var ApiHelper_1 = require("../helper/ApiHelper");
var fs = require("fs");
var path = require("path");
var CodeItemService = require("../../service/CodeItemService").CodeItemService;
var codeItemService = new CodeItemService();
var log = require('../Logger');
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
                log.channel('option_parse').info("[OPTION PARSE][findByParentCode]", result);
                var contentTypes = (0, ApiHelper_1.convertArrayToKeyValue)(result.data, {
                    key: undefined,
                    value: 'code'
                });
                log.channel('option_parse').info("[OPTION PARSE][contentTypes]", contentTypes);
                var allowExtenions = [];
                var allowExtentionParentCodeMap = {};
                contentTypes.map(function (ingestType) {
                    if (ingestType !== "folder") {
                        var allowExtentionCode = "".concat(ingestType, "_allow_extention");
                        allowExtentionParentCodeMap[allowExtentionCode] = ingestType;
                        allowExtenions.push(codeItemService.findByParentCode(allowExtentionCode));
                    }
                });
                log.channel('option_parse').info("[OPTION PARSE][allowExtenions]", allowExtenions);
                log.channel('option_parse').info("[OPTION PARSE][allowExtentionParentCodeMap]", allowExtentionParentCodeMap);
                Promise.all(allowExtenions)
                    .then(function (resolves) {
                    log.channel('option_parse').info("[OPTION PARSE][PromiseAll Allow Extention]", allowExtenions);
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
        log.channel('option_parse').info("[OPTION PARSE][getContentTypeByFiles]", files);
        var _this = this;
        return new Promise(function (resolve) {
            _this.allowExtentions().then(function (result) {
                log.channel('option_parse').info("[OPTION PARSE][getContentTypeByFiles allowExtentions]", result);
                var ingestTypeByFiles = {};
                var extentionByMap = {};
                for (var ingestType in result) {
                    for (var extentionIndex = 0; extentionIndex < result[ingestType].length; extentionIndex++) {
                        extentionByMap[".".concat(result[ingestType][extentionIndex].toLowerCase())] = ingestType;
                    }
                }
                log.channel('option_parse').info("[OPTION PARSE][ingestTypeByFiles]", ingestTypeByFiles);
                log.channel('option_parse').info("[OPTION PARSE][extentionByMap]", extentionByMap);
                for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    var fileName = files[fileIndex].normalize("NFC");
                    log.channel('option_parse').info("[OPTION PARSE][fileName]", fileName);
                    var extentionName = path.extname(fileName).toLowerCase();
                    log.channel('option_parse').info("[OPTION PARSE][extentionName]", extentionName);
                    var ingestTypeByExtname = extentionByMap[extentionName];
                    if (ingestTypeByExtname === undefined) {
                        ingestTypeByExtname = 'other';
                    }
                    if (fs.lstatSync(fileName).isDirectory()) {
                        ingestTypeByExtname = "folder";
                    }
                    if (ingestTypeByFiles[ingestTypeByExtname] === undefined) {
                        ingestTypeByFiles[ingestTypeByExtname] = [fileName];
                    }
                    else {
                        ingestTypeByFiles[ingestTypeByExtname].push(fileName);
                    }
                }
                log.channel('option_parse').info("[OPTION PARSE][ingestTypeByFiles]", ingestTypeByFiles);
                resolve(ingestTypeByFiles);
            });
        });
    };
    return OptionParse;
}());
exports.OptionParse = OptionParse;
