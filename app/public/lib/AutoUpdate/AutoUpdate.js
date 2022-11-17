"use strict";
exports.__esModule = true;
exports.AutoUpdate = void 0;
var autoUpdater = require('electron-updater').autoUpdater;
var _a = require('../helper/ElectronHelper'), getBrowserWindow = _a.getBrowserWindow, getElectronModule = _a.getElectronModule;
var log = require('../Logger');
var electron_1 = require("electron");
var ChildrenWindows_1 = require("../../src/boots/events/listener/ChildrenWindows");
var AutoUpdate = /** @class */ (function () {
    function AutoUpdate(options) {
        if (options === void 0) { options = {}; }
        var logger = log.channel("main");
        logger.transports.file.level = "debug";
        autoUpdater.logger = logger;
        var instanceLock = electron_1.app.requestSingleInstanceLock();
        log.channel("main").info('[Start App Updater] => ', instanceLock);
        if (instanceLock) {
            // const _this = this;
            // if(isFunction(methods.available)){
            // 	this.isCheck(autoUpdater,methods)
            // }
            // if(isFunction(methods.update)){	
            // 	this.update(autoUpdater,methods)
            // }
            // if(isDev){
            // 	Object.defineProperty(app,'isPackaged',{
            // 		get(){
            // 			return true;
            // 		}
            // 	})
            // }
            if (options.window) {
                this.window = new ChildrenWindows_1.ChildrenBrowserWindow({});
                // detailWindow.readyToShow(`share`)
            }
            this.update(autoUpdater);
            autoUpdater.checkForUpdates();
        }
    }
    AutoUpdate.prototype.showBrowser = function () {
        if (this.window) {
            this.window.readyToShow("share");
        }
    };
    AutoUpdate.prototype.sendWindowMessage = function (channel) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        if (this.window) {
            this.window.browserWindow.webContents.send("auto-update-" + channel, arg);
        }
    };
    AutoUpdate.prototype.update = function (autoUpdater) {
        var _this = this;
        autoUpdater.on('update-downloaded', function (info) {
            // log.info('update-downloaded')
            log.channel("main").info("[AutoUpdater][update-downloaded] quit and install", info);
            log.channel("main").info("[AutoUpdater][update-downloaded] quit and install start");
            _this.sendWindowMessage("update-downloaded", "update-downloaded");
            autoUpdater.quitAndInstall();
            // methods.update()
        });
        autoUpdater.on('checking-for-update', function () {
            log.channel("main").info("[AutoUpdater][checking-for-update] checking for update");
            _this.sendWindowMessage("checking-for-update", "checking-for-update");
            // log.info('checking-for-update...');
            // createDefaultUpdateWindow()
            // updateWin.webContents.send('message','업데이트 확인 중...','auto-update')
        });
        autoUpdater.on('update-not-available', function (info) {
            log.channel("main").info("[AutoUpdater][update-not-available] update not available / currently the latest version", info);
            _this.sendWindowMessage("update-not-available", "update-not-available");
            // log.info('not available.');
            // updateWin.webContents.send('message','현재 최신버전입니다.','auto-update')
        });
        autoUpdater.on('update-available', function (info) {
            log.channel("main").info("[AutoUpdater][update-available]", info);
            // if(isFunction(methods.available)){
            log.channel("main").info("[AutoUpdater][update-available] available");
            _this.showBrowser();
            _this.sendWindowMessage("update-available", "update-available");
            // methods.available()
            // }
            // log.info('available.');
            // createDefaultUpdateWindow()
            // updateWin.webContents.send('message','업데이트가 가능합니다.','auto-update')
        });
        autoUpdater.on('error', function (err) {
            log.channel("main").error("[AutoUpdater][Exception]", err);
            _this.sendWindowMessage("error", err);
            // log.info('에러가 발생하였습니다. 에러내용 : ' + err);
            // updateWin.webContents.send('message','에러가 발생하였습니다. 에러내용 : ' + err,'update_error')
        });
        autoUpdater.on('download-progress', function (progressObj) {
            log.channel("main").info("[AutoUpdater][download-progress]", progressObj.bytesPerSecond);
            _this.sendWindowMessage("download-progress", {
                percent: progressObj.percent,
                bytesPerSecond: progressObj.bytesPerSecond,
                transferred: progressObj.transferred,
                progressObj: progressObj.total
            });
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
            _this.sendWindowMessage("update-downloaded", "update-downloaded");
            // updateWin.webContents.send('message','','update_complete')
            // app.quit()
        });
    };
    return AutoUpdate;
}());
exports.AutoUpdate = AutoUpdate;
