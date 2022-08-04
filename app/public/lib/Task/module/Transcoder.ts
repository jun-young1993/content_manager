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
const log = require('../../Logger')
export class Transcoder extends Property{
	
	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		log.channel('ts').info('[Start Transcoding]',params);
		log.channel('ts').info('[ffmpegPath]',ffmpegPath);
		log.channel('ts').info('[ffprobePath]',ffprobePath);
		super(params);
		this.params = params;
		
		
	}
	initialize(){
		
		ffmpeg.setFfmpegPath(ffmpegPath);
		ffmpeg.setFfprobePath(ffprobePath);
		
		const taskId = this.getTaskId();
		return ffmpeg(this.getSourceFullPath())
		.on('filenames', function(filenames) {
			log.channel('ts').info('[transcoder filenames]',filenames);
		})
		.on('progress',function(progress){
			console.log('Processing: ' + progress.percent + '% done');
		})
		.on('error',function(err, stdout, stderr){
			log.channel('ts').error('[transcoder error]',err);
			log.channel('ts').error('[transcoder stdout]',stdout);
			log.channel('ts').error('[transcoder stderr]',stderr);
		})
		.on('end', function() {
			log.channel('ts').info('[transcoder Complete]');
			
			
			new TaskUpdater(taskId).complete();
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
		.size('320x240')
		.save(fullPath)
		// .pipe(outStream, {end : true} );
	}
	


}