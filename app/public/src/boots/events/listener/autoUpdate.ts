const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMain, IpcMainEvent} from 'electron';
import { AutoUpdate } from '../../../../lib/AutoUpdate/AutoUpdate';


onIpc('auto-update-check',(event:IpcMainEvent) => {

	console.log('check plz');
		new AutoUpdate({
			available : () => {
				console.log('auto-update-available');
				event.reply('auto-update-available','available');
			}
		});
})

onIpc('auto-update-start',(event:IpcMainEvent) => {
	new AutoUpdate({
		update:() => {
			event.reply('auto-update-start-reply','auto-update-start-reply')
		}
	});
})

