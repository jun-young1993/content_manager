"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
onIpc("#ShowMessageConfirm", function (event, args) {
    event.reply("#ShowMessageConfirm/reply", args);
});
onIpc("#ShowMessageConfirmClose", function (event, args) {
    console.log('ShowMessageConfirmClose');
    event.reply("#ShowMessageConfirmClose/reply", args);
});
