"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');
electron_1.ipcMain.handle("$content-detail-window", function (event) {
    // return new Promise((resolve, reject) => {
    var detailWindow = new electron_1.BrowserWindow({
        parent: electron_1.BrowserWindow.getFocusedWindow()
    });
    detailWindow.loadURL("http://localhost:11101/share/");
    detailWindow.once('ready-to-show', function () {
        detailWindow.show();
        // setTimeout(() => {
        //     detailWindow.close();
        // },3000)
    });
    // })
});
