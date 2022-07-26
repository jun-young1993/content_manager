/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
const ffmpegPath = require('ffmpeg-static-electron').path;
const ffprobePath = require('ffprobe-static-electron').path;
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {TaskUpdater} = require('../TaskUpdater');
const {Property} = require('./Property');
export class Transcoder extends Property{
	
	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		super(params);
		console.log('fileManager module ',params)
		this.params = params;
		console.log('[transcoder target]',this.getTargetDir());
		
	}
	initialize(){
		ffmpeg.setFfmpegPath(ffmpegPath);
		ffmpeg.setFfprobePath(ffprobePath);
		console.log('[stream path]',this.getSourceFullPath())
		const taskId = this.getTaskId();
		return ffmpeg(this.getSourceFullPath())
		.on('filenames', function(filenames) {
			console.log('Will generate ' + filenames.join(', '))
		})
		.on('progress',function(progress){
			console.log('Processing: ' + progress.percent + '% done');
		})
		.on('error',function(err, stdout, stderr){
			console.log('err',err)
			console.log('stdout',stdout)
			console.log('stderr',stderr)
		})
		.on('end', function() {
			console.log('Screenshots taken');
			
			new TaskUpdater(taskId).complete();
		});	
	}

	thumbnail(){
		this.initialize().screenshots({
			count : 1,
			folder : this.getTargetDir(),
			filename : this.getTargetName(),
			size : '320x240'
		})
	}
	


}