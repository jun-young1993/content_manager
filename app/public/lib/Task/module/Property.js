"use strict";
exports.__esModule = true;
exports.Property = void 0;
var path = require('path');
var Property = /** @class */ (function () {
    function Property(params) {
        this.sourceMedia = params.sourceMedia;
        this.targetMedia = params.targetMedia;
        this.task = params.task;
    }
    Property.prototype.getTaskId = function () {
        return this.task._id;
    };
    Property.prototype.getSourceMedia = function () {
        return this.sourceMedia;
    };
    Property.prototype.getSourceFullPath = function () {
        var fullPath = this.getSourceMedia().full_path;
        return fullPath;
    };
    Property.prototype.getTargetMedia = function () {
        return this.targetMedia;
    };
    Property.prototype.getTargetFullPath = function () {
        var fullPath = this.getTargetMedia().full_path;
        return fullPath;
    };
    Property.prototype.getTargetDir = function () {
        return path.dirname(this.getTargetFullPath());
    };
    Property.prototype.getTargetExt = function () {
        return path.extname(this.getTargetFullPath());
    };
    Property.prototype.getTargetFileName = function () {
        return path.basename(this.getTargetFullPath());
    };
    Property.prototype.getTargetName = function () {
        return path.basename(this.getTargetFileName(), this.getTargetExt());
    };
    return Property;
}());
exports.Property = Property;
