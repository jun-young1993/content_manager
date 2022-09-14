"use strict";
exports.__esModule = true;
exports.BaseService = void 0;
var BaseService = /** @class */ (function () {
    function BaseService(property) {
        var _this = this;
        this.model = [];
        property.models.forEach(function (model) {
            // @ts-ignore
            var modelClass = require('../models/' + model)[model];
            // @ts-ignore
            _this.model[model] = new modelClass().db();
        });
    }
    BaseService.prototype.getModel = function (modelName) {
        // @ts-ignore
        return this.model[modelName];
    };
    BaseService.prototype.pagenation = function (model, page) {
        var size = page.size;
        var currentPage = page.page * size;
        return new Promise(function (resolve, reject) {
            model.db.count(model.query, function (error, count) {
                resolve({
                    model: model.skip(currentPage).limit(size),
                    count: count
                });
            });
        });
    };
    return BaseService;
}());
exports.BaseService = BaseService;
