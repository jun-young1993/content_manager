"use strict";
exports.__esModule = true;
exports.channel = void 0;
var log = require('electron-log');
var path = require('path');
var logConfig = require("../config/logging");
var channel = function (channel) {
    if (logConfig.fix) {
        channel = logConfig.fix;
    }
    var directory = logConfig.directory;
    var logPath = logConfig.channels[channel].path;
    log.transports.file.resolvePath = function () { return path.resolve(directory, logPath); };
    return log;
};
exports.channel = channel;
