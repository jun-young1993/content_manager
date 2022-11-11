"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Storage_1 = require("../../../../models/Storage");
var ApiHelper_1 = require("../../../../lib/helper/ApiHelper");
// import {User} from "@model/User";
var db = new Storage_1.Storage();
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
    Storage._all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Storage.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Storage._index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    /**
     *
     * @param event
     * @param args
     * @returns
     */
    Storage.$index = function (event, args) {
        return new Promise(function (resolve, reject) {
            db.db().find({ is_deleted: 'N' }, function (err, data) {
                if (data) {
                    return resolve((0, ApiHelper_1.apiResolve)(data));
                }
                return reject((0, ApiHelper_1.apiReject)(err));
            });
        });
    };
    Storage._insert = function (event, args) {
        db.db().insert(Object.assign(args[0], {
            'use_yn': "Y",
            'is_deleted': "N",
            'deleted_at': null
        }), function (err, data) {
            if (err) {
                return event.autoReplay({
                    success: false,
                    data: null,
                    msg: err
                });
            }
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Storage._update = function (event, args) {
        console.log(args);
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
            else {
                console.log(err);
                return event.autoReplay({
                    success: false,
                    data: data,
                    msg: err
                });
            }
        });
    };
    Storage.first = function (event, args) {
        db.db().findOne(Object.assign(args, {
            'use_yn': "Y",
            'deleted_at': null
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
    Storage._delete = function (event, args) {
        if (args.length >= 1) {
            db.db().remove(args[0], function (err, data) {
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
    return Storage;
}());
new BaseController_1.BaseController(Storage);
