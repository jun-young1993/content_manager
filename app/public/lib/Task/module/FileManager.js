"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        console.log('start fileManager');
        console.log(params);
        // this.readStream = fs.createReadStream(task.source_storage);
        // this.writeStream = fs.createWriteStream()
    }
    FileManager.prototype.copy = function (task) {
    };
    return FileManager;
}());
exports.FileManager = FileManager;
