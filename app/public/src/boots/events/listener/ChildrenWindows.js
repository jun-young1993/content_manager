"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var Store = require("electron-store");
var Logger_1 = require("../../../../lib/Logger");
var ChildrenBrowserWindow = /** @class */ (function () {
    function ChildrenBrowserWindow(options) {
        var parentBrowerser = electron_1.BrowserWindow.getFocusedWindow();
        var childrenBrowserWindowProperty = __assign(__assign({}, (options || {})), {
            parent: parentBrowerser,
            webPreferences: {
                // node환경처럼 사용하기
                nodeIntegration: true,
                // enableRemoteModule: true,
                // 개발자도구
                contextIsolation: false,
                devTools: isDev
            },
            modal: true,
            show: true,
            frame: false,
            alwaysOnTop: true,
            thickFrame: false
        });
        this.browserWindow = new electron_1.BrowserWindow(childrenBrowserWindowProperty);
    }
    ChildrenBrowserWindow.prototype.readyToShow = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, Logger_1.channel)("children-window").info('[CHILDREN DIR]', isDev ? "localhost:3000/index.html/#/".concat(url) : "".concat(path.join(__dirname, "../../../../../build/index.html")));
            _this.browserWindow.loadURL(isDev ? "http://localhost:3000/index.html/#/".concat(url) : "file://".concat(path.join(__dirname, "../../../../../build/index.html")));
            _this.browserWindow.once('ready-to-show', function () {
                if (!isDev) {
                    _this.browserWindow.webContents.executeJavaScript("window.location.hash = \"#/".concat(url, "\"")).then(function (response) {
                        (0, Logger_1.channel)("children-window").info('[HSAH ROUTER]', "#/".concat(url));
                    });
                }
                _this.browserWindow.show();
                return resolve(true);
                // setTimeout(() => {
                //     detailWindow.close();
                // },3000)
            });
        });
    };
    return ChildrenBrowserWindow;
}());
electron_1.ipcMain.handle("$lan-share-window", function (event) {
    var detailWindow = new ChildrenBrowserWindow({});
    return detailWindow.readyToShow("share");
});
/**
 * @params event - no
 * @params contentId - contentId
 * @returns Promise<Boolean>
 */
electron_1.ipcMain.handle("$content-detail-window", function (event, contentId) {
    var store = new Store();
    var widthPercent = store.get('content.panel_width');
    var heightPercent = store.get('content.panel_height');
    var primaryDisplay = electron_1.screen.getPrimaryDisplay();
    var _a = primaryDisplay.workAreaSize, width = _a.width, height = _a.height;
    var detailWindow = new ChildrenBrowserWindow({
        width: widthPercent ? width * widthPercent / 100 : 800,
        height: heightPercent ? height * heightPercent / 100 : 600
    });
    return detailWindow.readyToShow("content-detail?content_id=".concat(contentId));
});
