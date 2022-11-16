
const log = require('electron-log');
const path = require('path');
const logConfig = require("../config/logging");

const channel = (channel : string) => {
	if(logConfig.fix){
		channel = logConfig.fix;
	}
	const directory = logConfig.directory;
	const logPath = logConfig.channels[channel].path;
	
	log.transports.file.resolvePath = () => path.resolve(directory,logPath);
	return log;
}

export {
	channel
}