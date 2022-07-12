"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var Storage = require("@models/storage").Storage;
// const {TaskParse} = require("@task/TaskParse");
var FileManager = /** @class */ (function () {
    function FileManager(task) {
        Storage.db().findOne({ code: task.target_storage }, function (err, data) {
            console.log('data', data);
            console.log('err', err);
        });
        this.readStream = fs.createReadStream(task.source_storage);
        // this.writeStream = fs.createWriteStream()
    }
    FileManager.prototype.copy = function (task) {
    };
    return FileManager;
}());
exports.FileManager = FileManager;
