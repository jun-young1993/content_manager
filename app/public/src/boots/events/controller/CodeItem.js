"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var CodeItem_1 = require("../../../../models/CodeItem");
// import {User} from "@model/User";
var codeItemDb = new CodeItem_1.CodeItem();
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
var CodeItem = /** @class */ (function () {
    function CodeItem() {
    }
    CodeItem.index = function (event, args) {
        codeItemDb.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    CodeItem.insert = function (event, args) {
        codeItemDb.db().insert(Object.assign(args, {
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
    CodeItem.update = function (event, args) {
        codeItemDb.db().update(args, function (err, data) {
            return event.returnValue = data;
        });
    };
    return CodeItem;
}());
new BaseController_1.BaseController(CodeItem);
