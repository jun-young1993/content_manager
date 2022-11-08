"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');
electron_1.ipcMain.handle("$focus-window-close", function (event, contentId) {
    var focusBrowerser = electron_1.BrowserWindow.getFocusedWindow();
    // return new Promise((resolve, reject) => {
    focusBrowerser.close();
    // })
    return true;
});
