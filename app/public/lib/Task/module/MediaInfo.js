"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MediaInfo = void 0;
/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var MediaInfoService_1 = require("../../../service/MediaInfoService");
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var Property = require('./Property').Property;
var log = require('../../Logger');
var ElectronHelper_1 = require("../../helper/ElectronHelper");
var mediaInfoService = new MediaInfoService_1.MediaInfoService();
var MediaInfo = /** @class */ (function (_super) {
    __extends(MediaInfo, _super);
    function MediaInfo(params) {
        var _this = this;
        (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
            variant: "info",
            messages: "[MediaInfo][start] "
        });
        log.channel('ts').info('[Start MediaInfo]', params);
        log.channel('ts').info('[ffprobePath]', ffprobePath);
        _this = _super.call(this, params) || this;
        _this.params = params;
        ffmpeg.setFfmpegPath(ffmpegPath);
        ffmpeg.setFfprobePath(ffprobePath);
        return _this;
    }
    MediaInfo.prototype.video = function () {
        var source = this.getSourceFullPath();
        var contentId = this.getContentId();
        var taskId = this.getTaskId();
        log.channel('ts').info('[MediaInfo][source path]', source);
        ffmpeg.ffprobe(source, function (error, metadata) {
            mediaInfoService.create(metadata, contentId);
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "success",
                messages: "[MediaInfo][complete]"
            });
            new TaskUpdater(taskId).complete();
        });
    };
    MediaInfo.prototype.music = function () {
        var source = this.getSourceFullPath();
        var contentId = this.getContentId();
        var taskId = this.getTaskId();
        log.channel('ts').info('[MediaInfo][source path]', source);
        ffmpeg.ffprobe(source, function (error, metadata) {
            mediaInfoService.create(metadata, contentId);
            (0, ElectronHelper_1.sendIpc)("#Utils/TaskSnackBar", {
                variant: "success",
                messages: "[MediaInfo][complete]"
            });
            new TaskUpdater(taskId).complete();
        });
    };
    return MediaInfo;
}(Property));
exports.MediaInfo = MediaInfo;
