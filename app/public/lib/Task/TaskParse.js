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
var Storage = require("@models/Storage").Storage;
var Media = require("@models/Media").Media;
var FileManager = require("@task/module/FileManager").FileManager;
var path = require("path");
var TaskParse = /** @class */ (function () {
    function TaskParse(task) {
        console.log('before start task parse');
        this.task = task;
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
                                            console.log('get storage', storage);
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
    TaskParse.prototype.getModule = function () {
        var type = this.task.type;
        var modules = {
            fs: FileManager
        };
        return modules[type];
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
    TaskParse.prototype.getTaskParse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var task, _a, _b, _c, _d, moduleParams, module;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        task = this.task;
                        // base parsing
                        _a = this;
                        return [4 /*yield*/, this.getSourceMedia()];
                    case 1:
                        // base parsing
                        _a.sourceMedia = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this.getTargetMedia()];
                    case 2:
                        _b.targetMedia = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this.getSourceStorage()];
                    case 3:
                        _c.sourceStorage = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this.getTargetStorage()];
                    case 4:
                        _d.targetStorage = _e.sent();
                        this.sourceStoragePath = this.sourceStorage ? this.sourceStorage.path : null;
                        this.sourceStorageType = this.sourceStorage ? this.sourceStorage.type : null;
                        this.targetStoragePath = this.targetStorage ? this.targetStorage.path : null;
                        this.targetStorageType = this.targetStorage ? this.targetStorage.type : null;
                        moduleParams = {
                            source: this.getSource(),
                            target: this.targetStoragePath + '/' + path.basename(this.getSource())
                        };
                        module = this.getModule();
                        this.module = new module(moduleParams);
                        return [2 /*return*/, Promise.resolve(this)];
                }
            });
        });
    };
    return TaskParse;
}());
exports.TaskParse = TaskParse;
