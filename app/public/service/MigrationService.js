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
exports.MigrationService = void 0;
var BaseService_1 = require("./BaseService");
var lodash_1 = require("lodash");
var Logger_1 = require("../lib/Logger");
var MigrationService = /** @class */ (function (_super) {
    __extends(MigrationService, _super);
    function MigrationService(model) {
        var _this_1 = _super.call(this, {
            models: [
                model
            ]
        }) || this;
        _this_1.migModel = model;
        return _this_1;
    }
    MigrationService.prototype.findOrInsert = function (insertData) {
        var _this = this;
        _this.getModel(_this.migModel).findOne({ _id: insertData._id }, function (err, data) {
            (0, Logger_1.channel)('full').info("[MIGRATION BEFORE INSERT DATA] ".concat(_this.migModel), insertData);
            if ((0, lodash_1.isEmpty)(data)) {
                _this.getModel(_this.migModel).insert(insertData, function (insertErr, insertData) {
                    (0, Logger_1.channel)('full').info('[MIGRATION AFTER INSERT DATA]', insertData);
                });
            }
        });
    };
    return MigrationService;
}(BaseService_1.BaseService));
exports.MigrationService = MigrationService;
