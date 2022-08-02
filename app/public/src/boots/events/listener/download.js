"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
var log = require('../../../../lib/Logger');
// import {DownloadService} from '../../../../service/DownloadService';
var MediaService_1 = require("../../../../service/MediaService");
var TaskSeter_1 = require("../../../../lib/Task/TaskSeter");
// const downloadService = new DownloadService()
var path = require("path");
onIpc('download-request', function (event, mediaId) {
    new MediaService_1.MediaService()
        .findByMediaId(mediaId)
        .then(function (media) {
        var downloadMedia = media.data;
        var ext = path.extname(downloadMedia.path);
        // 
        getElectronModule('dialog')
            .showSaveDialog(getBrowserWindow, {
            defaultPath: getPath('downloads') + "/*".concat(ext)
        })
            .then(function (result) {
            log.channel("download").info("[download][download-request]result dialog", result);
            if (!result.canceled && result.filePath) {
                new TaskSeter_1.TaskSeter(downloadMedia)
                    .download(result.filePath)
                    .then(function (setter) {
                    log.channel("download").info("[download][download-request]Setter", setter);
                    event.reply('download-request-reply', setter);
                })["catch"](function (setterCatch) {
                    log.channel("download").info("[download][download-request]SetterCatch", setterCatch);
                });
            }
        })["catch"](function (reject) {
            log.channel("download").error("[download][download-request]reject dialog", reject);
        });
    })["catch"](function (findMediaError) {
        log.channel("download").error("[download][download-request]", findMediaError);
    });
});
