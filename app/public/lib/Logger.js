"use strict";
exports.__esModule = true;
exports.channel = void 0;
var log = require('electron-log');
var path = require('path');
var logConfig = require("../config/logging");
var channel = function (channel) {
    var directory = logConfig.directory;
    var logPath = logConfig.channels[channel].path;
    console.log(directory, logPath);
    log.transports.file.resolvePath = function () { return path.resolve(directory, logPath); };
    return log;
};
exports.channel = channel;
