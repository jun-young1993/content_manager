// @ts-nocheck
const { getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {ipcMain, IpcMainInvokeEvent} from "electron";
import {sendIpc} from "../../../../lib/helper/ElectronHelper";

import {IngestService} from "../../../../service/IngestService";

const log = require("../../../../lib/Logger");


ipcMain.handle("$ingest",(event:IpcMainInvokeEvent) => {
	return new Promise((resolve, reject) => {
		const dialog = getElectronModule('dialog');
		dialog.showOpenDialog(getBrowserWindow(),{
			properties:['openFile','multiSelections','openDirectory']
		})
		.then((result) => {
			if(!result.canceled && result.filePaths){

				log.channel('ingest').info(`[Ingest][Request][SelectedFiles]`);
				log.channel('ingest').info(result.filePaths);

				const files : string[] = result.filePaths;

				new IngestService().outIngestByFiles(files)
				.then((result) => {
					resolve(result);
					sendIpc("#ShowMessageAlert/reply",{
						severity : "success",
						title : `작업요청에 성공했습니다.`
					})
						
				})
				.catch((exception) => {
					reject(exception);
					sendIpc("#ShowMessageAlert/reply",{
						severity : "error",
						title : `작업요청에 실패했습니다.
							${exception}}`
					})
				})
			}else{
				reject(false);
			}
			
		})
		.catch((dialogException) => {
			reject(dialogException);
			log.channel('ingest').info(`[Ingest][Request][DialogException]`);
			log.channel('ingest').info(dialogException);
		});
	})
	
	

});
