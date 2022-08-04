const {onIpc, getElectronModule,getBrowserWindow,getPath, getApp} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from 'electron';
import MediaInterface from '../../../../interfaces/MediaInterface';
const log = require('../../../../lib/Logger');
// import {DownloadService} from '../../../../service/DownloadService';
import {MediaService} from '../../../../service/MediaService';
import {TaskSeter} from "../../../../lib/Task/TaskSeter";
import { Media } from '../../../../models/Media';

// const downloadService = new DownloadService()
import * as path from "path";

onIpc('download-request',(event:IpcMainEvent , mediaId:string) => {
	new MediaService()
	.findByMediaId(mediaId)
	.then((media:any) => {
		const downloadMedia:MediaInterface = media.data;
		const ext = path.extname(downloadMedia.path);
		// 
		getElectronModule('dialog')
		.showSaveDialog(getBrowserWindow,{
			defaultPath: getPath('downloads') + `/*${ext}`,
		})
		.then((result) => {
			log.channel("download").info("[download][download-request]result dialog",result);
			if(!result.canceled && result.filePath){
					new TaskSeter(downloadMedia)
					.download(result.filePath)
					.then((setter) => {
						log.channel("download").info("[download][download-request]Setter",setter);
						event.reply('download-request-reply',setter)
					})
					.catch((setterCatch) => {
						log.channel("download").info("[download][download-request]SetterCatch",setterCatch);
					})
					
			}
		})
		.catch((reject) => {
			log.channel("download").error("[download][download-request]reject dialog",reject);
		})
	})
	.catch((findMediaError) =>{
		log.channel("download").error("[download][download-request]",findMediaError);
	})	
});