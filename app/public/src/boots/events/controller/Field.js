"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Field_1 = require("../../../../models/Field");
// import {User} from "@model/User";
var db = new Field_1.Field();
var Field = /** @class */ (function () {
    function Field() {
    }
    Field.all = function (event, args) {
        db.db().find({}, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Field.index = function (event, args) {
        db.db().find({ use_yn: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Field.insert = function (event, args) {
        db.db().insert(Object.assign(args, {
            'use_yn': "N",
            'deleted_at': null
        }), function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Field.update = function (event, args) {
        db.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    Field.first = function (event, args) {
        db.db().findOne(Object.assign(args, {
            'use_yn': "N",
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
    return Field;
}());
new BaseController_1.BaseController(Field);
