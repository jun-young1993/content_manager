import { ipcRenderer, IpcRendererEvent } from "electron";
import {ShowALertInterface} from "./helperInterface";
const sender = (channel:string,arg1 ?:any,arg2 ?:any) => {
	return new Promise((resolve ,reject) => {
		try{
			const replyChannel:string = `${channel}/reply`;
			ipcRenderer.send(channel,arg1,arg2);
			ipcRenderer.on(replyChannel,(event:IpcRendererEvent,result) => {
				resolve(result);
				ipcRenderer.removeAllListeners(replyChannel)
			})
		}catch(e){
			reject(e);
		}
	})
	
}



const showAlert = (options:ShowALertInterface,onClose ?: Function) => {
	return new Promise((resolve,reject) => {

		ipcRenderer.send("#ShowMessageAlert",options)
		if(onClose){
			ipcRenderer.on("#ShowMessageAlertClose/reply",(event:IpcRendererEvent,args) => {
				onClose()
			})
		}
		

		
	})
	
}
export {
	sender,
	showAlert
};