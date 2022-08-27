const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";

onIpc("#ShowMessageConfirm",(event:IpcMainEvent,args) => {
    event.reply("#ShowMessageConfirm/reply",args);
})


onIpc("#ShowMessageConfirmClose",(event:IpcMainEvent,args) => {
    console.log('ShowMessageConfirmClose');
    event.reply("#ShowMessageConfirmClose/reply",args);
})