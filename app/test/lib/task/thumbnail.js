/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath)

ffmpeg('D:\\a.png')
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
      .resize({
	// Will take screens at 20%, 40%, 60% and 80% of the video
	count: 4,
	folder: 'D:\\thumnail'
});


