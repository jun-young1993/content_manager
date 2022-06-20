"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Code_1 = require("../../../../models/Code");
// import {User} from "@model/User";
var codeDb = new Code_1.Code();
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
var Code = /** @class */ (function () {
    function Code() {
    }
    Code.index = function (event, args) {
        codeDb.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Code.insert = function (event, args) {
        codeDb.db().insert(Object.assign(args, {
            'use_yn': "Y",
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
    Code.update = function (event, args) {
        codeDb.db().update(args, function (err, data) {
            return event.returnValue = data;
        });
    };
    return Code;
}());
new BaseController_1.BaseController(Code);
