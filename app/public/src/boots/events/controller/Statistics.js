"use strict";
exports.__esModule = true;
var CodeItemService_1 = require("../../../../service/CodeItemService");
var BaseController_1 = require("./BaseController");
var ContentService_1 = require("../../../../service/ContentService");
var codeItemService = new CodeItemService_1.CodeItemService();
var contentService = new ContentService_1.ContentService();
var Statistics = /** @class */ (function () {
    function Statistics() {
    }
    Statistics.$content = function (event, args) {
        console.log("=>(Statistics.ts:8) statistics content");
        return new Promise(function (resolve, reject) {
            codeItemService.findByParentCode("content_type")
                .then(function (contentTypes) {
                var contentCountByContentTypePromise = [];
                contentTypes.data.map(function (contentType) {
                    contentCountByContentTypePromise.push(new Promise(function (resolve, reject) {
                        contentService.getCount({ content_type: contentType.code })
                            .then(function (contentCount) {
                            resolve({
                                content_type: contentType.code,
                                content_type_nm: contentType.name,
                                count: contentCount.data
                            });
                        });
                    }));
                });
                Promise.all(contentCountByContentTypePromise)
                    .then(function (result) {
                    console.log("=>(Statistics.ts:23) result", result);
                    resolve(result);
                });
            });
        });
    };
    return Statistics;
}());
new BaseController_1.BaseController(Statistics);
