"use strict";
exports.__esModule = true;
exports.showAlert = exports.sender = void 0;
var electron_1 = require("electron");
var sender = function (channel, arg1, arg2) {
    return new Promise(function (resolve, reject) {
        try {
            var replyChannel_1 = "".concat(channel, "/reply");
            electron_1.ipcRenderer.send(channel, arg1, arg2);
            electron_1.ipcRenderer.on(replyChannel_1, function (event, result) {
                resolve(result);
                electron_1.ipcRenderer.removeAllListeners(replyChannel_1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.sender = sender;
var showAlert = function (options, onClose) {
    return new Promise(function (resolve, reject) {
        electron_1.ipcRenderer.send("#ShowMessageAlert", options);
        if (onClose) {
            electron_1.ipcRenderer.on("#ShowMessageAlertClose/reply", function (event, args) {
                onClose();
            });
        }
    });
};
exports.showAlert = showAlert;
