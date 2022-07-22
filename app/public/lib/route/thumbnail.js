"use strict";
exports.__esModule = true;
var fs = require("fs");
var stream = require("stream");
var path = require("path");
var router = require('express').Router();
var MediaService = require('../../service/MediaService').MediaService;
var mediaSv = new MediaService();
router.get('/:contentId', function (req, res) {
    var contentId = req.params.contentId;
    mediaSv.findOutByContentId(contentId).then(function (media) {
        if (media.success) {
            if (media.data) {
                if (media.data.path) {
                    var read = fs.createReadStream(path.resolve(media.data.path));
                    var pass = new stream.PassThrough();
                    stream.pipeline(read, pass, function (err) {
                        if (err) {
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
    });
});
module.exports = router;
