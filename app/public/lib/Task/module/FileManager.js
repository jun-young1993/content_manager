"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        console.log('[start FileManager]');
        this.params = params;
    }
    FileManager.prototype.copy = function () {
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
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
