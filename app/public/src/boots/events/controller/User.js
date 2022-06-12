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
        userDb.get().then(function (resolve) {
            return event.returnValue = {
                success: true,
                data: resolve
            };
        });
    };
    User.insert = function (event, args) {
        userDb.insert(args).then(function (resolve) {
            console.log(resolve);
            return event.returnValue = {
                success: true,
                data: resolve
            };
        });
    };
    return User;
}());
new BaseController_1.BaseController(User);
