"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
onIpc("#ShowMessageAlert", function (event, args) {
    console.log('show message alert ts',args);
    event.reply("#ShowMessageAlert/reply", args);
});
