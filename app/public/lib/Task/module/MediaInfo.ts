/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
import {MediaInfoService} from "../../../service/MediaInfoService";

const ffmpegPath = require('ffmpeg-static-electron').path;
const ffprobePath = require('ffprobe-static-electron').path;
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {TaskUpdater} = require('../TaskUpdater');
const {Property} = require('./Property');
const log = require('../../Logger')
import {sendIpc} from "../../helper/ElectronHelper"
const mediaInfoService = new MediaInfoService();
export class MediaInfo extends Property{

	private params:any;

	constructor(params:any){
		sendIpc("#Utils/TaskSnackBar",{
			variant : "info",
			messages : `[MediaInfo][start] `
		});
		log.channel('ts').info('[Start MediaInfo]',params);
		log.channel('ts').info('[ffprobePath]',ffprobePath);
		super(params);
		this.params = params;

		ffmpeg.setFfmpegPath(ffmpegPath);
		ffmpeg.setFfprobePath(ffprobePath);
	}


	video(){
		const source:string = this.getSourceFullPath();
		const contentId:string = this.getContentId();
		const taskId = this.getTaskId();
		log.channel('ts').info('[MediaInfo][source path]',source);
		ffmpeg.ffprobe(source,(error,metadata) => {
			mediaInfoService.create(metadata,contentId);
			sendIpc("#Utils/TaskSnackBar",{
				variant : "success",
				messages : `[MediaInfo][complete]`
			});
			new TaskUpdater(taskId).complete();
		})
	}





}