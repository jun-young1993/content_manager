"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(params) {
        this.params = params;
    }
    FileManager.prototype.copy = function () {
        fs.createReadStream(this.params.source).pipe(fs.createWriteStream(this.params.target));
    };
    return FileManager;
}());
exports.FileManager = FileManager;
