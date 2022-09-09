"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TaskParse = void 0;
var Storage = require("../../models/Storage").Storage;
var Media = require("../../models/Media").Media;
var Task = require("../../models/Task").Task;
var Module = require("../../models/Module").Module;
var FileManager = require("./module/FileManager").FileManager;
var Transcoder = require("./module/Transcoder").Transcoder;
var MediaInfo = require("./module/MediaInfo").MediaInfo;
var log = require('../Logger');
var lodash_1 = require("lodash");
// const {isEmpty} = require('lodash');
var path = require("path");
var ApiHelper_1 = require("../helper/ApiHelper");
var TaskParse = /** @class */ (function () {
    function TaskParse(task) {
        this.sourceMediaId = null;
        this.targetMediaId = null;
        this.sourceStoragePath = null;
        this.targetStoragePath = null;
        this.sourceStorageType = null;
        this.targetStorageType = null;
        this.sourceStorage = null;
        this.targetStorage = null;
        this.sourceMedia = null;
        this.targetMedia = null;
        this.module = null;
        this.moduleInfo = null;
        this.task = null;
        this.task = task;
    }
    TaskParse.prototype.getStorage = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _this, storage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (code) {
                                    new Storage().db().findOne({ code: code }, function (err, storage) {
                                        if (!(0, lodash_1.isEmpty)(storage)) {
                                            resolve(storage);
                                        }
                                        else {
                                            reject('[getStorage] not found storage code' + code);
                                        }
                                    });
                                }
                                else {
                                    reject('[getStorage] not found storage code by get storage params 1');
                                }
                            })];
                    case 1:
                        storage = _a.sent();
                        return [2 /*return*/, storage];
                }
            });
        });
    };
    ;
    // getSourceDir(){
    // 	return path.dirname(this.sourceMedia.path);
    // }
    // getSourceBasenaem(){
    // 	return path.basename(this.sourceMedia.path);
    // }
    // getSourceExtention(){
    // 	return path.extname(this.sourceMedia.path);
    // }
    // getSource(){
    // 	if(this.sourceMedia){
    // 		if(this.sourceMedia.type === 'out'){
    // 			// 밖에서 들어온 미디어는 풆경로
    // 			return this.sourceMedia.path;
    // 		}
    // 	}
    // 	return path.resolve(this.getSourceDir(),this.getSourceBasenaem()+this.getSourceExtention())
    // }
    TaskParse.prototype.getModuleInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this, module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (_this.task.module_id) {
                                    new Module().db().findOne({ _id: _this.task.module_id }, function (err, module) {
                                        if (module) {
                                            resolve(module);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                }
                                else {
                                    reject('[getModuleInfo] not found _this.task.module_id ');
                                }
                            })];
                    case 1:
                        module = _a.sent();
                        return [2 /*return*/, module];
                }
            });
        });
    };
    ;
    TaskParse.prototype.getMedia = function (org) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaDb, _this, media;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaDb = new Media().db();
                        _this = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                mediaDb.findOne({ content_id: org.content_id, type: org.type.toLowerCase() }, function (err, data) {
                                    if (!(0, lodash_1.isEmpty)(data)) {
                                        resolve(data);
                                    }
                                    else {
                                        if (_this_1.moduleInfo.source_media.toLowerCase() == 'out') {
                                            _this.sourceStorage = {
                                                path: ''
                                            };
                                            _this.moduleInfo.source_storage = 'out';
                                            console.log('return resolve', _this.task);
                                            resolve({
                                                path: _this.task.source
                                            });
                                        }
                                        else {
                                            reject("[TaskParse][getMedia] not found media by content_id ".concat(org.content_id, " and type ").concat(org.type));
                                        }
                                    }
                                });
                            })];
                    case 1:
                        media = _a.sent();
                        return [2 /*return*/, media];
                }
            });
        });
    };
    TaskParse.prototype.setMedia = function (org) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaDb, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaDb = new Media().db();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if ((0, lodash_1.isEmpty)(org.type)) {
                                    reject('[TaskParse][setMedia] not found org.type');
                                }
                                org.type = org.type.toLowerCase();
                                new Media().db().findOne({ content_id: org.content_id, type: org.type }, function (err, data) {
                                    if (err) {
                                        log.channel('task_parse').error('[SetMedia Find]', err);
                                        reject('[setMedia Err]');
                                    }
                                    if (!(0, lodash_1.isEmpty)(data)) {
                                        var mediaId = data._id;
                                        new Media().db().update({ _id: mediaId }, { $set: org }, function (err, updateData) {
                                            if (err) {
                                                log.channel('task_parse').error('[setMedia Update Fail]', err);
                                                reject('[TaskParse][setMedia] media update fail');
                                            }
                                            if (updateData) {
                                                new Media().db().findOne({ _id: data._id }, function (err, media) {
                                                    if (!(0, lodash_1.isEmpty)(media)) {
                                                        resolve(media);
                                                    }
                                                    else {
                                                        reject("[setMedia] not found media by id ".concat(data._id));
                                                    }
                                                });
                                            }
                                            else {
                                                log.channel('task_parse').error('[setMedia Update Fail]', err);
                                            }
                                        });
                                    }
                                    else {
                                        new Media().db().insert(Object.assign({
                                            is_media: true
                                        }, org), function (err, insertData) {
                                            if (err) {
                                                log.channel('task_parse').error('[setMedia Insert Fail]', err);
                                            }
                                            new Media().db().findOne({ _id: insertData._id }, function (err, media) {
                                                if (!(0, lodash_1.isEmpty)(media)) {
                                                    resolve(media);
                                                }
                                                else {
                                                    log.channel('task_parse').error("[setMedia] not found media by _id ".concat(insertData._id));
                                                }
                                            });
                                        });
                                    }
                                });
                            })];
                    case 1:
                        media = _a.sent();
                        return [2 /*return*/, media];
                }
            });
        });
    };
    TaskParse.prototype.updateTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        console.log('[update before task]', this.task);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                new Task().db().update({ _id: _this.task._id }, {
                                    $set: Object.assign(_this.task, {
                                        status: 'queue',
                                        source_media_id: _this.sourceMedia._id,
                                        target_media_id: _this.targetMedia._id,
                                        source: _this.sourceMedia.path,
                                        target: _this.targetMedia.path
                                    })
                                }, function (err, data) {
                                    if (err) {
                                        log.channel('task_parse').error('[UpdateTask] Update', err);
                                        reject('[UpdateTask] Update Err');
                                    }
                                    if (data) {
                                        new Task().db().findOne({ _id: _this.task._id }, function (err, taskData) {
                                            if (err) {
                                                log.channel('task_parse').error('[UpdateTask] FindOne', err);
                                            }
                                            if (taskData) {
                                                resolve(taskData);
                                            }
                                            else {
                                                reject('[UpdateTask] not found taskData ');
                                            }
                                        });
                                    }
                                    else {
                                        reject('[UpdateTask] not found data');
                                    }
                                });
                            })];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    TaskParse.prototype.getModule = function (type) {
        var modules = {
            fs: FileManager,
            transcoder: Transcoder,
            mediainfo: MediaInfo
        };
        return modules[type];
    };
    TaskParse.prototype.setting = function () {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModuleInfo()
                .then(function (moduleInfo) {
                log.channel('task_parse').info('[setting][moduleInfo]', moduleInfo);
                _this.moduleInfo = moduleInfo;
                _this.getStorage(_this.moduleInfo.target_storage)
                    .then(function (targetStorage) {
                    log.channel('task_parse').info('[setting][targetStorage]', targetStorage);
                    _this.targetStorage = targetStorage;
                    if (targetStorage) {
                        if (!targetStorage.path && (targetStorage.code != 'no')) {
                            reject('[sertting][targetStorage] not found targetStorage.path');
                        }
                        _this.getStorage(_this.moduleInfo.source_storage)
                            .then(function (sourceStorage) {
                            log.channel('task_parse').info('[setting][sourceStorage]', sourceStorage);
                            if (sourceStorage) {
                                if (!sourceStorage.path && sourceStorage.code != 'out') {
                                    return reject('[setting][sourceStorage] not found sourceStorage.path');
                                }
                                _this.sourceStorage = sourceStorage;
                                _this.getMedia({ content_id: _this.task.content_id,
                                    type: _this.moduleInfo.source_media
                                })
                                    .then(function (sourceMedia) {
                                    if (sourceMedia) {
                                        log.channel('task_parse').info('[setting][getSourceMedia]', sourceMedia);
                                        _this.task.source = sourceMedia.path;
                                        if ((0, lodash_1.isEmpty)(sourceMedia.path)) {
                                            return reject('[setting][sourceMedia] not found sourceMedia.path');
                                        }
                                        _this.setMedia({
                                            content_id: _this.task.content_id,
                                            type: _this.moduleInfo.source_media,
                                            storage: _this.moduleInfo.source_storage,
                                            path: _this.task.source,
                                            full_path: path.resolve(_this.sourceStorage.path, _this_1.task.source)
                                        }).then(function (sourceMedia) {
                                            log.channel('task_parse').info('[setting][seMedia] Insert Or Update', sourceMedia);
                                            _this.sourceMedia = sourceMedia;
                                            var taskType = _this.moduleInfo.task_type;
                                            var _a = taskType.split('_'), moduleTypeCode = _a[0], moduleTypeMethod = _a[1];
                                            log.channel('task_parse').info('[setting][Module Type]', moduleTypeCode);
                                            log.channel('task_parse').info('[setting][Module Task]', moduleTypeMethod);
                                            var ext = path.extname(_this_1.task.source);
                                            if (moduleTypeMethod.toLowerCase() == 'thumbnail') {
                                                ext = '.png';
                                            }
                                            else if (moduleTypeMethod.toLowerCase() == 'proxy') {
                                                ext = '.mp4';
                                            }
                                            var setTargetOptions = {
                                                content_id: _this.task.content_id,
                                                type: _this.moduleInfo.target_media,
                                                storage: _this.moduleInfo.target_storage,
                                                path: _this.task._id + ext,
                                                full_path: path.resolve(_this.targetStorage.path, _this.task._id + ext)
                                            };
                                            _this.setMedia(setTargetOptions)
                                                .then(function (setTargetMedia) {
                                                log.channel('task_parse').info('[setting][setTargetMedia]', setTargetMedia);
                                                if (setTargetMedia) {
                                                    _this.targetMedia = setTargetMedia;
                                                    _this.updateTask()
                                                        .then(function (updateTask) {
                                                        log.channel('task_parse').info('[setting][updateTask]', updateTask);
                                                        var module = _this.getModule(moduleTypeCode.toLowerCase());
                                                        _this.module = new module({
                                                            task: updateTask,
                                                            sourceMedia: _this.sourceMedia,
                                                            targetMedia: _this.targetMedia
                                                        });
                                                        log.channel('task_parse').info('module', _this.module);
                                                        log.channel('task_parse').info("[setting][Start Task Workflow] ".concat(moduleTypeCode.toLowerCase(), " => ").concat(moduleTypeMethod.toLowerCase()));
                                                        _this.module[moduleTypeMethod.toLowerCase()]();
                                                        resolve(_this);
                                                    })["catch"](function (updateTaskError) {
                                                        reject(updateTaskError);
                                                    });
                                                }
                                                else {
                                                    reject('[setting][setTargetMedia] not found setTargetMedia');
                                                }
                                            })["catch"](function (setTargetMediaError) {
                                                reject(setTargetMediaError);
                                            });
                                        })["catch"](function (setSourceMediaError) {
                                            reject(setSourceMediaError);
                                        });
                                    }
                                    else {
                                        reject("[setting][sourceMedia] not found sourceMedia");
                                    }
                                })["catch"](function (sourceMediaErr) {
                                    reject(sourceMediaErr);
                                });
                            }
                            else {
                                reject('[setting][sourceStorage] not found sourceStorage');
                            }
                        })["catch"](function (sourceStorageErr) {
                            reject(sourceStorageErr);
                        });
                    }
                    else {
                        reject('[targetStorage] not found target storage');
                    }
                })["catch"](function (targetStorageErr) {
                    reject(targetStorageErr);
                });
            })["catch"](function (moduleInfoErr) {
                reject(moduleInfoErr);
            });
        });
    };
    TaskParse.prototype.onlineSetting = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            var _this = _this_1;
            var moduleTypeCode = "fs";
            var moduleTypeMethod = "copy";
            var task = _this_1.task;
            log.channel('task_parse').info('[onlineSetting][updateTask]', task);
            var module = _this.getModule(moduleTypeCode.toLowerCase());
            _this.module = new module({
                task: task,
                sourceMedia: {
                    full_path: task.source
                },
                targetMedia: {
                    full_path: task.target
                }
            });
            log.channel('task_parse').info("[setting][Start Task Workflow] ".concat(moduleTypeCode.toLowerCase(), " => ").concat(moduleTypeMethod.toLowerCase()));
            _this.module[moduleTypeMethod.toLowerCase()]();
            resolve((0, ApiHelper_1.apiResolve)(_this));
        });
    };
    TaskParse.prototype.getTaskParse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var taskSetting = null;
                        if (!(0, lodash_1.isEmpty)(_this_1.task.source) && !(0, lodash_1.isEmpty)(_this_1.task.target)) {
                            taskSetting = _this_1.onlineSetting();
                        }
                        else {
                            taskSetting = _this_1.setting();
                        }
                        taskSetting
                            .then(function (complete) {
                            resolve(complete);
                        })["catch"](function (error) {
                            log.channel('task_parse').error(error);
                        });
                    })];
            });
        });
    };
    return TaskParse;
}());
exports.TaskParse = TaskParse;
