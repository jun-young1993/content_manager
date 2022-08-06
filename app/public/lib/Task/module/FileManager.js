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
exports.FileManager = void 0;
var Property_1 = require("./Property");
var fs = require("fs");
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var log = require('../../Logger');
var FileManager = /** @class */ (function (_super) {
    __extends(FileManager, _super);
    function FileManager(params) {
        var _this = _super.call(this, params) || this;
        log.channel('fs').info('[Start Fs]', params);
        _this.params = params;
        return _this;
    }
    FileManager.prototype.copy = function () {
        var taskId = this.getTaskId();
        var targetFullPath = this.getTargetFullPath();
        var sourceFullPath = this.getSourceFullPath();
        log.channel('fs').info("[Start Fs Copy] ".concat(sourceFullPath, " => ").concat(targetFullPath));
        this._copy(sourceFullPath, targetFullPath, taskId);
    };
    FileManager.prototype._copy = function (sourceFullPath, targetFullPath, taskId) {
        fs.createReadStream(sourceFullPath)
            .on('error', function (error) {
            log.channel('fs').info('[Fs Read Stream Error]', error);
        })
            .pipe(fs.createWriteStream(targetFullPath))
            .on('error', function (error) {
            log.channel('fs').info('[Fs Write Stream Error]', error);
        })
            .on('finish', function () {
            log.channel('fs').info("[Fs Complete] TaskId : ".concat(taskId));
            new TaskUpdater(taskId).complete();
        });
    };
    return FileManager;
}(Property_1.Property));
exports.FileManager = FileManager;
