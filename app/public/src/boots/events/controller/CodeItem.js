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
    CodeItem.indexByParentCode = function (event, parentCode) {
        codeItemDb.db().find({ use_yn: 'Y',
            parent_code: parentCode }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    CodeItem.findByParentCode = function (event, codes) {
        codeItemDb.db().findOne({ use_yn: 'Y',
            parent_code: codes[0],
            code: codes[1]
        }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
            return event.returnValue = {
                success: false,
                data: null
            };
        });
    };
    CodeItem.insert = function (event, args) {
        codeItemDb.db().insert(Object.assign(args, {
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
    CodeItem.update = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        codeItemDb.db().update(args, function (err, data) {
            return event.returnValue = data;
        });
    };
    CodeItem["delete"] = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length >= 1) {
            codeItemDb.db().remove(args[0], function (err, data) {
                if (data) {
                    return event.returnValue = {
                        success: true,
                        data: data
                    };
                }
                else {
                    return event.returnValue = {
                        success: false
                    };
                }
            });
        }
    };
    return CodeItem;
}());
new BaseController_1.BaseController(CodeItem);
