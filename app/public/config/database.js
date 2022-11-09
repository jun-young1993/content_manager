const {app} = require('electron');
const path = require('path');
// const Field = require('../../public/models/Field');
const {DATA_FOLDER_NAME} = require('./configs');
try{
	module.exports = {
		"directory" : path.resolve(app.getPath('appData'),`${DATA_FOLDER_NAME}/db`)
		// "directory" : "C:\\Users\\jun\\Downloads\\db"
		// "directory" : "/Users/junyoungkim/Desktop/junyoung/app/source/electron/db"
	};	
}catch(e){
	if(process.platform === 'win32'){
		const devPath = "C:\\Users\\jun\\AppData\\Roaming\\ContentManagerData\\db";
		module.exports = {
			"directory" : devPath
			// "directory" : "C:\\Users\\jun\\Downloads\\db"
			// "directory" : "/Users/junyoungkim/Desktop/junyoung/app/source/electron/db"
		};	
	}
	
}
