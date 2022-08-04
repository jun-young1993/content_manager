"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var log = require('../Logger');
var router = require('express').Router();
var MediaService = require('../../service/MediaService').MediaService;
router.get('/proxy/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    log.channel('play').info("[play][proxy] content_id ".concat(contentId));
    new MediaService().findProxyByContentId(contentId).then(function (media) {
        if (media.success) {
            if (media.data) {
                if (media.data.full_path) {
                    log.channel('play').info("[play][proxy] path ".concat(media.data.full_path));
                    var proxyPath = path.resolve(media.data.full_path);
                    var read = fs.createReadStream(proxyPath);
                    // const pass = new stream.PassThrough();
                    // stream.pipeline(
                    // 	read,
                    // 	pass,
                    // 	(err) => {
                    // 		if(err){
                    // 			console.log('thumbnail err',err)
                    // 			return res.sendStatus(400);
                    // 		}
                    // 	}
                    // )
                    // res.contentType('video/mp4');
                    // pass.pipe(res);
                    var fileSize = 238303;
                    console.log({
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
module.exports = router;
