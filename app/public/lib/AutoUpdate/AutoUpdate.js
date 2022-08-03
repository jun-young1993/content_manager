"use strict";
exports.__esModule = true;
exports.AutoUpdate = void 0;
var autoUpdater = require('electron-updater').autoUpdater;
var isDev = require("electron-is-dev");
var _a = require('../helper/ElectronHelper'), getBrowserWindow = _a.getBrowserWindow, getElectronModule = _a.getElectronModule;
var log = require('../Logger');
var electron_1 = require("electron");
var lodash_1 = require("lodash");
var AutoUpdate = /** @class */ (function () {
    function AutoUpdate(methods) {
        var logger = log.channel("main");
        logger.transports.file.level = "debug";
        autoUpdater.logger = logger;
        log.channel("main").info('[Start App Updater]');
        var _this = this;
        // event.reply('auto-update/available','available');
        if ((0, lodash_1.isFunction)(methods.available)) {
            methods.available();
        }
        autoUpdater.on('update-downloaded', function (info) {
            // log.info('update-downloaded')
            log.channel("main").info("[AutoUpdater][update-downloaded] quit and install", info);
            if ((0, lodash_1.isFunction)(methods.update)) {
                autoUpdater.quitAndInstall();
                methods.update();
            }
        });
        autoUpdater.on('checking-for-update', function () {
            log.channel("main").info("[AutoUpdater][checking-for-update] checking for update");
            // log.info('checking-for-update...');
            // createDefaultUpdateWindow()
            // updateWin.webContents.send('message','업데이트 확인 중...','auto-update')
        });
        autoUpdater.on('update-not-available', function (info) {
            log.channel("main").info("[AutoUpdater][update-not-available] update not available / currently the latest version", info);
            // log.info('not available.');
            // updateWin.webContents.send('message','현재 최신버전입니다.','auto-update')
        });
        autoUpdater.on('update-available', function (info) {
            log.channel("main").info("[AutoUpdater][update-available]", info);
            // log.info('available.');
            // createDefaultUpdateWindow()
            // updateWin.webContents.send('message','업데이트가 가능합니다.','auto-update')
        });
        autoUpdater.on('error', function (err) {
            log.channel("main").error("[AutoUpdater][Exception]", err);
            // log.info('에러가 발생하였습니다. 에러내용 : ' + err);
            // updateWin.webContents.send('message','에러가 발생하였습니다. 에러내용 : ' + err,'update_error')
        });
        autoUpdater.on('download-progress', function (progressObj) {
            log.channel("main").info("[AutoUpdater][download-progress]", progressObj.bytesPerSecond);
            // let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
            // log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
            // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
            // log.info(log_message);
            // updateWin.webContents.send('message',progressObj.bytesPerSecond,'update_download_speed')
            // updateWin.webContents.send('message',parseInt(progressObj.percent),'update_progress_percent')
        });
        autoUpdater.on('update-downloaded', function (info) {
            // log.info('업데이트가 완료되었습니다.');
            log.channel("main").info("[AutoUpdater][update-downloaded] update completed", info);
            // updateWin.webContents.send('message','','update_complete')
            // app.quit()
        });
        if (isDev) {
            Object.defineProperty(electron_1.app, 'isPackaged', {
                get: function () {
                    return true;
                }
            });
        }
        autoUpdater.checkForUpdatesAndNotify();
    }
    return AutoUpdate;
}());
exports.AutoUpdate = AutoUpdate;
