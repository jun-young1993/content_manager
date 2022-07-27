const {app} = require('electron');
const path = require('path');
module.exports = {
	"directory" : path.resolve(app.getPath('downloads'),'logs'),
	"channels" : {
		"ts" : {
			"path" : "module/transcoder.log"
		},
		"api_get_thumbnail" : {
			"path" : "api/get_thumbnail.log"
		}
	}
	
};