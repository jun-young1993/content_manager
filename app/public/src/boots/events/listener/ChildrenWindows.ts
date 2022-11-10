import {BrowserWindow, ipcMain, IpcMainInvokeEvent , BrowserWindowConstructorOptions, screen} from "electron";
import * as isDev from 'electron-is-dev';
import * as path from 'path';
const Store = require("electron-store");
import {channel} from "../../../../lib/Logger";

// const {getBrowserWindow} = require('../../../../lib/helper/ElectronHelper');
interface ChildrenBrowserWindowProperty {
    
}
class ChildrenBrowserWindow{
    browserWindow : BrowserWindow;
    constructor(options ?: ChildrenBrowserWindowProperty){
        const parentBrowerser : any =  BrowserWindow.getFocusedWindow();
        const childrenBrowserWindowProperty : BrowserWindowConstructorOptions= {...{},...(options || {}),...{
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
              show: false,
              frame: false,
              alwaysOnTop: true,
              thickFrame: false
        }};
        
        this.browserWindow = new BrowserWindow(childrenBrowserWindowProperty)
        
        
        
        
   
    }
    
    readyToShow(url:string): Promise<Boolean> {
        
        return new Promise((resolve , reject) => {
            channel("children-window").info('[CHILDREN DIR]',isDev? `localhost:3000/index.html/#/${url}` : `${path.join(__dirname, `../../../../../build/index.html`)}`);
            this.browserWindow.loadURL(isDev? `http://localhost:3000/index.html/#/${url}` : `file://${path.join(__dirname, `../../../../../build/index.html`)}`);    
            
            
            this.browserWindow.once('ready-to-show', () => {
                if(!isDev){
                this.browserWindow.webContents.executeJavaScript(`window.location.hash = "#/${url}"`).then((response) => {
                    
                        channel("children-window").info('[HSAH ROUTER]',`#/${url}`);
                    
                })
                }
                this.browserWindow.show();
                return resolve(true);
                // setTimeout(() => {
                //     detailWindow.close();
                // },3000)
            })
        })
    }
}
ipcMain.handle("$lan-share-window",(event:IpcMainInvokeEvent) : Promise<Boolean> => {
        
        const detailWindow : ChildrenBrowserWindow = new ChildrenBrowserWindow({
            
        });
        return detailWindow.readyToShow(`share`)

    




});


/**
 * @params event - no
 * @params contentId - contentId
 * @returns Promise<Boolean>
 */
ipcMain.handle("$content-detail-window",(event:IpcMainInvokeEvent,contentId:string) : Promise<Boolean> => {

    const store = new Store();
    const widthPercent = store.get('content.panel_width');
    const heightPercent = store.get('content.panel_height');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width , height  } = primaryDisplay.workAreaSize;
    const detailWindow : ChildrenBrowserWindow = new ChildrenBrowserWindow({
        width : widthPercent ? width * widthPercent / 100 : 800,
        height : heightPercent ? height * heightPercent / 100 : 600
    });
    return detailWindow.readyToShow(`content-detail?content_id=${contentId}`)

});

