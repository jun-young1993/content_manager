const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from "electron";

onIpc("#ShowALert",(event:IpcMainEvent,args) => {
    event.reply("#ShowAlert/reply",args);
})