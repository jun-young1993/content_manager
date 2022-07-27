"use strict";
exports.__esModule = true;
var fs = require("fs");
var stream = require("stream");
var path = require("path");
var router = require('express').Router();
var MediaService = require('../../service/MediaService').MediaService;
var mediaSv = new MediaService();
router.get('/original/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    console.log(contentId);
    new MediaService().findOriginalByContentId(contentId).then(function (media) {
        console.log(media);
        if (media.success) {
            if (media.data) {
                if (media.data.full_path) {
                    var thumbnailPath = path.resolve(media.data.full_path);
                    var read = fs.createReadStream(thumbnailPath);
                    var pass = new stream.PassThrough();
                    stream.pipeline(read, pass, function (err) {
                        if (err) {
                            console.log('thumbnail err', err);
                            return res.sendStatus(400);
                        }
                    });
                    pass.pipe(res);
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
