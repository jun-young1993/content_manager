import { app, BrowserWindow, session, Event} from 'electron';
const electron = require('electron');
import {ipcMain,ipcRenderer} from "electron";
// import * as remoteMain from '@electron/remote/main';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import {AutoLoader} from './lib/AutoLoad/AutoLoader';
import {sendIpc, onIpc} from "./lib/helper/ElectronHelper";
// import 'module-alias/register';

let mainWindow: BrowserWindow;
const boots = new AutoLoader(path.join(__dirname,'./src/boots/**/*.js'));
boots.loader();

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

  // await session.defaultSession.loadExtension("C:\\Users\\jun\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\ghbmnnjooekpmoecnnnilnnbdlolhkhi\\1.44.2_0")
  // await session.defaultSession.removeExtension('ghbmnnjooekpmoecnnnilnnbdlolhkhi');
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  
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

// app.on('web-contents-created',(event:Event, browserWindow: BrowserWindow) => {
    
//     // AutoUpdate.checkForUpdates();
//     // const boots = new AutoLoader(path.join(__dirname,'./src/events/web-contents-created/**/*.js'));
//     // boots.loader();
//     // console.log('borwser window',browserWindow);
// })