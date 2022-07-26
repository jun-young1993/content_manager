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
exports.Transcoder = void 0;
/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var TaskUpdater = require('../TaskUpdater').TaskUpdater;
var Property = require('./Property').Property;
var Transcoder = /** @class */ (function (_super) {
    __extends(Transcoder, _super);
    function Transcoder(params) {
        var _this = _super.call(this, params) || this;
        console.log('fileManager module ', params);
        _this.params = params;
        console.log('[transcoder target]', _this.getTargetDir());
        return _this;
    }
    Transcoder.prototype.initialize = function () {
        ffmpeg.setFfmpegPath(ffmpegPath);
        ffmpeg.setFfprobePath(ffprobePath);
        console.log('[stream path]', this.getSourceFullPath());
        var taskId = this.getTaskId();
        return ffmpeg(this.getSourceFullPath())
            .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '));
        })
            .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
            .on('error', function (err, stdout, stderr) {
            console.log('err', err);
            console.log('stdout', stdout);
            console.log('stderr', stderr);
        })
            .on('end', function () {
            console.log('Screenshots taken');
            new TaskUpdater(taskId).complete();
        });
    };
    Transcoder.prototype.thumbnail = function () {
        this.initialize().screenshots({
            count: 1,
            folder: this.getTargetDir(),
            filename: this.getTargetName(),
            size: '320x240'
        });
    };
    return Transcoder;
}(Property));
exports.Transcoder = Transcoder;
