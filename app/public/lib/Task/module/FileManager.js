"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        console.log('fileManager module ', params.task);
        this.params = params;
    }
    FileManager.prototype.copy = function () {
        var _this = this;
        fs.createReadStream(this.params.sourceMedia.full_path)
            .on('error', function (error) {
            console.log('read stream error', error);
        })
            .pipe(fs.createWriteStream(this.params.targetMedia.full_path))
            .on('error', function (error) {
            console.log('write stream error', error);
        })
            .on('finish', function () {
            console.log('stream finish');
            new TaskUpdater(_this.params.task._id).complete();
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
