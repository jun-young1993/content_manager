"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Media_1 = require("../../../../models/Media");
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
var Media = /** @class */ (function () {
    function Media() {
    }
    Media.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Media.insert = function (event, args) {
        db.db().insert(Object.assign(args, {
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
    Media.update = function (event, args) {
        db.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return Media;
}());
new BaseController_1.BaseController(Media);
