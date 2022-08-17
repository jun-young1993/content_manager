"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Media_1 = require("../../../../models/Media");
var MediaInfoService_1 = require("../../../../service/MediaInfoService");
var mediaInfoService = new MediaInfoService_1.MediaInfoService();
// import {User} from "@model/User";
var db = new Media_1.Media();
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.reply('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.returnValue = 'pong'
// })
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')
var MediaInfo = /** @class */ (function () {
    function MediaInfo() {
    }
    MediaInfo._index = function (event, args) {
        mediaInfoService.index(args[0])
            .then(function (resolve) {
            return event.autoReply(resolve);
        });
    };
    MediaInfo.index = function (event, args) {
        new Media_1.Media().db().find(args, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    MediaInfo.insert = function (event, args) {
        new Media_1.Media().db().insert(Object.assign(args, {
            'is_deleted': "N",
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    MediaInfo.update = function (event, args) {
        new Media_1.Media().db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return MediaInfo;
}());
new BaseController_1.BaseController(MediaInfo);
