const {app} = require('electron');
const path = require('path');
module.exports = {
	// "directory" : path.resolve(app.getPath('downloads'),'logs'),
	"directory" : '/Users/junyoungkim/Desktop/cm/logs',
	"channels" : {
		"ts" : {
			"path" : "module/transcoder.log"
		},
		"api_get_thumbnail" : {
			"path" : "api/get_thumbnail.log"
		},
		"task_parse" : {
			"path" : "task/task_parse.log"
		},
		"task_update" : {
			"path" : "task/task_update.log"
		},
		"fs" : {
			"path" : "module/fs.log"
		},
		"play" : {
			"path" : "api/player.log"
		}
	}
	
};