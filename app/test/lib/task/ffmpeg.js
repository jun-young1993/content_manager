/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;
const {Transcoder} = require('../../../public/lib/Task/module/Transcoder')
const {Property} = require('../../../public/lib/Task/module/Property')
const params = {
	task: {
		content_id: '3foJzOqBvOY9en7J',
		workflow_id: 'upX3kXHDA54DDJkA',
		module_id: 'x6jzMHp5QV6RQYBU',
		rule_id: 'fv8jCnyX80SO6rak',
		source: 'Fj3rqOlGFTDURRIB.MXF',
		target: 'KoZAQKH88jeiEngo.MXF',
		status: 'queue',
		priority: 0,
		_id: 'KoZAQKH88jeiEngo',
		source_media_id: 'RwsJxwl4tfdyPqHn',
		target_media_id: '5eLBiUNkTHhbJGDA'
	      },
	      sourceMedia: {
		is_media: true,
		content_id: '3foJzOqBvOY9en7J',
		type: 'ORIGINAL',
		storage: 'online',
		path: 'Fj3rqOlGFTDURRIB.MXF',
		full_path: 'C:\\Users\\jun\\Downloads\\db\\online\\Fj3rqOlGFTDURRIB.MXF',
		_id: 'RwsJxwl4tfdyPqHn'
	      },
	      targetMedia: {
		is_media: true,
		content_id: '3foJzOqBvOY9en7J',
		type: 'thumbnail',
		storage: 'thumbnail',
		path: 'KoZAQKH88jeiEngo.MXF',
		full_path: 'C:\\Users\\jun\\Downloads\\db\\proxy\\thumbnail\\KoZAQKH88jeiEngo.png',     
		_id: '5eLBiUNkTHhbJGDA'
	      }
}
// const property = new Property(params);

// return;
new Transcoder(params).thumbnail();
return;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath)

ffmpeg('D:\\100M_0.MXF')
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
      .screenshots({
	// Will take screens at 20%, 40%, 60% and 80% of the video
	count: 4,
	folder: 'D:\\thumnail'
});


