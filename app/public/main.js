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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var electron = require('electron');
// import * as remoteMain from '@electron/remote/main';
var isDev = require("electron-is-dev");
var path = require("path");
var AutoLoader_1 = require("./lib/AutoLoad/AutoLoader");
var ElectronHelper_1 = require("./lib/helper/ElectronHelper");
// import 'module-alias/register';
var Logger_1 = require("./lib/Logger");
var mainWindow;
var Store = require("electron-store");
var store = new Store();
(0, Logger_1.channel)("main").info('[APP BEFORE START]');
var instanceLock = electron_1.app.requestSingleInstanceLock();
if (!instanceLock) {
    (0, Logger_1.channel)("full").info('[APP Single Instancel Lock Quit]');
    electron_1.app.quit();
    electron_1.app.exit();
}
var boots = new AutoLoader_1.AutoLoader(path.join(__dirname, './src/boots/**/*.js'), {
    allDone: function () {
        store.set("app.latest_migration_version", electron_1.app.getVersion());
    }
});
(0, Logger_1.channel)('main').info('[store.get("app.latest_migration_version")]', store.get("app.latest_migration_version"));
(0, Logger_1.channel)('main').info('app.getVersion()', electron_1.app.getVersion());
(0, Logger_1.channel)('main').info('(store.get("app.latest_migration_version") === app.getVersion())', (store.get("app.latest_migration_version") === electron_1.app.getVersion()));
(0, Logger_1.channel)('main').info('[loader option]', __assign({}, ((store.get("app.latest_migration_version") === electron_1.app.getVersion()) ? {} : {
    ignore: [
        "**/src/boots/migration/**"
    ]
})));
boots.loader(__assign({}, ((store.get("app.latest_migration_version") === electron_1.app.getVersion()) ? {} : {
    ignore: [
        "**/src/boots/migration/**"
    ]
})));
// ipcMain.on('test',(events,...args)=>{
//   console.log('test render');
//   console.log('events',events)
//   console.log('args',args)
// });
// global.console.log = (string:any)=> {
//   console.info('===================');
// 	console.info(__filename);
// 	console.info(string)
// 	console.info('===================');
// }
electron_1.app.disableHardwareAcceleration();
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1248,
        height: 750,
        center: true,
        // kiosk: !isDev,
        resizable: true,
        fullscreen: false,
        fullscreenable: true,
        webPreferences: {
            // node환경처럼 사용하기
            nodeIntegration: true,
            // enableRemoteModule: true,
            // 개발자도구
            contextIsolation: false,
            devTools: isDev
        }
    });
    // remoteMain.enable(mainWindow.webContents);
    // production에서는 패키지 내부 리소스에 접근.
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
    (0, Logger_1.channel)('main').info('[MAIN WINDOW LOAD URL]', isDev ? 'localhost:3000' : "".concat(path.join(__dirname, '../build/index.html')));
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : "file://".concat(path.join(__dirname, '../build/index.html')));
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    mainWindow.setResizable(true);
    // Emitted when the window is closed.
    mainWindow.on('closed', function () { return (mainWindow = undefined); });
    mainWindow.focus();
};
electron_1.app.whenReady().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', function () {
    (0, Logger_1.channel)("full").info('[APP READY]');
    createWindow();
    var boots = new AutoLoader_1.AutoLoader(path.join(__dirname, './src/events/ready/**/*.js'));
    boots.loader();
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
process.on('uncaughtException', function (err) {
    (0, Logger_1.channel)('uncaughtException').error('[an uncaught exception detected]', err);
    if (Boolean(store.get('exception.alert_show'))) {
        (0, ElectronHelper_1.showMessageBox)({
            title: "uncaughtException",
            type: "warning",
            detail: err
        });
    }
});
process.on('unhandledRejection', function (err) {
    (0, Logger_1.channel)('unhandledRejection').error('[an unhandled rejection detected]', err);
    if (Boolean(store.get('exception.alert_show'))) {
        (0, ElectronHelper_1.showMessageBox)({
            title: 'unhandledRejection',
            type: "warning",
            detail: err
        });
    }
});
// app.on('web-contents-created',(event:Event, browserWindow: BrowserWindow) => {
//     // AutoUpdate.checkForUpdates();
//     // const boots = new AutoLoader(path.join(__dirname,'./src/events/web-contents-created/**/*.js'));
//     // boots.loader();
//     // console.log('borwser window',browserWindow);
// })
