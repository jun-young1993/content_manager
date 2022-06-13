"use strict";
exports.__esModule = true;
exports.Nedb = void 0;
var DataStore = require("nedb");
var NedbConfig_1 = require("./config/NedbConfig");
// const Datastore = require('nedb-promises')
// const DataStore = require('nedb-proxises');
var Nedb = /** @class */ (function () {
    function Nedb(path) {
        this.path = path;
        var database = new DataStore(this.path);
        database.loadDatabase();
        this.database = database;
        this.querySetting();
    }
    Nedb.prototype.db = function () {
        return this.database;
    };
    Nedb.prototype.nePromise = function (method, query) {
        var _this = this;
        if (query === void 0) { query = {}; }
        return new Promise(function (promiseResolve, promiseReject) {
            _this.db()[method](query, function (err, resolve) {
                if (err) {
                    return promiseReject(err);
                }
                return promiseResolve(resolve);
            });
        });
    };
    Nedb.prototype.querySetting = function () {
        var _this = this;
        var _loop_1 = function (method) {
            var nedbMethod = NedbConfig_1.QueryMap[method];
            this_1[method] = function (query) {
                if (query === void 0) { query = {}; }
                if (NedbConfig_1.Custom[method]) {
                    return NedbConfig_1.Custom[method](query, _this.db());
                }
                else {
                    return _this.nePromise(nedbMethod, query);
                }
            };
        };
        var this_1 = this;
        for (var method in NedbConfig_1.QueryMap) {
            _loop_1(method);
        }
    };
    return Nedb;
}());
exports.Nedb = Nedb;
