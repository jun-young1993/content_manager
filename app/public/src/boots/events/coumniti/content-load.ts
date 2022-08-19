const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')



onIpc('#content-load',(event:IpcMainEvent)=>{
	event.reply("#content-load/reply");
})