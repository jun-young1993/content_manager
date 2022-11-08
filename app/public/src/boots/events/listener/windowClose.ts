import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from "electron";
import * as isDev from 'electron-is-dev';
import * as path from 'path';
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');



ipcMain.handle("$focus-window-close",(event:IpcMainInvokeEvent,contentId:string)=>{
    const focusBrowerser : any =  BrowserWindow.getFocusedWindow();
// return new Promise((resolve, reject) => {
    focusBrowerser.close();

// })
    return true;



});

