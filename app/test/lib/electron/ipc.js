
const electron = require("electron");
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
ipcMain.on('test',(event,...args)=>{
    console.log(args);
})

ipcRenderer.sendSync('test',{test:'test'});