"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Task_1 = require("../../../../models/Task");
// import {User} from "@model/User";
var db = new Task_1.Task();
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
var Task = /** @class */ (function () {
    function Task() {
    }
    Task.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Task.insert = function (event, args) {
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
    Task.update = function (event, args) {
        db.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return Task;
}());
new BaseController_1.BaseController(Task);
