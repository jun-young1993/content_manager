"use strict";
// @ts-nocheck
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Metadata_1 = require("../../../../models/Metadata");
// import {User} from "@model/User";
var metadataDb = new Metadata_1.Metadata();
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
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    Metadata.index = function (event, args) {
        metadataDb.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Metadata.insert = function (event, args) {
        metadataDb.db().insert(Object.assign(args, {}), function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Metadata.update = function (event, args) {
        metadataDb.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    Metadata._update = function (event, args) {
        metadataDb.db().update(args[1], { $set: args[0] }, function (error, data) {
            return event.autoReply(data);
        });
    };
    return Metadata;
}());
new BaseController_1.BaseController(Metadata);
