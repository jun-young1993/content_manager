const {onIpc, getElectronModule,getBrowserWindow} = require('../../../../lib/helper/ElectronHelper')
import {IpcMainEvent} from 'electron';
import MediaInterface from '../../../../interfaces/MediaInterface';
const log = require('../../../../lib/Logger');
// import {DownloadService} from '../../../../service/DownloadService';
import {MediaService} from '../../../../service/MediaService';
import {TaskSeter} from "../../../../lib/Task/TaskSeter";
import { Media } from '../../../../models/Media';
// const downloadService = new DownloadService()

onIpc('download-request',(event:IpcMainEvent , mediaId:string) => {
	
	getElectronModule('dialog')
	.showSaveDialog(getBrowserWindow,{
		
	})
	.then((result) => {
		log.channel("download").info("[download][download-request]result dialog",result);
		if(!result.canceled && result.filePath){
			new MediaService()
			.findByMediaId(mediaId)
			.then((media:any) => {
				const downloadMedia:MediaInterface = media.data;
				new TaskSeter(downloadMedia).download(result.filePath)
			})
			.catch((findMediaError) =>{
				log.channel("download").info("[download][download-request]",findMediaError);
			})		
		}
		
		// new MediaService().findByMediaId(mediaId)
		// new TaskSeter()

		// downloadService.downloadByMediaId(mediaId);
	})
	.catch((reject) => {

	})
});