import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from "electron";
import * as isDev from 'electron-is-dev';
import * as path from 'path';
// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');

ipcMain.handle("$lan-share-window",(event:IpcMainInvokeEvent)=>{
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
            modal: true,
            show : false,
            // frame: true
        });
        console.log('child browser url',isDev ? "http://localhost:3000/index.html/#/share" : `file://${path.join(__dirname, '../build/index.html/#/share')}`);
        detailWindow.loadURL(isDev ? "http://localhost:3000/index.html/#/share" : `file://${path.join(__dirname, '../build/index.html/#/share')}`);
        detailWindow.once('ready-to-show', () => {
            detailWindow.show();
            // setTimeout(() => {
            //     detailWindow.close();
            // },3000)
        })
        return true;

    // })




});



ipcMain.handle("$content-detail-window",(event:IpcMainInvokeEvent,contentId:string)=>{

    return new Promise((resolve) => {
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
                modal: isDev,
                show : false,
                frame: !isDev
            });
            
            
        
            // logger().info('child browser url',isDev ? `http://localhost:3000/index.html/#/content-detail?content_id=${contentId}` : `file://${path.join(__dirname, `../build/index.html/#/content-detail?content_id=${contentId}`)}`);
            detailWindow.loadURL(isDev ? `http://localhost:3000/index.html/#/content-detail?content_id=${contentId}` : `file://${path.join(__dirname, `../build/index.html/#/content-detail?content_id=${contentId}`)}`);
            detailWindow.once('ready-to-show', () => {
                detailWindow.show();
                return resolve(true);
                // setTimeout(() => {
                //     detailWindow.close();
                // },3000)
            })
            
        
        // })
        
    })
   



});

