import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from "electron";

// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');

ipcMain.handle("$content-detail-window",(event:IpcMainInvokeEvent)=>{

    // return new Promise((resolve, reject) => {
        const detailWindow:BrowserWindow = new BrowserWindow({
            parent: BrowserWindow.getFocusedWindow(),
            // modal: true,
            // show : false,
            // frame: true
        });
        detailWindow.loadURL("http://localhost:11101/share/");
        detailWindow.once('ready-to-show', () => {
            detailWindow.show();
            // setTimeout(() => {
            //     detailWindow.close();
            // },3000)
        })


    // })




});

