"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var CodeItem_1 = require("../../../../models/CodeItem");
var CodeItemService_1 = require("../../../../service/CodeItemService");
var codeItemDb = new CodeItem_1.CodeItem();
var codeItemService = new CodeItemService_1.CodeItemService();
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
    CodeItem._indexByParentCode = function (event, args) {
        codeItemService.findByParentCode(args[0])
            .then(function (result) {
            return event.autoReplay({
                success: true,
                data: result
            });
        });
        return;
        codeItemDb.db().find({ use_yn: 'Y',
            parent_code: args[0] }, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
            else {
                return event.autoReplay({
                    success: false,
                    data: data
                });
            }
        });
    };
    CodeItem.indexByParentCode = function (event, args) {
        codeItemDb.db().find({ use_yn: 'Y',
            parent_code: args }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
            else {
                return event.returnValue = {
                    success: false,
                    data: data
                };
            }
        });
    };
    CodeItem._findByParentCode = function (event, codes) {
        console.log('codes', codes);
        codeItemDb.db().findOne({ use_yn: 'Y',
            parent_code: codes[0],
            code: codes[1]
        }, function (err, data) {
            if (data) {
                return event.autoReply({
                    success: true,
                    data: data
                });
            }
            return event.autoReply({
                success: false,
                data: null
            });
        });
    };
    CodeItem._insert = function (event, args) {
        codeItemDb.db().insert(Object.assign(args[0], {
            'use_yn': "Y",
            'is_deleted': "N",
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
            else {
                return event.autoReplay({
                    success: false,
                    data: data
                });
            }
        });
    };
    CodeItem._update = function (event, args) {
        console.log('code item update args', args);
        codeItemDb.db().update(args[1], { $set: args[0] }, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true
                });
            }
            else {
                return event.autoReplay({
                    success: false
                });
            }
        });
    };
    CodeItem._delete = function (event, args) {
        if (args.length >= 1) {
            codeItemDb.db().remove(args[0], function (err, data) {
                if (data) {
                    return event.autoReplay({
                        success: true,
                        data: data
                    });
                }
                else {
                    return event.autoReplay({
                        success: false
                    });
                }
            });
        }
    };
    return CodeItem;
}());
new BaseController_1.BaseController(CodeItem);
