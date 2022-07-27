"use strict";
exports.__esModule = true;
exports.BaseModel = exports.STORE_TYPE = void 0;
var Nedb_1 = require("./stores/Nedb");
var directory = require('../config/database').directory;
var path = require('path');
var STORE_TYPE;
(function (STORE_TYPE) {
    STORE_TYPE["NEDB"] = "nedb";
})(STORE_TYPE = exports.STORE_TYPE || (exports.STORE_TYPE = {}));
var BaseModel = /** @class */ (function () {
    function BaseModel(property) {
        this.store = STORE_TYPE.NEDB;
        this.table = '';
        Object.assign(this, property);
        this.setDb();
        // super.db = this.db();
    }
    BaseModel.prototype.setDb = function () {
        if (this.isNedb()) {
            // const path = '/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/'+this.table+'.db';
            // const path = app.getPath("downloads")+'/db/'+this.table+'.db';
            var dbpath = path.resolve(directory, "".concat(this.table, ".db"));
            var database = new Nedb_1.Nedb(dbpath);
            this.database = database;
        }
    };
    BaseModel.prototype.isNedb = function () {
        if (this.store == STORE_TYPE.NEDB) {
            return true;
        }
        return false;
    };
    BaseModel.prototype.db = function () {
        return this.database.database;
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
