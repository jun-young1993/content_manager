"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
var AutoUpdate_1 = require("../../../../lib/AutoUpdate/AutoUpdate");
onIpc('auto-update-start', function (event) {
    new AutoUpdate_1.AutoUpdate({
        window: true
    });
});
