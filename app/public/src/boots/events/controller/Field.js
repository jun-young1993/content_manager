"use strict";
// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Field_1 = require("../../../../models/Field");
var lodash_1 = require("lodash");
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
    Field._all = function (event, args) {
        db.db().find(args[0]).sort({ order: 1 }).exec(function (err, data) {
            event.autoReplay({
                success: true,
                data: data
            });
        });
    };
    Field._index = function (event, args) {
        if (args === void 0) { args = [{}]; }
        console.log('_index field', args);
        db.db().find(Object.assign({ is_use: true }, args[0]), function (err, data) {
            if (data) {
                event.autoReplay({
                    success: true,
                    data: data
                });
            }
        });
    };
    Field._update = function (event, args) {
        db.db().update(args[1], { $set: args[0] }, function (err, data) {
            event.autoReplay({
                success: true,
                data: data
            });
        });
    };
    Field.index = function (event, args) {
        db.db().find({ use_yn: 'Y' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Field._insert = function (event, args) {
        db.db().findOne({ code: args[0].code }, function (error, code) {
            if ((0, lodash_1.isEmpty)(code)) {
                db.db().count({ content_type: args[0].content_type }, function (error, count) {
                    // db.db().insert({...args[0],{is_use:true, is_search:true,order : count+1}},(error , data) => {
                    //         event.autoReplay({
                    //             success : true,
                    //             data : code
                    //         })
                    //     })
                    // })
                    db.db().insert(__assign(__assign({}, args[0]), { is_use: true, is_search: true, order: count + 1 }), function (error, data) {
                        event.autoReplay({
                            success: true,
                            data: __assign(__assign({}, args[0]), { is_use: true, is_search: true, order: count + 1 })
                        });
                    });
                });
            }
            else {
                event.autoReplay({
                    success: false,
                    data: null,
                    msg: "중복된 필드코드 입니다."
                });
            }
        });
    };
    Field.insert = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        db.db().insert(Object.assign(args[0], {
            'is_use': true,
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
    Field.update = function (event) {
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
    Field["delete"] = function (event) {
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
    return Field;
}());
new BaseController_1.BaseController(Field);
