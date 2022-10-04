/*
npm install ffmpeg-static-electron
npm install fluent-ffmpeg
npm install ffprobe-static-electron
**/
var ffmpegPath = require('ffmpeg-static-electron').path;
var ffprobePath = require('ffprobe-static-electron').path;
// const {MediaInfo} = require('../../../public/lib/Task/module/MediaInfo')
// const {Property} = require('../../../public/lib/Task/module/Property')
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
// const {MediaInfo} = require("../../../public/lib/Task/module/MediaInfo");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath)


const originalName = 'sample.pgn';
// const source = `/Users/junyoungkim/Downloads/sample file/${originalName}`;
// const target = `/Users/junyoungkim/Downloads/sample file/${originalName}.mp4`;
// const outStream = fs.createWriteStream(target)
//       .pipe(outStream)
const source = "C:\\Users\\jun\\Downloads\\storage\\online\\HoP7NnFY0bfWvz30.mp3";

ffmpeg.ffprobe(source,(error,metadata) => {
    console.log(metadata)
    // mediaInfoService.create(metadata,contentId);
    // sendIpc("#Utils/TaskSnackBar",{
    //     variant : "success",
    //     messages : `[MediaInfo][complete]`
    // });
    // new TaskUpdater(taskId).complete();
})


return;
const test = new MediaInfo({
    sourceMedia: {
        is_media: true,
        content_id: '1cdfKrf1cCQnXsZh',
        type: 'original',
        storage: 'online',
        path: 'g3qJxrbUcLDWTuxa.mov',
        full_path: '/Users/junyoungkim/Downloads/storage/online/g3qJxrbUcLDWTuxa.mov',
        _id: 'luyHfGXubNCvKKpe',
        createdAt: '2022-08-15T06:34:21.397Z',
        updatedAt: '2022-08-15T06:34:25.165Z'
    },
    targetMedia: {
        is_media: true,
        content_id: '1cdfKrf1cCQnXsZh',
        type: 'no',
        storage: 'no',
        path: 'v3Bi1eQozRIkPBoq.mov',
        full_path: '/Users/junyoungkim/Desktop/junyoung/app/source/electron/app/v3Bi1eQozRIkPBoq.mov',
        _id: 'kQXVdb240bD3pCKk',
        createdAt: '2022-08-15T06:34:25.167Z',
        updatedAt: '2022-08-15T06:34:25.167Z'
    },
    task: {
        content_id: '1cdfKrf1cCQnXsZh',
        workflow_id: 'user_out_ingest',
        module_id: 'mediainfo_video_online',
        rule_id: 'user_out_mediainfo_video_online',
        source: 'g3qJxrbUcLDWTuxa.mov',
        target: 'v3Bi1eQozRIkPBoq.mov',
        status: 'queue',
        priority: 0,
        _id: 'v3Bi1eQozRIkPBoq',
        createdAt: '2022-08-15T06:34:25.162Z',
        updatedAt: '2022-08-15T06:34:25.169Z',
        source_media_id: 'luyHfGXubNCvKKpe',
        target_media_id: 'kQXVdb240bD3pCKk'
    },
    params: {}
});
test.video();
// ffmpeg.ffprobe(source,(error,metadata) => {
// 	console.log('metadata',metadata);
// })
	// .on('filenames', function(filenames) {
	// 	console.log('Will generate ' + filenames.join(', '))
	// })
	// .on('progress',function(progress){
	// 	console.log('Processing: ' + progress.percent + '% done');
	// })
	// .on('error',function(err, stdout, stderr){
	// 	console.log('err',err)
	// 	console.log('stdout',stdout)
	// 	console.log('stderr',stderr)
	// })
	// .on('end', function() {
	// 	console.log('Screenshots taken');
	// })
	// .then((video) => {
	// 	console.log(video);
	// })


