"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Content_1 = require("../../../../models/Content");
// import {User} from "@model/User";
var db = new Content_1.Content();
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
var Content = /** @class */ (function () {
    function Content() {
    }
    Content.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Content.insert = function (event, args) {
        console.log('content insert db');
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
    Content.update = function (event, args) {
        db.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return Content;
}());
new BaseController_1.BaseController(Content);