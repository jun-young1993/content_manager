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
exports.ContentService = void 0;
var BaseService = require('../service/BaseService').BaseService;
var lodash_1 = require("lodash");
var ApiHelper_1 = require("../lib/helper/ApiHelper");
var ContentService = /** @class */ (function (_super) {
    __extends(ContentService, _super);
    function ContentService() {
        return _super.call(this, {
            models: [
                'Content',
                'Media',
                'Field'
            ]
        }) || this;
    }
    ContentService.prototype.createContent = function (metadata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Content').insert(metadata, function (contentError, content) {
                if ((0, lodash_1.isEmpty)(content)) {
                    reject((0, ApiHelper_1.apiReject)("[ContentService][createContent] fail content insert"));
                }
                resolve((0, ApiHelper_1.apiResolve)(content));
            });
        });
    };
    ContentService.prototype.getContent = function (search, page) {
        if (search === void 0) { search = {}; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            // const size:number = page.size;
            // let currentPage:number = page.page * size;
            // console.log('currentPge',currentPage);
            // _this.getModel('Content').count(search,(error,count:number) => {
            var contents = _this.getModel('Content').find(search);
            _this.pagenation(contents, page)
                .then(function (result) {
                result.model
                    .sort({ createdAt: -1 })
                    .exec(function (err, data) {
                    resolve((0, ApiHelper_1.apiCountResolve)(data, result.count));
                });
            });
            // .skip(currentPage).limit(size).sort({createdAt: -1}).exec((err,data) => {
            // if(err){
            //     return reject(apiReject("[ContentService][getContent] find fail by content"))
            // }
            // return resolve(apiResolve(data));
        });
        // })
        // })
    };
    ContentService.prototype.getCount = function (search) {
        if (search === void 0) { search = {}; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Content').count(search, function (error, count) {
                return resolve((0, ApiHelper_1.apiResolve)(count));
            });
        });
    };
    ContentService.prototype.update = function (contentId, metadata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Content').update({ _id: contentId }, { $set: metadata }, function (error, update) {
                return resolve((0, ApiHelper_1.apiResolve)(update));
            });
        });
    };
    return ContentService;
}(BaseService));
exports.ContentService = ContentService;
