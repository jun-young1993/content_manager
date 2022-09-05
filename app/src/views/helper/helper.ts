import { ipcRenderer, IpcRendererEvent } from "electron";
import {ShowALertInterface} from "./helperInterface";
const sender = (channel:string,arg1 ?:any,arg2 ?:any) => {
	return new Promise((resolve ,reject) => {
		try{
			const replyChannel:string = `${channel}/reply`;
			ipcRenderer.send(channel,arg1,arg2);
			ipcRenderer.on(replyChannel,(event:IpcRendererEvent,result) => {
				ipcRenderer.removeAllListeners(replyChannel)

				resolve(result);

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
				ipcRenderer.removeAllListeners("ShowMessageAlertClose/reply");
				onClose()
			})
		}
	})
}

const showConfirm = (options:ShowALertInterface,onClick ?: Function) => {
	return new Promise((resolve,reject) => {

		ipcRenderer.send("#ShowMessageConfirm",options)
		if(onClick){
			ipcRenderer.on("#ShowMessageConfirmClose/reply",(event:IpcRendererEvent,args:boolean) => {

				onClick(args)
				ipcRenderer.removeAllListeners("ShowMessageConfirmClose/reply");
			})
		}
	})
}

const showDrawer = (options:any,onClick ?: Function) => {
	ipcRenderer.send('#ShowDrawer',options);
	if(onClick){
		ipcRenderer.on("#ShowDrawerClose/reply",(event:IpcRendererEvent) => {
			console.log('heper drawre close');
			onClick()
			ipcRenderer.removeAllListeners("ShowDrawerClose/reply");
		})
	}
}
export {
	sender,
	showAlert,
	showConfirm,
	showDrawer
};