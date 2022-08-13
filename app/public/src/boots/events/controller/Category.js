"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Category_1 = require("../../../../models/Category");
// import {User} from "@model/User";
var db = new Category_1.Category();
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
var Category = /** @class */ (function () {
    function Category() {
    }
    Category.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Category.index = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Category._index = function (event, args) {
        db.db().find(args[0], function (err, data) {
            if (data) {
                event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Category._insert = function (event, args) {
        db.db().insert(Object.assign(args[0], {
            'use_yn': "Y"
        }), function (err, data) {
            if (data) {
                event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Category.insert = function (event, args) {
        db.db().insert(Object.assign(args, {
            'use_yn': "Y"
        }), function (err, data) {
            if (err) {
                return event.returnValue = {
                    success: false,
                    data: null,
                    msg: err
                };
            }
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Category.update = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    Category.first = function (event, args) {
        db.db().findOne(Object.assign(args, {
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
    Category["delete"] = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length >= 1) {
            db.db().remove(args[0], function (err, data) {
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
    return Category;
}());
new BaseController_1.BaseController(Category);
