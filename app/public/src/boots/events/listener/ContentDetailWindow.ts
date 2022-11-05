import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from "electron";
import * as isDev from 'electron-is-dev';
import * as path from 'path';
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');

ipcMain.handle("$content-detail-window",(event:IpcMainInvokeEvent)=>{
        const parentBrowerser : any =  BrowserWindow.getFocusedWindow();
    // return new Promise((resolve, reject) => {
        const detailWindow:BrowserWindow = new BrowserWindow({
            parent: parentBrowerser,
            webPreferences: {
                // node환경처럼 사용하기
                nodeIntegration: true,
                // enableRemoteModule: true,
                // 개발자도구
                contextIsolation: false,
                devTools: isDev,
              },
            // modal: true,
            // show : false,
            // frame: true
        });
        console.log('child browser url',isDev ? "http://localhost:3000/#/share" : `file://${path.join(__dirname, '../build/index.html/#/share')}`);
        detailWindow.loadURL(isDev ? "http://localhost:3000/#/share" : `file://${path.join(__dirname, '../build/index.html/#/share')}`);
        detailWindow.once('ready-to-show', () => {
            detailWindow.show();
            // setTimeout(() => {
            //     detailWindow.close();
            // },3000)
        })
        return true;

    // })




});

