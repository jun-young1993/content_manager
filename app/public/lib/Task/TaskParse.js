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
var path = require("path");
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
        console.log('before start task parse');
        this.task = task;
        // task.module_id;
        console.log('start task parse');
        console.log(this);
        // this.storageDb = new Storage();
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
                                        console.log(code);
                                        console.log(err);
                                        console.log(storage);
                                        if (storage) {
                                            resolve(storage);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                }
                                else {
                                    resolve(null);
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
    TaskParse.prototype.getMedia = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (mediaId) {
                                new Media().db().findOne({ _id: mediaId }, function (err, media) {
                                    if (media) {
                                        resolve(media);
                                    }
                                    else {
                                        resolve(null);
                                    }
                                });
                            }
                            else {
                                resolve(null);
                            }
                        })];
                    case 1:
                        media = _a.sent();
                        return [2 /*return*/, media];
                }
            });
        });
    };
    ;
    TaskParse.prototype.getSourceStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStorage(this.task.source_storage)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TaskParse.prototype.getTargetStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStorage(this.task.target_storage)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TaskParse.prototype.getSourceMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMedia(this.task.source_media_id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TaskParse.prototype.getTargetMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMedia(this.task.target_media_id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TaskParse.prototype.getSourceDir = function () {
        return path.dirname(this.sourceMedia.path);
    };
    TaskParse.prototype.getSourceBasenaem = function () {
        return path.basename(this.sourceMedia.path);
    };
    TaskParse.prototype.getSourceExtention = function () {
        return path.extname(this.sourceMedia.path);
    };
    TaskParse.prototype.getSource = function () {
        if (this.sourceMedia) {
            if (this.sourceMedia.type === 'out') {
                // 밖에서 들어온 미디어는 풆경로
                return this.sourceMedia.path;
            }
        }
        return path.resolve(this.getSourceDir(), this.getSourceBasenaem() + this.getSourceExtention());
    };
    TaskParse.prototype.getModuleInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this, module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                console.log('getModuleInfo', _this.task.module_id);
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
                                    resolve(null);
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
    TaskParse.prototype.setMedia = function (org) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            new Media().db().insert(Object.assign({
                                is_media: true
                            }, org), function (err, data) {
                                resolve(data);
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
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                new Task().db().update({ _id: _this.task._id }, {
                                    $set: {
                                        source_media_id: _this.sourceMedia._id,
                                        target_media_id: _this.targetMedia._id,
                                        source: _this.sourceMedia.full_path,
                                        target: _this.targetMedia.full_path
                                    }
                                }, function (err, data) {
                                    if (data) {
                                        new Task().db().findOne({ _id: _this.task._id }, function (err, taskData) {
                                            resolve(taskData);
                                        });
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
            fs: FileManager
        };
        return modules[type];
    };
    TaskParse.prototype.getTaskParse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var task, _a, targetStorage, sourceStorage, sourceStoragePath, targetStoragePath, _b, _c, newTask, taskType, _d, moduleTypeCode, moduleTypeMethod, module_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        task = this.task;
                        // base parsing
                        _a = this;
                        return [4 /*yield*/, this.getModuleInfo()];
                    case 1:
                        // base parsing
                        _a.moduleInfo = _e.sent();
                        console.log('moduleInfo', this.moduleInfo);
                        if (!this.moduleInfo) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getStorage(this.moduleInfo.target_storage)];
                    case 2:
                        targetStorage = _e.sent();
                        return [4 /*yield*/, this.getStorage(this.moduleInfo.source_storage)];
                    case 3:
                        sourceStorage = _e.sent();
                        sourceStoragePath = sourceStorage.path;
                        targetStoragePath = targetStorage.path;
                        if (this.moduleInfo.source_media) {
                            sourceStoragePath = '';
                        }
                        _b = this;
                        return [4 /*yield*/, this.setMedia({
                                content_id: this.task.content_id,
                                type: this.moduleInfo.source_media,
                                storage: this.moduleInfo.source_storage,
                                path: this.task.source,
                                full_path: path.resolve(sourceStoragePath, this.task.source)
                            })];
                    case 4:
                        _b.sourceMedia = _e.sent();
                        console.log('after source media', this.sourceMedia);
                        _c = this;
                        return [4 /*yield*/, this.setMedia({
                                content_id: this.task.content_id,
                                type: this.moduleInfo.target_media,
                                storage: this.moduleInfo.target_storage,
                                path: this.task._id + path.extname(this.task.source),
                                full_path: path.resolve(targetStoragePath, this.task._id + path.extname(this.task.source))
                            })];
                    case 5:
                        _c.targetMedia = _e.sent();
                        console.log('after source media', this.targetMedia);
                        return [4 /*yield*/, this.updateTask()];
                    case 6:
                        newTask = _e.sent();
                        console.log('new Task', newTask);
                        taskType = this.moduleInfo.task_type;
                        _d = taskType.split('_'), moduleTypeCode = _d[0], moduleTypeMethod = _d[1];
                        module_1 = this.getModule(moduleTypeCode.toLowerCase());
                        this.module = new module_1(newTask);
                        this.module[moduleTypeMethod.toLowerCase()]();
                        return [2 /*return*/, Promise.resolve(this)];
                    case 7: return [2 /*return*/, Promise.reject(null)];
                }
            });
        });
    };
    return TaskParse;
}());
exports.TaskParse = TaskParse;
