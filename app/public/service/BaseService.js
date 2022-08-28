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
    BaseService.prototype.formatIndexParams = function (params) {
        if (params === void 0) { params = {}; }
        var newParams = {};
        if (params['start_date'] && params['end_date']) {
            var startDate = new Date(new Date(params['start_date']).getFullYear(), new Date(params['start_date']).getMonth(), new Date(params['start_date']).getDate());
            console.log('조건');
            var endDate = new Date(new Date(params['end_date']).getFullYear(), new Date(params['end_date']).getMonth(), new Date(params['end_date']).getDate(), 23, 59, 59);
            newParams['createdAt'] = { $gt: startDate, $lt: endDate };
        }
        for (var property in params) {
            if (property == 'start_date' || property == 'end_date') {
                continue;
            }
        }
        return newParams;
    };
    return BaseService;
}());
exports.BaseService = BaseService;
