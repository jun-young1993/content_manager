"use strict";
exports.__esModule = true;
exports.AutoLoader = void 0;
var glob = require("glob");
var path = require("path");
var AutoLoader = /** @class */ (function () {
    function AutoLoader(path, options) {
        this.options = options || {};
        this.path = path;
    }
    AutoLoader.prototype.loader = function (options) {
        var _this = this;
        var files = glob.sync(this.path, options || {});
        var requireProcessed = 0;
        files.forEach(function (filePath, index) {
            console.log('filePath', path.basename(filePath));
            requireProcessed++;
            require(filePath);
            if (files.length === requireProcessed) {
                if (_this.options.allDone) {
                    _this.options.allDone();
                }
            }
        });
    };
    return AutoLoader;
}());
exports.AutoLoader = AutoLoader;
