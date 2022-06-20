"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var User_1 = require("../../../../../public/models/User");
// import {User} from "@model/User";
var userDb = new User_1.User();
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
var User = /** @class */ (function () {
    function User() {
    }
    User.index = function (event, args) {
        userDb.db().find({ is_deleted: 'N' }, function (err, data) {
            if (data) {
                return event.returnValue = {
                    success: true,
                    data: data
                };
            }
        });
    };
    User.insert = function (event, args) {
        userDb.db().insert(Object.assign(args, {
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
    User.update = function (event, args) {
        userDb.db().update(args, function (err, data) {
            return event.returnValue = data;
        });
    };
    return User;
}());
new BaseController_1.BaseController(User);
