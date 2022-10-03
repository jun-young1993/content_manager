"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var MediaService_1 = require("../../service/MediaService");
var log = require('../Logger');
var router = require('express').Router();
router.get('/proxy/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    log.channel('play').info("[play][proxy] content_id ".concat(contentId));
    new MediaService_1.MediaService().findProxyByContentId(contentId).then(function (media) {
        if (media.success) {
            if (media.data) {
                if (media.data.full_path) {
                    log.channel('play').info("[play][proxy] path ".concat(media.data.full_path));
                    var proxyPath = path.resolve(media.data.full_path);
                    var read = fs.createReadStream(proxyPath);
                    var fileSize = fs.statSync(media.data.full_path).size;
                    log.channel('play').info({
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                        'Content-Range': "bytes 0-".concat(fileSize - 1, "/").concat(fileSize)
                    });
                    res.writeHead(206, {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                        'Content-Range': "bytes 0-".concat(fileSize - 1, "/").concat(fileSize)
                    });
                    read.on('error', function (error) {
                        console.log('read error', error);
                    });
                    res.on('error', function (error) {
                        console.log('res error', error);
                    });
                    read.pipe(res);
                }
                else {
                    return res.sendStatus(400);
                }
            }
            else {
                return res.sendStatus(400);
            }
        }
        else {
            return res.sendStatus(400);
        }
    });
});
router.get('/original/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    new MediaService_1.MediaService().findOriginalByContentId(contentId).then(function (media) {
        if (media.success) {
            if (media.data) {
                if (media.data.full_path) {
                    log.channel('play').info("[play][original] path ".concat(media.data.full_path));
                    var proxyPath = path.resolve(media.data.full_path);
                    var read = fs.createReadStream(proxyPath);
                    var fileSize = fs.statSync(media.data.full_path).size;
                    log.channel('play').info({
                        'Content-Length': fileSize,
                        'Content-Type': 'audio/mp3',
                        'Content-Range': "bytes 0-".concat(fileSize - 1, "/").concat(fileSize)
                    });
                    res.writeHead(206, {
                        'Content-Length': fileSize,
                        'Content-Type': 'audio/mp3',
                        'Content-Range': "bytes 0-".concat(fileSize - 1, "/").concat(fileSize)
                    });
                    read.on('error', function (error) {
                        console.log('read error', error);
                    });
                    res.on('error', function (error) {
                        console.log('res error', error);
                    });
                    read.pipe(res);
                }
                else {
                    return res.sendStatus(400);
                }
            }
            else {
                return res.sendStatus(400);
            }
        }
        else {
            return res.sendStatus(400);
        }
    });
});
module.exports = router;
