"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var log = require('../../Logger');
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        log.channel('fs').info('[Start Fs]', params);
        this.params = params;
    }
    FileManager.prototype.copy = function () {
        var _this = this;
        log.channel('fs').info("[Start Fs Copy] ".concat(this.params.sourceMedia.full_path, " => ").concat(this.params.targetMedia.full_path));
        fs.createReadStream(this.params.sourceMedia.full_path)
            .on('error', function (error) {
            log.channel('fs').info('[Fs Read Stream Error]', error);
        })
            .pipe(fs.createWriteStream(this.params.targetMedia.full_path))
            .on('error', function (error) {
            log.channel('fs').info('[Fs Write Stream Error]', error);
        })
            .on('finish', function () {
            log.channel('fs').info("[Fs Complete] TaskId : ".concat(_this.params.task._id));
            new TaskUpdater(_this.params.task._id).complete();
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
