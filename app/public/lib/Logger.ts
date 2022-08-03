
const log = require('electron-log');
const path = require('path');
const logConfig = require("../config/logging");
const channel = (channel : string) => {
	const directory = logConfig.directory;
	const logPath = logConfig.channels[channel].path;
	console.log(directory,logPath);
	log.transports.file.resolvePath = () => path.resolve(directory,logPath);
	return log;
}
export {
	channel
}