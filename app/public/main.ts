
import { app, BrowserWindow, session, Event} from 'electron';
const electron = require('electron');

// import * as remoteMain from '@electron/remote/main';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import {AutoLoader} from './lib/AutoLoad/AutoLoader';
import {showMessageBox} from "./lib/helper/ElectronHelper";
// import 'module-alias/register';
import {channel, channel as logChannel} from "./lib/Logger";
import {AutoUpdate} from "./lib/AutoUpdate/AutoUpdate";
let mainWindow: BrowserWindow;
const Store = require("electron-store");
const store = new Store();

logChannel("main").info('[APP BEFORE START]');

const instanceLock:Boolean = app.requestSingleInstanceLock();
if(!instanceLock){
  logChannel("full").info('[APP Single Instancel Lock Quit]');
  app.quit();
  app.exit();
}

const boots = new AutoLoader(path.join(__dirname,'./src/boots/**/*.js'),{
  allDone : () => {
    store.set("app.latest_migration_version",app.getVersion());
  }
});

boots.loader({
  ...((store.get("app.latest_migration_version") === app.getVersion()) ? {
        ignore : [
          "**/src/boots/migration/**"
        ]
      } : {})
});

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
app.disableHardwareAcceleration();

const createWindow = () => {
  
  mainWindow = new BrowserWindow({
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
      devTools: isDev,
    },
  });
  // remoteMain.enable(mainWindow.webContents);
  // production에서는 패키지 내부 리소스에 접근.
  // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
  channel('main').info('[MAIN WINDOW LOAD URL]',isDev ? 'localhost:3000' : `${path.join(__dirname, '../build/index.html')}`)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.setResizable(true);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => (mainWindow = undefined!));
  mainWindow.focus();








  
};
app.whenReady().then(async () => {
  logChannel("full").info('[APP WHEN READY]');
  new AutoUpdate({window : true});
  // await session.defaultSession.loadExtension("C:\\Users\\jun\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\ghbmnnjooekpmoecnnnilnnbdlolhkhi\\1.44.2_0")
  // await session.defaultSession.removeExtension('ghbmnnjooekpmoecnnnilnnbdlolhkhi');
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  logChannel("full").info('[APP READY]');
  createWindow();





  const boots = new AutoLoader(path.join(__dirname,'./src/events/ready/**/*.js'));
  boots.loader();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
process.on('uncaughtException', (err) => {
  logChannel('uncaughtException').error('[an uncaught exception detected]', err)
  
  if(Boolean(store.get('exception.alert_show'))){
    showMessageBox({
      title : "uncaughtException",
      type : "warning",
      detail  : err
    })
  }

  

})

process.on('unhandledRejection', (err) => {
  logChannel('unhandledRejection').error('[an unhandled rejection detected]', err)
  if(Boolean(store.get('exception.alert_show'))){
    showMessageBox({
      title : 'unhandledRejection',
      type : "warning",
      detail  : err
    })
  }
})
// app.on('web-contents-created',(event:Event, browserWindow: BrowserWindow) => {
    
//     // AutoUpdate.checkForUpdates();
//     // const boots = new AutoLoader(path.join(__dirname,'./src/events/web-contents-created/**/*.js'));
//     // boots.loader();
//     // console.log('borwser window',browserWindow);
// })