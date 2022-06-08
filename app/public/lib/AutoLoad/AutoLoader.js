"use strict";
exports.__esModule = true;
exports.AutoLoader = void 0;
var glob = require("glob");
var AutoLoader = /** @class */ (function () {
    function AutoLoader(path) {
        this.path = path;
    }
    AutoLoader.prototype.loader = function () {
        var files = glob.sync(this.path);
        files.forEach(function (filePath) {
            require(filePath);
        });
    };
    return AutoLoader;
}());
exports.AutoLoader = AutoLoader;
