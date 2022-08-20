"use strict";
// @ts-nocheck
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var Content_1 = require("../../../../models/Content");
var ContentService_1 = require("../../../../service/ContentService");
var FieldService_1 = require("../../../../service/FieldService");
var lodash_1 = require("lodash");
var db = new Content_1.Content();
var contentService = new ContentService_1.ContentService();
var fieldService = new FieldService_1.FieldService();
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
var Content = /** @class */ (function () {
    function Content() {
    }
    Content._index = function (event, args) {
        var searchText = null;
        if (!(0, lodash_1.isEmpty)(args[0].searchText)) {
            searchText = args[0].searchText;
        }
        var category = null;
        if (!(0, lodash_1.isEmpty)(args[0].category)) {
            category = args[0].category;
        }
        var defaultSearch = {};
        fieldService.getSearchFields()
            .then(function (searchFields) {
            console.log('searchFields', searchFields);
            var fieldSearch = [];
            if (!(0, lodash_1.isEmpty)(searchText)) {
                searchFields.data.forEach(function (field) {
                    var _a, _b;
                    console.log((_a = {}, _a[field.code] = { $regex: new RegExp(searchText) }, _a));
                    fieldSearch.push((_b = {}, _b[field.code] = { $regex: new RegExp(searchText) }, _b));
                });
                if (!(0, lodash_1.isEmpty)(fieldSearch)) {
                    defaultSearch['$or'] = fieldSearch;
                }
            }
            if (!(0, lodash_1.isEmpty)(category)) {
                defaultSearch['category'] = category;
            }
            var contentPage = {
                'size': args[0].size,
                'page': args[0].page
            };
            console.log('defaultSearch', defaultSearch, contentPage);
            contentService.getContent(defaultSearch, contentPage)
                .then(function (data) {
                event.autoReplay(data);
            });
        });
        // db.db()
        // .find(Object.assign(args[0]),(err,data) => {
        //     if(data){
        //         event.autoReplay({
        //             success : true,
        //             data : data
        //         })
        //     }
        //
        // })
    };
    Content._count = function (event, args) {
        var searchText = null;
        if (!(0, lodash_1.isEmpty)(args[0].searchText)) {
            searchText = args[0].searchText;
        }
        var category = null;
        if (!(0, lodash_1.isEmpty)(args[0].category)) {
            category = args[0].category;
        }
        var defaultSearch = {};
        fieldService.getSearchFields()
            .then(function (searchFields) {
            console.log('searchFields', searchFields);
            var fieldSearch = [];
            if (!(0, lodash_1.isEmpty)(searchText)) {
                searchFields.data.forEach(function (field) {
                    var _a, _b;
                    console.log((_a = {}, _a[field.code] = { $regex: new RegExp(searchText) }, _a));
                    fieldSearch.push((_b = {}, _b[field.code] = { $regex: new RegExp(searchText) }, _b));
                });
                if (!(0, lodash_1.isEmpty)(fieldSearch)) {
                    defaultSearch['$or'] = fieldSearch;
                }
            }
            if (!(0, lodash_1.isEmpty)(category)) {
                defaultSearch['category'] = category;
            }
            console.log('defaultSearch', defaultSearch);
            contentService.getCount(defaultSearch)
                .then(function (data) {
                event.autoReplay(data);
            });
        });
        // db.db()
        // .find(Object.assign(args[0]),(err,data) => {
        //     if(data){
        //         event.autoReplay({
        //             success : true,
        //             data : data
        //         })
        //     }
        //
        // })
    };
    Content.index = function (event, args) {
        db.db().find(Object.assign(args)).sort({ createdAt: -1 }).exec(function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    Content.insert = function (event, args) {
        console.log('content insert db');
        db.db().insert(Object.assign(args, {
            'is_deleted': "N",
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
    Content.update = function (event, args) {
        db.db().update(args, function (err, data) {
            return event.returnValue = {
                success: true,
                data: data
            };
        });
    };
    return Content;
}());
new BaseController_1.BaseController(Content);
