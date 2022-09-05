const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";

onIpc("#ShowDrawer",(event:IpcMainEvent,args) => {
    event.reply("#ShowDrawer/reply",args);
})


onIpc("#ShowDrawerClose",(event:IpcMainEvent,args) => {
    console.log('ShowDrawerClose');
    event.reply("#ShowDrawerClose/reply",args);
})