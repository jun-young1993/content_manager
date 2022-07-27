"use strict";
exports.__esModule = true;
var fs = require("fs");
var stream = require("stream");
var path = require("path");
var router = require('express').Router();
var log = require('../Logger');
var MediaService = require('../../service/MediaService').MediaService;
var mediaSv = new MediaService();
router.get('/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    console.log('[request thumbnail] 0 ', contentId);
    mediaSv.findThumbnailByContentId(contentId)
        .then(function (media) {
        console.log('thumbnail contentId 1', contentId);
        if (media.success) {
            console.log('thumbnail media 2');
            if (media.data) {
                if (media.data.full_path) {
                    console.log('thumbnail media full path 3', media.data.full_path);
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
    })["catch"](function (reject) {
        log.channel('api_get_thumbnail').error('[Exception Get Thumbnail]', reject);
        return res.sendStatus(400);
    });
});
module.exports = router;
