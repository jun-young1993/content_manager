"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
onIpc("#ShowDrawer", function (event, args) {
    event.reply("#ShowDrawer/reply", args);
});
onIpc("#ShowDrawerClose", function (event, args) {
    console.log('ShowDrawerClose');
    event.reply("#ShowDrawerClose/reply");
});
