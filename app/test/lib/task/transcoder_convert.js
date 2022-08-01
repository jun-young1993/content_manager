/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;
const {Transcoder} = require('../../../public/lib/Task/module/Transcoder')
const {Property} = require('../../../public/lib/Task/module/Property')
// const params = {
// 	task: {
// 		content_id: '3foJzOqBvOY9en7J',
// 		workflow_id: 'upX3kXHDA54DDJkA',
// 		module_id: 'x6jzMHp5QV6RQYBU',
// 		rule_id: 'fv8jCnyX80SO6rak',
// 		source: 'Fj3rqOlGFTDURRIB.MXF',
// 		target: 'KoZAQKH88jeiEngo.MXF',
// 		status: 'queue',
// 		priority: 0,
// 		_id: 'KoZAQKH88jeiEngo',
// 		source_media_id: 'RwsJxwl4tfdyPqHn',
// 		target_media_id: '5eLBiUNkTHhbJGDA'
// 	      },
// 	      sourceMedia: {
// 		is_media: true,
// 		content_id: '3foJzOqBvOY9en7J',
// 		type: 'ORIGINAL',
// 		storage: 'online',
// 		path: 'Fj3rqOlGFTDURRIB.MXF',
// 		full_path: 'C:\\Users\\jun\\Downloads\\db\\online\\Fj3rqOlGFTDURRIB.MXF',
// 		_id: 'RwsJxwl4tfdyPqHn'
// 	      },
// 	      targetMedia: {
// 		is_media: true,
// 		content_id: '3foJzOqBvOY9en7J',
// 		type: 'thumbnail',
// 		storage: 'thumbnail',
// 		path: 'KoZAQKH88jeiEngo.MXF',
// 		full_path: 'C:\\Users\\jun\\Downloads\\db\\proxy\\thumbnail\\KoZAQKH88jeiEngo.png',     
// 		_id: '5eLBiUNkTHhbJGDA'
// 	      }
// }
// // const property = new Property(params);

// // return;
// new Transcoder(params).thumbnail();
// return;
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath)
const target = 'C:\\Users\\jun\\Desktop\\뱀파이어소녀_convert.mp4';
const outStream = fs.createWriteStream(target)

const source = 'D:\\100M_2.MXF';
ffmpeg(source)
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
      })
      .audioCodec('aac')
      .videoCodec('libx264')
      .size('640x480')
      .save(target);
//       .pipe(outStream)
      


