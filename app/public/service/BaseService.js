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
    return BaseService;
}());
exports.BaseService = BaseService;
