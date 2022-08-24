const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";

onIpc("#ShowMessageAlert",(event:IpcMainEvent,args) => {
    event.reply("#ShowMessageAlert/reply",args);
})


onIpc("#ShowMessageAlertClose",(event:IpcMainEvent,args) => {
    console.log('ShowMessageAlertClose');
    event.reply("#ShowMessageAlertClose/reply",args);
})