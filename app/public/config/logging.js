const {app} = require('electron');
const path = require('path');
module.exports = {
	"directory" : path.resolve(app.getPath('downloads'),'logs'),
	"channels" : {
		"ts" : {
			"path" : "module/transcoder.log"
		}
	}
	
};