const {app} = require('electron');
const path = require('path');
// const Field = require('../../public/models/Field');
module.exports = {
	"directory" : path.resolve(app.getPath('downloads'),'db')
	// "directory" : "C:\\Users\\jun\\Downloads\\db"
	// "directory" : "/Users/junyoungkim/Desktop/junyoung/app/source/electron/db"
};