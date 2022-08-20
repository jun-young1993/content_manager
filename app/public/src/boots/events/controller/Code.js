"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Code_1 = require("../../../../models/Code");
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
    Code._all = function (event) {
        codeDb.db().find({}, function (err, data) {
            if (data) {
                event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Code.all = function (event, args) {
        codeDb.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
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
    Code.indexByUsing = function (event, args) {
        codeDb.db().find({ use_yn: 'Y' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Code._insert = function (event, args) {
        codeDb.db().insert(Object.assign(args[0], {
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
    Code._update = function (event, args) {
        codeDb.db().update(args[1], { $set: args[0] }, function (err, data) {
            if (data) {
                return event.autoReplay({
                    suceess: true
                });
            }
            else {
                return event.autoReplay({
                    suceess: false
                });
            }
        });
    };
    Code._first = function (event, args) {
        console.log('code first', args);
        codeDb.db().findOne(Object.assign(args[0]), function (err, data) {
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
    };
    Code.first = function (event, args) {
        console.log('code first', args);
        codeDb.db().findOne(Object.assign(args, {
            'use_yn': "Y"
        }), function (err, data) {
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
    };
    Code._delete = function (event, args) {
        if (args.length >= 1) {
            codeDb.db().remove(args[0], function (err, data) {
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
    return Code;
}());
new BaseController_1.BaseController(Code);
