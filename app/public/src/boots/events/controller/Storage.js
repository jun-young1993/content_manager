"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Storage_1 = require("../../../../models/Storage");
// import {User} from "@model/User";
var storageDb = new Storage_1.Storage();
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
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.index = function (event, args) {
        storageDb.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Storage.insert = function (event, args) {
        storageDb.db().insert(Object.assign(args, {
            'is_deleted': "N",
            'created_at': new Date('YmdHis'),
            'updated_at': new Date('YmdHis'),
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
    Storage.update = function (event, args) {
        storageDb.db().update(args, function (err, data) {
            return event.returnValue = data;
        });
    };
    return Storage;
}());
new BaseController_1.BaseController(Storage);
