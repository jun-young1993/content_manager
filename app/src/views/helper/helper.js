"use strict";
exports.__esModule = true;
exports.invoker = exports.showDrawer = exports.showConfirm = exports.showAlert = exports.sender = void 0;
var electron_1 = require("electron");
// declare var _MODELS: any;
var sender = function (channel, arg1, arg2) {
    return new Promise(function (resolve, reject) {
        try {
            var replyChannel_1 = "".concat(channel, "/reply");
            electron_1.ipcRenderer.send(channel, arg1, arg2);
            electron_1.ipcRenderer.on(replyChannel_1, function (event, result) {
                electron_1.ipcRenderer.removeAllListeners(replyChannel_1);
                resolve(result);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.sender = sender;
var invoker = function (channel) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    return electron_1.ipcRenderer.invoke(channel, arg);
};
exports.invoker = invoker;
var showAlert = function (options, onClose) {
    return new Promise(function (resolve, reject) {
        electron_1.ipcRenderer.send("#ShowMessageAlert", options);
        if (onClose) {
            electron_1.ipcRenderer.on("#ShowMessageAlertClose/reply", function (event, args) {
                electron_1.ipcRenderer.removeAllListeners("#ShowMessageAlertClose/reply");
                onClose();
            });
        }
    });
};
exports.showAlert = showAlert;
var showConfirm = function (options, onClick) {
    return new Promise(function (resolve, reject) {
        electron_1.ipcRenderer.send("#ShowMessageConfirm", options);
        if (onClick) {
            electron_1.ipcRenderer.on("#ShowMessageConfirmClose/reply", function (event, args) {
                onClick(args);
                electron_1.ipcRenderer.removeAllListeners("ShowMessageConfirmClose/reply");
            });
        }
    });
};
exports.showConfirm = showConfirm;
var showDrawer = function (options, onClick) {
    electron_1.ipcRenderer.send('#ShowDrawer', options);
    if (onClick) {
        electron_1.ipcRenderer.on("#ShowDrawerClose/reply", function (event) {
            console.log('heper drawre close');
            onClick();
            electron_1.ipcRenderer.removeAllListeners("ShowDrawerClose/reply");
        });
    }
};
exports.showDrawer = showDrawer;
