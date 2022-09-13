/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
const ffmpegPath = require('ffmpeg-static-electron').path;
const ffprobePath = require('ffprobe-static-electron').path;
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
// const {TaskUpdater} = require('../TaskUpdater');
import {TaskUpdater} from "../TaskUpdater";
const {Property} = require('./Property');
const log = require('../../Logger')
import {sendIpc} from "../../helper/ElectronHelper"
export class Transcoder extends Property{

	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		sendIpc("#Utils/TaskSnackBar",{
			variant : "info",
			messages : `[Tc][start] `
		});
		log.channel('ts').info('[Start Transcoding]',params);
		log.channel('ts').info('[ffmpegPath]',ffmpegPath);
		log.channel('ts').info('[ffprobePath]',ffprobePath);
		super(params);
		this.params = params;
		this.taskUpdater = new TaskUpdater(this.getTaskId());

	}
	initialize(){

		ffmpeg.setFfmpegPath(ffmpegPath);
		ffmpeg.setFfprobePath(ffprobePath);

		const taskId = this.getTaskId();
		const _this = this;
		return ffmpeg(this.getSourceFullPath())
			.on('filenames', function(filenames:string[]) {
				log.channel('ts').info('[transcoder filenames]',filenames);
			})
			.on('progress',function(progress:any){
				console.log('Processing: ' + progress.percent + '% done');
				_this.taskUpdater.progress(progress.percent);
			})
			.on('error',function(err:any, stdout:any, stderr:any){
				sendIpc("#Utils/TaskSnackBar",{
					variant : "error",
					messages : `[Tc][error] ${err}`
				});
				log.channel('ts').error('[transcoder error]',err);
				log.channel('ts').error('[transcoder stdout]',stdout);
				log.channel('ts').error('[transcoder stderr]',stderr);
				_this.taskUpdater.error();
			})
			.on('end', function() {
				log.channel('ts').info('[transcoder Complete]');

				sendIpc("#Utils/TaskSnackBar",{
					variant : "success",
					messages : `[Tc][complete]`
				});
				_this.taskUpdater.complete();
			});
	}

	thumbnail(){
		const options = {
			count : 1,
			folder : this.getTargetDir(),
			filename : this.getTargetName(),
			size : '320x240'
		};
		log.channel('ts').info('[Create Thumbnail [Target Dir] [Target Name]]',options);
		this.initialize().screenshots(options)
	}

	proxy(){

		const fullPath = this.getTargetFullPath();
		log.channel('ts').info('[Create Proxy [Full Path]]',fullPath);
		// const outStream = fs.createWriteStream(fullPath);
		this.initialize()
			.audioCodec('aac')
			.videoCodec('libx264')
			.size('640x480')
			.save(fullPath)
		// .pipe(outStream, {end : true} );
	}



}