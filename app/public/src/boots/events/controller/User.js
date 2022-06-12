"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var User = /** @class */ (function () {
    function User() {
    }
    User.insert = function (event, args) {
        console.log(args);
    };
    return User;
}());
new BaseController_1.BaseController(User);
