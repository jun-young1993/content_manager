"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        console.log('[start FileManager]');
        this.params = params;
        this.taskUpdater = new TaskUpdater(params._id);
    }
    FileManager.prototype.copy = function () {
        var _this = this;
        fs.createReadStream(this.params.source)
            .on('error', function (error) {
            console.log('read stream error', error);
        })
            .pipe(fs.createWriteStream(this.params.target))
            .on('error', function (error) {
            console.log('write stream error', error);
        })
            .on('finish', function () {
            console.log('stream finish');
            _this.taskUpdater.complete();
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
