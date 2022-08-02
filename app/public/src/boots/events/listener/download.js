"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow;
var log = require('../../../../lib/Logger');
// import {DownloadService} from '../../../../service/DownloadService';
var MediaService_1 = require("../../../../service/MediaService");
var TaskSeter_1 = require("../../../../lib/Task/TaskSeter");
// const downloadService = new DownloadService()
onIpc('download-request', function (event, mediaId) {
    getElectronModule('dialog')
        .showSaveDialog(getBrowserWindow, {})
        .then(function (result) {
        log.channel("download").info("[download][download-request]result dialog", result);
        if (!result.canceled && result.filePath) {
            new MediaService_1.MediaService()
                .findByMediaId(mediaId)
                .then(function (media) {
                var downloadMedia = media.data;
                new TaskSeter_1.TaskSeter(downloadMedia).download(result.filePath);
            })["catch"](function (findMediaError) {
                log.channel("download").info("[download][download-request]", findMediaError);
            });
        }
        // new MediaService().findByMediaId(mediaId)
        // new TaskSeter()
        // downloadService.downloadByMediaId(mediaId);
    })["catch"](function (reject) {
    });
});
