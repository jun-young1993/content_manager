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
var log = require('../../Logger');
var Transcoder = /** @class */ (function (_super) {
    __extends(Transcoder, _super);
    function Transcoder(params) {
        var _this = this;
        log.channel('ts').info('[Start Transcoding]', params);
        log.channel('ts').info('[ffmpegPath]', ffmpegPath);
        log.channel('ts').info('[ffprobePath]', ffprobePath);
        _this = _super.call(this, params) || this;
        _this.params = params;
        return _this;
    }
    Transcoder.prototype.initialize = function () {
        ffmpeg.setFfmpegPath(ffmpegPath);
        ffmpeg.setFfprobePath(ffprobePath);
        var taskId = this.getTaskId();
        return ffmpeg(this.getSourceFullPath())
            .on('filenames', function (filenames) {
            log.channel('ts').info('[transcoder filenames]', filenames);
        })
            .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
            .on('error', function (err, stdout, stderr) {
            log.channel('ts').error('[transcoder error]', err);
            log.channel('ts').error('[transcoder stdout]', stdout);
            log.channel('ts').error('[transcoder stderr]', stderr);
            new TaskUpdater(taskId).error();
        })
            .on('end', function () {
            log.channel('ts').info('[transcoder Complete]');
            new TaskUpdater(taskId).complete();
        });
    };
    Transcoder.prototype.thumbnail = function () {
        var options = {
            count: 1,
            folder: this.getTargetDir(),
            filename: this.getTargetName(),
            size: '320x240'
        };
        log.channel('ts').info('[Create Thumbnail [Target Dir] [Target Name]]', options);
        this.initialize().screenshots(options);
    };
    Transcoder.prototype.proxy = function () {
        var fullPath = this.getTargetFullPath();
        log.channel('ts').info('[Create Proxy [Full Path]]', fullPath);
        // const outStream = fs.createWriteStream(fullPath);
        this.initialize()
            .audioCodec('aac')
            .videoCodec('libx264')
            .size('640x480')
            .save(fullPath);
        // .pipe(outStream, {end : true} );
    };
    return Transcoder;
}(Property));
exports.Transcoder = Transcoder;
