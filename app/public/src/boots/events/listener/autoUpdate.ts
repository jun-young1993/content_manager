const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMain, IpcMainEvent} from 'electron';
import { AutoUpdate } from '../../../../lib/AutoUpdate/AutoUpdate';
import {ChildrenBrowserWindow} from "./ChildrenWindows";




onIpc('auto-update-start',(event:IpcMainEvent) => {

	new AutoUpdate({
		window:true
	});
})

