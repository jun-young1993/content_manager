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
var TaskUpdater_1 = require("../TaskUpdater");
var log = require('../../Logger');
var ElectronHelper_1 = require("../../helper/ElectronHelper");
var FileManager = /** @class */ (function (_super) {
    __extends(FileManager, _super);
    function FileManager(params) {
        var _this_1 = _super.call(this, params) || this;
        _this_1.sourceState = { size: 0 };
        log.channel('fs').info('[Start Fs]', params);
        _this_1.params = params;
        var targetDir = _this_1.getTargetDir();
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        var _this = _this_1;
        _this_1.taskUpdater = new TaskUpdater_1.TaskUpdater(_this.getTaskId());
        var sourceFullPath = _this_1.getSourceFullPath();
        if (!fs.statSync(sourceFullPath)) {
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "error",
                messages: "[Fs]][error] not found source file"
            });
            _this.taskUpdater.error();
        }
        else {
            _this_1.sourceState = fs.statSync(sourceFullPath);
        }
        return _this_1;
    }
    FileManager.prototype.copy = function () {
        var taskId = this.getTaskId();
        var targetFullPath = this.getTargetFullPath();
        var sourceFullPath = this.getSourceFullPath();
        log.channel('fs').info("[Start Fs Copy] ".concat(sourceFullPath, " => ").concat(targetFullPath));
        (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
            variant: "info",
            messages: "[Fs][Copy][start]".concat(taskId, " ")
        });
        this._copy(sourceFullPath, targetFullPath, taskId);
    };
    FileManager.prototype._copy = function (sourceFullPath, targetFullPath, taskId) {
        var readed = 0;
        var sourceSize = this.sourceState.size;
        var _this = this;
        fs.createReadStream(sourceFullPath)
            .on('error', function (error) {
            log.channel('fs').info('[Fs Read Stream Error]', error);
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "error",
                messages: "[Fs]][Copy][error]".concat(taskId, " ").concat(error)
            });
            _this.taskUpdater.error();
        })
            .on('data', function (data) {
            readed += data.length;
            _this.taskUpdater.progress((readed / sourceSize * 100).toFixed(2));
        })
            .pipe(fs.createWriteStream(targetFullPath))
            .on('error', function (error) {
            log.channel('fs').info('[Fs Write Stream Error]', error);
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "error",
                messages: "[Fs]][Copy][error]".concat(taskId, " ").concat(error)
            });
            _this.taskUpdater.error();
        })
            .on('finish', function () {
            log.channel('fs').info("[Fs Complete] TaskId : ".concat(taskId));
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "success",
                messages: "[Fs][Copy][complete]".concat(taskId)
            });
            _this.taskUpdater.complete();
        });
    };
    FileManager.prototype["delete"] = function () {
        var _this = this;
        var taskId = this.getTaskId();
        var sourceFullPath = this.getSourceFullPath();
        log.channel('fs').info("[Start Fs Unlink] ".concat(sourceFullPath));
        (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
            variant: "info",
            messages: "[Fs][Unlink][start]".concat(taskId, " ")
        });
        fs.unlink(sourceFullPath, function (error) {
            if (error) {
                (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                    variant: "error",
                    messages: "[Fs][Unlink][error]".concat(taskId, " ").concat(error)
                });
                _this.taskUpdater.error();
                log.channel('fs').info('[Fs Unlink Exception]', error);
                return false;
            }
            log.channel('fs').info("[Fs Unlink Complete] TaskId : ".concat(taskId));
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "success",
                messages: "[Fs][Unlink][complete]".concat(taskId)
            });
            _this.taskUpdater.complete();
        });
    };
    return FileManager;
}(Property_1.Property));
exports.FileManager = FileManager;
