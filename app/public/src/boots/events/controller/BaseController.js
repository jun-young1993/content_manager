"use strict";
exports.__esModule = true;
exports.BaseController = void 0;
var electron_1 = require("electron");
var BaseController = /** @class */ (function () {
    function BaseController(controller) {
        var _this_1 = this;
        this.getAllMethods = function () {
            var props = [];
            var obj = _this_1.controller;
            do {
                var l = Object.getOwnPropertyNames(obj)
                    .concat(Object.getOwnPropertySymbols(obj).map(function (s) { return s.toString(); }))
                    .sort()
                    .filter(function (p, i, arr) {
                    return typeof obj[p] === 'function' && //only the methods
                        p !== 'constructor' && //not the constructor
                        (i == 0 || p !== arr[i - 1]) && //not overriding in this prototype
                        props.indexOf(p) === -1;
                } //not overridden in a child
                );
                props = props.concat(l);
            } while ((obj = Object.getPrototypeOf(obj)) && //walk-up the prototype chain
                Object.getPrototypeOf(obj) //not the the Object prototype methods (hasOwnProperty, etc...)
            );
            return props;
        };
        console.log('baseCOntroller this');
        this.controller = controller;
        this.ipcOn();
    }
    BaseController.prototype.ipcOn = function () {
        var allMethods = this.getMethods();
        var _this = this;
        console.log(allMethods);
        for (var index = 0; index < allMethods.length; index++) {
            var methodName = allMethods[index];
            console.log(methodName);
            var channel = _this.makeChannel(methodName);
            // ipcMain.on(channel,(event,args) =>{
            //     _this.controller[methodName](event,args);
            // });
            electron_1.ipcMain.on(channel, _this.controller[methodName]);
        }
    };
    BaseController.prototype.makeChannel = function (methodName) {
        var channel = '@' + this.controller.name + '/' + methodName;
        return channel;
    };
    BaseController.prototype.getMethods = function () {
        var controller = this.controller;
        // const methods = [];
        // const ownPropertyNames = Object.getOwnPropertyNames(controller.prototype);
        var ownPropertyNames = Object.getOwnPropertyNames(controller);
        // for(let name in ownPropertyNames){
        //
        //     if(ownPropertyNames[name] != 'constructor'){
        //         methods.push(ownPropertyNames[name]);
        //     }
        // }
        var methods = ownPropertyNames.filter(function (prop) { return typeof controller[prop] === "function"; });
        return methods;
    };
    return BaseController;
}());
exports.BaseController = BaseController;
