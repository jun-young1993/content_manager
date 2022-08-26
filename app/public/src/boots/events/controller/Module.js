"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Module_1 = require("../../../../models/Module");
var CodeItemService_1 = require("../../../../service/CodeItemService");
var StorageService_1 = require("../../../../service/StorageService");
var CodeMapper_1 = require("../../../../lib/Mapper/CodeMapper");
var codeMapper = new CodeMapper_1["default"]();
var codeItemService = new CodeItemService_1.CodeItemService();
var storageService = new StorageService_1.StorageService();
// import {User} from "@model/User";
var db = new Module_1.Module();
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
var Module = /** @class */ (function () {
    function Module() {
    }
    Module.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Module._all = function (event, args) {
        codeItemService.findByParentCodeUsingArray("media_type")
            .then(function (mediaTypeCodes) {
            console.log('emdiaTypeCodes', mediaTypeCodes);
            codeItemService.findByParentCodeUsingArray("task_module_type")
                .then(function (taskTypeCodes) {
                storageService.getUsingArray()
                    .then(function (storageCodes) {
                    db.db().find({}, function (err, data) {
                        if (data) {
                            data.map(function (dataElement) {
                                dataElement.source_media_nm = mediaTypeCodes.data[dataElement.source_media];
                                dataElement.target_media_nm = mediaTypeCodes.data[dataElement.target_media];
                                dataElement.task_type_nm = taskTypeCodes.data[dataElement.task_type];
                                dataElement.source_storage_nm = storageCodes.data[dataElement.source_storage];
                                dataElement.target_storage_nm = storageCodes.data[dataElement.target_storage];
                                return dataElement;
                            });
                            return event.autoReplay({
                                success: true,
                                data: data
                            });
                        }
                    });
                });
            });
        });
    };
    Module.index = function (event, args) {
        db.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Module._index = function (event, args) {
        if (args === void 0) { args = [{}]; }
        db.db().find(args[0], function (err, data) {
            if (data) {
                return event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Module._find = function (event, args) {
        if (args === void 0) { args = [{}]; }
        codeMapper.getModuleCodeMap()
            .then(function (moduleCodes) {
            db.db().findOne(args[0], function (err, data) {
                if (data) {
                    data.source_media_nm = moduleCodes['media'][data.source_media];
                    data.target_media_nm = moduleCodes['media'][data.target_media];
                    data.source_storage_nm = moduleCodes['storage'][data.source_storage];
                    data.target_storage_nm = moduleCodes['storage'][data.target_storage];
                    data.task_type_nm = moduleCodes['task'][data.task_type];
                    return event.autoReplay({
                        success: true,
                        data: data
                    });
                }
            });
        })["catch"](function (moduleCodesError) {
            event.autoReply(moduleCodesError);
        });
    };
    Module.insert = function (event, args) {
        db.db().insert(Object.assign(args, {
            'is_deleted': "N",
            'deleted_at': null
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
    Module._insert = function (event, args) {
        db.db().insert(Object.assign(args[0], {
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
    Module.update = function (event, args) {
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    Module._update = function (event, args) {
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            return event.autoReplay({
                success: true,
                data: data
            });
        });
    };
    Module._first = function (event, args) {
        db.db().findOne(Object.assign(args[0], {
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.autoReply({
                    success: true,
                    data: data
                });
            }
            else {
                return event.autoReply({
                    success: false
                });
            }
        });
    };
    Module["delete"] = function (event, args) {
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
    Module._delete = function (event, args) {
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
    return Module;
}());
new BaseController_1.BaseController(Module);
