"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');
electron_1.ipcMain.handle("$content-detail-window", function (event) {
    var parentBrowerser = electron_1.BrowserWindow.getFocusedWindow();
    // return new Promise((resolve, reject) => {
    var detailWindow = new electron_1.BrowserWindow({
        parent: parentBrowerser,
        webPreferences: {
            // node환경처럼 사용하기
            nodeIntegration: true,
            // enableRemoteModule: true,
            // 개발자도구
            contextIsolation: false,
            devTools: isDev
        }
    });
    console.log('child browser url', isDev ? "http://localhost:3000/#/content-detail/1" : "file://".concat(path.join(__dirname, '../build/index.html/#/content-detail/1')));
    detailWindow.loadURL(isDev ? "http://localhost:3000/#/content-detail/1" : "file://".concat(path.join(__dirname, '../build/index.html/#/content-detail/1')));
    detailWindow.once('ready-to-show', function () {
        detailWindow.show();
        // setTimeout(() => {
        //     detailWindow.close();
        // },3000)
    });
    return true;
    // })
});
