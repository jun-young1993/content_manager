"use strict";
exports.__esModule = true;
exports.BaseService = void 0;
var BaseService = /** @class */ (function () {
    function BaseService(property) {
        var _this = this;
        this.model = [];
        // const {Field} = require('../../../public/models/Field')
        property.models.forEach(function (model) {
            _this.model[model] = require('@models/' + model);
        });
    }
    BaseService.prototype.getModel = function (modelName) {
        return new this.model[modelName][modelName]().db();
    };
    return BaseService;
}());
exports.BaseService = BaseService;
